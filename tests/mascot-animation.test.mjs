import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";

const animation = await import("../src/lib/mascot-animation.mjs").catch(() => null);

// As pupilas são círculos pretos isolados: sua área permite comparar o tamanho
// do rosto mesmo quando o desenho está girado ou tem margens diferentes.
async function pupilMetrics(step) {
  const { data, info } = await sharp(new URL("../public" + step.src, import.meta.url).pathname)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const mask = new Uint8Array(width * height);
  const queue = new Uint32Array(mask.length);
  for (let i = 0; i < mask.length; i++) {
    mask[i] = data[i * 4 + 3] > 200 && Math.max(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]) < 25 ? 1 : 0;
  }
  const circles = [];
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    let first = 0, last = 1, area = 0;
    let minX = width, minY = height, maxX = 0, maxY = 0;
    queue[0] = i;
    mask[i] = 0;
    while (first < last) {
      const pixel = queue[first++];
      const x = pixel % width, y = Math.floor(pixel / width);
      area++;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      for (const neighbor of [x > 0 ? pixel - 1 : -1, x < width - 1 ? pixel + 1 : -1,
        y > 0 ? pixel - width : -1, y < height - 1 ? pixel + width : -1]) {
        if (neighbor < 0 || !mask[neighbor]) continue;
        mask[neighbor] = 0;
        queue[last++] = neighbor;
      }
    }
    const dx = maxX - minX + 1, dy = maxY - minY + 1;
    if (area > 1000 && dx / dy > 0.7 && dx / dy < 1.3 && area / dx / dy > 0.6) {
      circles.push({ area, x: (minX + maxX) / 2, y: (minY + maxY) / 2 });
    }
  }
  circles.sort((a, b) => b.area - a.area);
  assert.ok(circles.length >= 2, `as pupilas devem estar visíveis: ${step.src}`);
  return {
    size: Math.sqrt((circles[0].area + circles[1].area) / 2) / width * step.scale * (step.zoom ?? 1),
    eyeLine: { x: circles[1].x - circles[0].x, y: circles[1].y - circles[0].y },
  };
}

test("a saída do giro conserva o tamanho do rosto da pose original", async () => {
  const exiting = animation.mascotScrollSteps.find(step => step.src.includes("05b-saindo-do-giro"));
  const canonical = animation.mascotScrollSteps.find(step => step.src.includes("06-estabilizando"));
  const ratio = (await pupilMetrics(exiting)).size / (await pupilMetrics(canonical)).size;
  assert.ok(ratio > 0.88 && ratio < 1.12, `tamanho relativo do rosto: ${(ratio * 100).toFixed(1)}%`);
});

// A altura da silhueta varia com joelhos, braços e rotação. As pupilas permitem
// comparar a mesma medida física em todas as poses, inclusive na invertida.
test("todas as poses da queda mantêm o mesmo tamanho aparente de rosto", async () => {
  const falling = animation.mascotScrollSteps.filter(step => !step.pouso);
  const reference = (await pupilMetrics(falling[0])).size;
  for (const step of falling) {
    const difference = Math.abs((await pupilMetrics(step)).size / reference - 1);
    assert.ok(difference < 0.01, `${step.src}: diferença de ${(difference * 100).toFixed(2)}%`);
  }
});

test("a cabeça na saída do giro acompanha o eixo do corpo, sem torção lateral", async () => {
  const step = animation.mascotScrollSteps.find(step => step.src.includes("05b-saindo-do-giro"));
  const { eyeLine } = await pupilMetrics(step);
  const radians = step.angle * Math.PI / 180;
  // A linha entre os olhos deve ser transversal ao corpo; permitimos uma
  // inclinação natural, mas não a torção acentuada da imagem anterior.
  const dot = Math.abs(eyeLine.x * Math.sin(radians) - eyeLine.y * Math.cos(radians));
  const deviation = dot / Math.hypot(eyeLine.x, eyeLine.y);
  assert.ok(deviation < 0.6, `desalinhamento da cabeça: ${deviation.toFixed(2)}`);
});

// Compara a massa visual das pernas com cabeça/mãos, independentemente da
// orientação. A pose 05 antiga tinha quase três vezes a proporção da pose 06.
async function legToHeadRatio(filename, upright = false) {
  const { data, info } = await sharp(new URL("../public/mascote-poses-caindo/" + filename, import.meta.url).pathname)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let legs = 0;
  let head = 0;
  for (let y = 0; y < info.height; y++) {
    const row = upright ? 1 - y / info.height : y / info.height;
    for (let x = 0; x < info.width; x++) {
      const index = (y * info.width + x) * 4;
      const [r, g, b, a] = data.subarray(index, index + 4);
      if (a < 200 || r < 140 || g < 70 || r < g * 1.15 || g < b * 1.1) continue;
      if (row < 0.4) legs++;
      if (row > 0.5) head++;
    }
  }
  assert.ok(head > 1000, "a referência deve conter pele visível");
  return legs / head;
}

test("as pernas da pose invertida mantêm proporções chibi próximas da pose canônica", async () => {
  const reference = await legToHeadRatio("06-estabilizando.png", true);
  const inverted = await legToHeadRatio("05-de-cabeca-para-baixo-v2.png");
  assert.ok(inverted <= reference * 1.6,
    `pernas/cabeça: pose 05=${inverted.toFixed(2)}, referência=${reference.toFixed(2)}`);
});

test("a queda tem doze desenhos distintos, sem lacunas nem pouso antecipado", () => {
  assert.ok(animation, "a sequência deve estar disponível");
  const falling = animation.mascotScrollSteps.filter(step => !step.pouso);
  assert.equal(falling.length, 12);
  assert.equal(new Set(falling.map(step => step.src)).size, 12);
  assert.equal(falling[0].start, 0);
  assert.equal(falling.at(-1).end, 1);
  falling.forEach((step, index) => {
    assert.ok(step.end > step.start);
    if (index) assert.equal(step.start, falling[index - 1].end);
  });
  const landing = animation.mascotScrollSteps.filter(step => step.pouso);
  assert.equal(landing.length, 1);
  assert.equal(landing[0].start, 1);
  assert.ok(falling.some(step => step.src.endsWith("05-de-cabeca-para-baixo-v2.png")));
});

test("todas as poses e resoluções web existem com dimensões e transparência válidas", async () => {
  assert.ok(animation, "a sequência deve estar disponível");
  for (const step of animation.mascotScrollSteps) {
    const source = new URL("../public" + step.src, import.meta.url);
    const metadata = await sharp(source.pathname).metadata();
    assert.equal(metadata.width, step.width, step.src);
    assert.equal(metadata.height, step.height, step.src);
    assert.ok(metadata.hasAlpha, step.src);
    for (const width of [240, 400, 640]) {
      const web = source.pathname.replace("/mascote-poses-caindo/", "/mascote-poses-caindo/web/").replace(/\.png$/, `-${width}.webp`);
      const info = await sharp(web).metadata();
      assert.equal(info.width, width, web);
      assert.ok(info.hasAlpha, web);
    }
  }
});

test("o ângulo visual continua o mesmo na troca entre desenhos já inclinados", () => {
  assert.equal(typeof animation?.poseRotation, "function");
  const falling = animation.mascotScrollSteps.filter(step => !step.pouso);
  for (let index = 0; index < falling.length - 1; index++) {
    const current = falling[index];
    const next = falling[index + 1];
    assert.equal(animation.poseRotation(current, next, 0), current.rotate);
    const outgoingAngle = current.angle + animation.poseRotation(current, next, 1);
    const incomingAngle = next.angle + animation.poseRotation(next, next, 0);
    assert.ok(Math.abs(outgoingAngle - incomingAngle) < 0.001, current.src);
  }
});
