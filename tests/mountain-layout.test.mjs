import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const layout = await import("../src/lib/mountain-layout.mjs").catch(() => null);

function pngDimensions(path) {
  const contents = readFileSync(path);
  assert.equal(contents.toString("ascii", 1, 4), "PNG");
  return {
    width: contents.readUInt32BE(16),
    height: contents.readUInt32BE(20),
  };
}

async function baseColorStats(path, firstRowRatio = 0) {
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const firstRow = Math.floor(info.height * firstRowRatio);
  let greenPixels = 0;
  let blueRockPixels = 0;
  let firstGreenRow = info.height;
  let lastGreenRow = -1;

  for (let y = firstRow; y < info.height; y += 1) {
    let rowGreenPixels = 0;
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      const [red, green, blue, alpha] = data.subarray(offset, offset + 4);
      if (alpha < 96) continue;

      if (green > red * 1.12 && green > blue * 1.08 && green > 70) {
        greenPixels += 1;
        rowGreenPixels += 1;
        firstGreenRow = Math.min(firstGreenRow, y);
      }
      if (blue > red * 1.16 && blue >= green * 0.94 && blue > 70) blueRockPixels += 1;
    }
    if (rowGreenPixels > info.width * 0.01) lastGreenRow = y;
  }

  return { ...info, greenPixels, blueRockPixels, firstGreenRow, lastGreenRow };
}

async function laplacianVariance(path) {
  const { data, info } = await sharp(path)
    .extract({ left: 0, top: 990, width: 2048, height: 1838 })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sum = 0;
  let sumSquares = 0;
  let count = 0;

  for (let y = 1; y < info.height - 1; y += 1) {
    for (let x = 1; x < info.width - 1; x += 1) {
      const index = y * info.width + x;
      const laplacian =
        4 * data[index] -
        data[index - 1] -
        data[index + 1] -
        data[index - info.width] -
        data[index + info.width];

      sum += laplacian;
      sumSquares += laplacian * laplacian;
      count += 1;
    }
  }

  const mean = sum / count;
  return sumSquares / count - mean * mean;
}

async function edgeCorrelation(firstPath, secondPath) {
  async function edgeMap(path) {
    const { data, info } = await sharp(path)
      .resize({ width: 256 })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const edges = [];

    for (let y = 1; y < info.height - 1; y += 1) {
      for (let x = 1; x < info.width - 1; x += 1) {
        const index = y * info.width + x;
        edges.push(
          Math.abs(data[index + 1] - data[index - 1]) +
            Math.abs(data[index + info.width] - data[index - info.width]),
        );
      }
    }

    return edges;
  }

  const [first, second] = await Promise.all([edgeMap(firstPath), edgeMap(secondPath)]);
  const firstMean = first.reduce((sum, value) => sum + value, 0) / first.length;
  const secondMean = second.reduce((sum, value) => sum + value, 0) / second.length;
  let covariance = 0;
  let firstVariance = 0;
  let secondVariance = 0;

  for (let index = 0; index < first.length; index += 1) {
    const firstDelta = first[index] - firstMean;
    const secondDelta = second[index] - secondMean;
    covariance += firstDelta * secondDelta;
    firstVariance += firstDelta * firstDelta;
    secondVariance += secondDelta * secondDelta;
  }

  return covariance / Math.sqrt(firstVariance * secondVariance);
}

async function horizontalDetail(path, centerY, radius = 35) {
  const top = centerY - radius;
  const height = radius * 2 + 1;
  const { data, info } = await sharp(path)
    .extract({ left: 0, top, width: 2048, height })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let difference = 0;
  let samples = 0;

  for (let y = 0; y < info.height; y += 1) {
    const row = y * info.width;

    for (let x = 1; x < info.width; x += 1) {
      difference += Math.abs(data[row + x] - data[row + x - 1]);
      samples += 1;
    }
  }

  return difference / samples;
}

async function maxVerticalDiscontinuity(path, centerY, radius = 40) {
  const top = centerY - radius - 1;
  const height = radius * 2 + 2;
  const { data, info } = await sharp(path)
    .extract({ left: 0, top, width: 2048, height })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let maximum = 0;

  for (let y = 1; y < info.height; y += 1) {
    const row = y * info.width;
    const previousRow = (y - 1) * info.width;
    let rowDifference = 0;

    for (let x = 0; x < info.width; x += 1) {
      rowDifference += Math.abs(data[row + x] - data[previousRow + x]);
    }

    maximum = Math.max(maximum, rowDifference / info.width);
  }

  return maximum;
}

async function maxRowMeanStep(path, centerY, radius = 40) {
  const top = centerY - radius - 1;
  const height = radius * 2 + 2;
  const { data, info } = await sharp(path)
    .extract({ left: 0, top, width: 2048, height })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let previousMean;
  let maximum = 0;

  for (let y = 0; y < info.height; y += 1) {
    const row = y * info.width;
    let total = 0;

    for (let x = 0; x < info.width; x += 1) {
      total += data[row + x];
    }

    const mean = total / info.width;
    if (previousMean !== undefined) {
      maximum = Math.max(maximum, Math.abs(mean - previousMean));
    }
    previousMean = mean;
  }

  return maximum;
}

test("a arte final tem largura suficiente para desktop sem alterar a proporção", () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  const imagePath = join(repositoryRoot, "public", layout.MOUNTAIN_IMAGE.src.slice(1));

  assert.equal(existsSync(imagePath), true, "a arte final do site ainda não existe");
  assert.deepEqual(pngDimensions(imagePath), { width: 2048, height: 8860 });
});

test("a versão diurna preserva a geometria da montanha noturna", async () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  assert.ok(layout.MOUNTAIN_IMAGE.daySrc, "a arte diurna ainda não foi ligada ao mapa");

  const nightPath = join(repositoryRoot, "public", layout.MOUNTAIN_IMAGE.src.slice(1));
  const dayPath = join(repositoryRoot, "public", layout.MOUNTAIN_IMAGE.daySrc.slice(1));

  assert.equal(existsSync(dayPath), true, "a arte diurna final ainda não existe");
  assert.deepEqual(pngDimensions(dayPath), pngDimensions(nightPath));
  assert.ok(
    (await edgeCorrelation(nightPath, dayPath)) >= 0.78,
    "a recoloração diurna deslocou contornos importantes da arte noturna",
  );
});

test("a arte final preserva bordas nítidas quando ocupa a largura do site", async () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  const imagePath = join(repositoryRoot, "public", layout.MOUNTAIN_IMAGE.src.slice(1));

  assert.ok(
    (await laplacianVariance(imagePath)) >= 100,
    "a ampliação atual interpola pixels, mas não recupera definição suficiente",
  );
});

test("as duas junções entre o Sobre e a trilha não formam faixas borradas", async () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  const imagePath = join(repositoryRoot, "public", layout.MOUNTAIN_IMAGE.src.slice(1));

  for (const seamY of [4158, 4838]) {
    assert.ok(
      (await horizontalDetail(imagePath, seamY)) >= 3,
      `a junção em y=${seamY} perdeu textura horizontal e ainda aparece como uma emenda`,
    );
  }
});

test("as junções inferiores não cortam a trilha nem borram o campo final", async () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  const imagePath = join(repositoryRoot, "public", layout.MOUNTAIN_IMAGE.src.slice(1));

  assert.ok(
    (await maxVerticalDiscontinuity(imagePath, 7140)) <= 14,
    "a junção da trilha ainda forma um corte horizontal contínuo",
  );
  assert.ok(
    (await maxRowMeanStep(imagePath, 8554)) <= 3,
    "a junção do campo final ainda forma uma faixa borrada",
  );
});

test("o otimizador do Next aceita a qualidade alta pedida pela montanha", () => {
  const configSource = readFileSync(join(repositoryRoot, "next.config.ts"), "utf8");
  assert.match(configSource, /qualities:\s*\[[^\]]*95[^\]]*\]/, "o Next reduziria a montanha novamente para qualidade 75");
});

test("elementos do topo preservam sua posição em pixels na montanha estendida", () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");

  assert.equal(layout.toExtendedTop(6.98), "4.84%");
  assert.equal(layout.toExtendedHeight(2.8), "1.94%");
});

test("a trajetória começa no primeiro platô livre e sobe toda a sequência", () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");

  assert.deepEqual(layout.trajectoryPlacements, [
    { left: "50.05%", top: "56.55%" },
    { left: "54.69%", top: "62.21%" },
    { left: "59.08%", top: "68.34%" },
    { left: "58.59%", top: "74.92%" },
  ]);

  assert.deepEqual(
    layout.trajectoryStyle({ left: "50.05%", top: "56.55%" }),
    { left: "50.05%", top: "56.55%", "--placa-encaixe": "7.92%" },
    "a linha de apoio da grama deve encaixar dentro do platô, não no último pixel da arte",
  );

  assert.deepEqual(
    { top: layout.codeEvolutionTrack.top, bottom: layout.codeEvolutionTrack.bottom },
    { top: "53.84%", bottom: "22.22%" },
    "o trilho do painel de código deve começar e terminar junto da trajetória",
  );
  assert.deepEqual(
    layout.codeEvolutionPlacements.map(({ top }) => top),
    ["56.55%", "62.21%", "68.34%", "74.92%"],
    "os painéis compactos devem continuar alinhados às quatro placas",
  );
});

test("a placa-título Trajetória encosta a grama no platô", () => {
  const title = layout.sectionPlaques.find((plaque) => plaque.id === "trajetoria");
  assert.deepEqual(
    { left: title.left, top: title.top },
    { left: "30.00%", top: "54.40%" },
    "o título deve pousar à esquerda sem encobrir a primeira placa da trajetória",
  );
});

test("as quatro seções têm placas de título no mesmo sistema visual", () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");

  assert.deepEqual(
    layout.sectionPlaques.map(({ id, label }) => ({ id, label })),
    [
      { id: "projetos", label: { pt: "Projetos", en: "Projects" } },
      { id: "sobre", label: { pt: "Sobre mim", en: "About me" } },
      { id: "trajetoria", label: { pt: "Trajetória", en: "Journey" } },
      { id: "contato", label: { pt: "Contato", en: "Contact" } },
    ],
  );

  const signPath = join(repositoryRoot, "public", layout.SECTION_SIGN_IMAGE.src.slice(1));
  assert.equal(existsSync(signPath), true, "a base visual das placas de seção ainda não existe");
  assert.deepEqual(pngDimensions(signPath), {
    width: layout.SECTION_SIGN_IMAGE.width,
    height: layout.SECTION_SIGN_IMAGE.height,
  });
});

test("as placas de seção e conteúdo usam somente grama sob os postes", async () => {
  assert.equal(layout.SECTION_SIGN_IMAGE.src, "/placas-secao/placa-secao-grama-v1.png");
  assert.equal(layout.CONTENT_SIGN_IMAGE.src, "/placas-secao/placa-conteudo-grama-v1.png");

  for (const image of [layout.SECTION_SIGN_IMAGE, layout.CONTENT_SIGN_IMAGE]) {
    const path = join(repositoryRoot, "public", image.src.slice(1));
    assert.equal(existsSync(path), true, `${image.src} ainda não existe`);
    const stats = await baseColorStats(path, 0.62);
    assert.ok(stats.greenPixels > 20_000, `${image.src} perdeu a faixa de grama`);
    assert.ok(stats.blueRockPixels < 2_000, `${image.src} ainda conserva pedras azuis`);
  }
});

test("cada tipo de placa compensa sua própria margem transparente abaixo da grama", async () => {
  const variants = [
    {
      image: layout.SECTION_SIGN_IMAGE,
      paths: [join(repositoryRoot, "public", layout.SECTION_SIGN_IMAGE.src.slice(1))],
      style: layout.sectionSignStyle,
    },
    {
      image: layout.CONTENT_SIGN_IMAGE,
      paths: [join(repositoryRoot, "public", layout.CONTENT_SIGN_IMAGE.src.slice(1))],
      style: layout.contentSignStyle,
    },
    {
      image: layout.TRAJECTORY_IMAGE,
      paths: [
        "placa-tec-informatica-1",
        "placa-tecnologoads-2",
        "placa-estagiario-3",
        "placa-palestrante-4",
      ].flatMap((name) =>
        [540, 1063].map((width) =>
          join(
            repositoryRoot,
            "public",
            layout.TRAJECTORY_IMAGE.directory.slice(1),
            `${name}-${width}.webp`,
          ),
        ),
      ),
      style: layout.trajectoryStyle,
    },
  ];

  for (const variant of variants) {
    assert.equal(typeof variant.image.supportInset, "string", "a linha de apoio da arte ainda não foi configurada");
    assert.equal(typeof variant.style, "function", "o componente ainda não aplica a linha de apoio configurada");

    for (const path of variant.paths) {
      const stats = await baseColorStats(path);
      const transparentMargin = ((stats.height - 1 - stats.lastGreenRow) / stats.height) * 100;
      assert.ok(
        Math.abs(Number.parseFloat(variant.image.supportInset) - transparentMargin) <= 0.15,
        `${path} usa uma compensação diferente da margem transparente real`,
      );
    }

    assert.equal(variant.style({})["--placa-encaixe"], variant.image.supportInset);
  }
});

test("Sobre mim e Contato deixam o centro livre para os painéis de conteúdo", () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  assert.ok(layout.CONTENT_SIGN_IMAGE, "a arte da placa grande ainda não foi configurada");
  assert.equal(layout.contentPanels?.length, 2, "faltam os painéis de Sobre mim e Contato");

  for (const id of ["sobre", "contato"]) {
    const title = layout.sectionPlaques.find((plaque) => plaque.id === id);
    const panel = layout.contentPanels.find((content) => content.id === id);
    assert.ok(title && panel, `a composição de ${id} está incompleta`);

    const titleRight = Number.parseFloat(title.left) + Number.parseFloat(title.width) / 2;
    const panelLeft = Number.parseFloat(panel.left) - Number.parseFloat(panel.width) / 2;
    assert.ok(titleRight + 1 <= panelLeft, `o título de ${id} invade a placa grande`);
    assert.ok(Math.abs(Number.parseFloat(panel.left) - 50) <= 6, `a placa grande de ${id} saiu do centro`);
    assert.equal(panel.copy.pt.body.length >= 1, true, `a placa de ${id} não tem texto em português`);
    assert.equal(panel.copy.en.body.length >= 1, true, `a placa de ${id} não tem texto em inglês`);
  }

  const contact = layout.contentPanels.find((content) => content.id === "contato");
  assert.deepEqual(
    contact.actions.map(({ label, href }) => ({ label, href })),
    [
      { label: "E-mail", href: "mailto:luanibanhez.dev@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/luanibanhez" },
      { label: "GitHub", href: "https://github.com/luaniban" },
    ],
  );

  const contentSignPath = join(repositoryRoot, "public", layout.CONTENT_SIGN_IMAGE.src.slice(1));
  assert.equal(existsSync(contentSignPath), true, "a placa grande em branco ainda não existe");
  const dimensions = pngDimensions(contentSignPath);
  assert.equal(dimensions.width >= 1400, true, "a placa grande não tem resolução suficiente");
  assert.equal(dimensions.width / dimensions.height >= 1.4, true, "a placa grande ficou estreita demais para o texto");
});

test("as placas da trajetória terminam em grama, sem a base de pedras azuis", async () => {
  assert.ok(layout, "o mapeamento da montanha estendida ainda não existe");
  assert.ok(layout.TRAJECTORY_IMAGE?.directory, "a coleção sem pedras ainda não foi configurada");
  assert.equal(layout.TRAJECTORY_IMAGE.directory, "/trajetoria-grama-v2/web");

  for (const name of [
    "placa-tec-informatica-1",
    "placa-tecnologoads-2",
    "placa-estagiario-3",
    "placa-palestrante-4",
  ]) {
    for (const variant of [
      { width: 540, height: 520 },
      { width: layout.TRAJECTORY_IMAGE.width, height: layout.TRAJECTORY_IMAGE.height },
    ]) {
      const variantPath = join(
        repositoryRoot,
        "public",
        layout.TRAJECTORY_IMAGE.directory.slice(1),
        `${name}-${variant.width}.webp`,
      );
      assert.equal(existsSync(variantPath), true, `a versão ${variant.width}px de ${name} ainda não existe`);
      const dimensions = await sharp(variantPath).metadata();
      assert.equal(dimensions.width, variant.width);
      assert.equal(dimensions.height, variant.height);
    }

    const path = join(repositoryRoot, "public", layout.TRAJECTORY_IMAGE.directory.slice(1), `${name}-1063.webp`);
    const stats = await baseColorStats(path, 0.66);
    assert.ok(stats.greenPixels > 4_000, `${name} perdeu a faixa de grama sob os pés`);
    assert.ok(stats.blueRockPixels < 900, `${name} ainda conserva a base de pedras azuis`);
    assert.ok(
      stats.firstGreenRow / stats.height <= 0.82,
      `${name} deixa um vão grande demais entre os postes e a grama`,
    );
  }
});

test("a troca de tema mantém a noite opaca e carrega o dia com prioridade secundária", () => {
  const css = readFileSync(join(repositoryRoot, "src/app/globals.css"), "utf8");
  const page = readFileSync(join(repositoryRoot, "src/app/page.tsx"), "utf8");
  const mountainArtPath = join(repositoryRoot, "src/components/MountainArt.tsx");

  assert.match(css, /\.mapa-arte-dia\s*\{[^}]*opacity:\s*0/s);
  assert.match(css, /html\[data-theme="light"\]\s+\.mapa-arte-dia\.is-ready\s*\{[^}]*opacity:\s*1/s);
  assert.doesNotMatch(css, /html\[data-theme="light"\]\s+\.mapa-arte-noite\s*\{[^}]*opacity/s);
  assert.equal(existsSync(mountainArtPath), true, "a arte diurna precisa aguardar a decodificação");
  const mountainArt = readFileSync(mountainArtPath, "utf8");
  assert.match(mountainArt, /\.decode\(\)/);
  assert.match(mountainArt, /loading="eager"/);
  assert.match(mountainArt, /fetchPriority="low"/);
  assert.equal(
    ((page + mountainArt).match(/\bpriority\b/g) ?? []).length,
    2,
    "só a noite e o título devem receber preload",
  );
});

test("a montanha e as placas ganham escala e interação legível no celular", () => {
  const css = readFileSync(join(repositoryRoot, "src/app/globals.css"), "utf8");
  const placa = readFileSync(join(repositoryRoot, "src/components/Placa.tsx"), "utf8");

  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.mapa\s*\{[^}]*width:\s*150%/);
  assert.match(css, /@media\s*\(max-width:\s*860px\)[\s\S]*?\.placa:focus[^}]*transform:[^;}]*scale/s);
  assert.match(placa, /tabIndex=\{0\}/);
});

test("a placa completa pode ser ampliada pelo teclado no desktop", () => {
  const css = readFileSync(join(repositoryRoot, "src/app/globals.css"), "utf8");

  assert.match(
    css,
    /\.placa\s*\{[^}]*transform-origin:\s*center calc\(100% - var\(--placa-encaixe, 0%\)\)/s,
    "a ampliação precisa permanecer ancorada na linha da grama, não no fim transparente da imagem",
  );
  assert.match(
    css,
    /\.placa:focus-visible\s*\{[^}]*transform:[^;}]*scale\(/s,
    "a placa completa precisa ampliar também para quem navega por teclado no desktop",
  );
});

test("o terminal compacto alcança escala legível ao receber foco", () => {
  const css = readFileSync(join(repositoryRoot, "src/app/globals.css"), "utf8");

  assert.match(
    css,
    /\.php-evolution\.is-compact:focus\s*\{[^}]*transform:\s*scale\(2\.8\)/s,
    "o terminal compacto focado precisa chegar a uma escala legível no celular",
  );
});

test("os títulos de seção aparecem na mesma ordem semântica que seus conteúdos", () => {
  const page = readFileSync(join(repositoryRoot, "src/app/page.tsx"), "utf8");
  const projectsHeading = page.indexOf("aria-labelledby={placaProjetos.id}");
  const projectsContent = page.indexOf("{projetos.map");
  const aboutHeading = page.indexOf("aria-labelledby={placaSobre.id}");
  const journeyHeading = page.indexOf("aria-labelledby={placaTrajetoria.id}");
  const journeyContent = page.indexOf('<ol className="trajetoria"');
  const contactHeading = page.indexOf("aria-labelledby={placaContato.id}");

  assert.ok(projectsHeading < projectsContent);
  assert.ok(projectsContent < aboutHeading);
  assert.ok(aboutHeading < journeyHeading);
  assert.ok(journeyHeading < journeyContent);
  assert.ok(journeyContent < contactHeading);
});

test("dependências diretas dos testes e artefatos temporários são declarados", () => {
  const packageJson = JSON.parse(readFileSync(join(repositoryRoot, "package.json"), "utf8"));
  const gitignore = readFileSync(join(repositoryRoot, ".gitignore"), "utf8");

  assert.ok(packageJson.devDependencies?.sharp, "sharp é importado diretamente pelos testes");
  assert.match(gitignore, /^\/tmp\/$/m);
});
