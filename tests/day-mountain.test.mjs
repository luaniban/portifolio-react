import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const nightPath = join(repositoryRoot, "public/montanha-noite-site-v4.png");
const dayPath = process.env.MOUNTAIN_DAY_IMAGE ?? join(repositoryRoot, "public/montanha-dia-site-v5.png");

const isolatedTrees = [
  { name: "árvore apagada à esquerda de Projetos", left: 525, top: 1410, width: 55, height: 100, minimumPixels: 300 },
  { name: "árvore pequena no canto do campo de Projetos", left: 478, top: 1470, width: 40, height: 60, minimumPixels: 400 },
  { name: "árvore atrás da placa de Projetos", left: 1140, top: 1260, width: 70, height: 120 },
  { name: "copa junto à primeira caverna", left: 360, top: 1600, width: 55, height: 140 },
  { name: "conífera superior", left: 178, top: 1846, width: 156, height: 272 },
  { name: "galho central", left: 57, top: 2266, width: 120, height: 240 },
  { name: "conífera inferior", left: 87, top: 2479, width: 72, height: 131 },
  { name: "conífera da borda", left: 0, top: 2537, width: 93, height: 92 },
  { name: "conífera mais baixa", left: 0, top: 2793, width: 75, height: 116 },
];

const protectedRockFaces = [
  { name: "face rochosa à direita das coníferas", left: 450, top: 1800, width: 120, height: 150 },
  { name: "paredão acima do campo", left: 1320, top: 3360, width: 80, height: 180 },
  { name: "rocha junto à escada", left: 440, top: 5310, width: 70, height: 120 },
];

test("o céu acima das árvores de Projetos não recebe manchas de rocha ou folhagem", async () => {
  const region = { left: 620, top: 1180, width: 60, height: 60 };
  const data = await sharp(dayPath).extract(region).raw().toBuffer();
  let skyPixels = 0;
  for (let offset = 0; offset < data.length; offset += 3) {
    const y = region.top + Math.floor(offset / 3 / region.width);
    const t = Math.min(y / 2600, 1);
    const expected = [74 + 102 * t, 163 + 61 * t, 232 + 18 * t];
    if (expected.every((value, channel) => Math.abs(data[offset + channel] - value) < 3)) skyPixels += 1;
  }
  assert.ok(skyPixels / (region.width * region.height) >= 0.98, "a recuperação das árvores manchou o céu");
});

test("o céu diurno não apaga a silhueta das árvores e da rocha junto às cavernas", async () => {
  const region = { left: 0, top: 1500, width: 440, height: 1440 };
  const [night, day] = await Promise.all(
    [nightPath, dayPath].map(path => sharp(path).extract(region).raw().toBuffer()),
  );
  let surface = 0;
  let erased = 0;
  for (let offset = 0; offset < night.length; offset += 3) {
    const [r, g, b] = night.subarray(offset, offset + 3);
    // Tons azul-esverdeados da superfície original, fora da família do céu.
    if (!(b > 50 && b < 200 && g > r * 2 && g / b >= 0.42 && g / b <= 0.64)) continue;
    surface += 1;
    const y = region.top + Math.floor(offset / 3 / region.width);
    const t = Math.min(y / 2600, 1);
    const sky = [74 + 102 * t, 163 + 61 * t, 232 + 18 * t];
    if (sky.every((value, channel) => Math.abs(day[offset + channel] - value) < 3)) erased += 1;
  }
  assert.ok(surface > 10000, "a amostra deve conter superfície suficiente");
  assert.ok(erased / surface < 0.01, `${erased} de ${surface} pixels da superfície foram substituídos pelo céu`);
});

async function blueSurfaceColorStats(region) {
  const [night, day] = await Promise.all(
    [nightPath, dayPath].map((path) =>
      sharp(path).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    ),
  );

  let candidatePixels = 0;
  let greenPixels = 0;
  let neutralPixels = 0;
  let vividPixels = 0;
  let washedPixels = 0;
  let shadowPixels = 0;

  for (let offset = 0; offset < night.data.length; offset += night.info.channels) {
    const [nightRed, nightGreen, nightBlue] = night.data.subarray(offset, offset + 3);
    const blueSpan = nightBlue - nightRed;
    const greenPosition = blueSpan > 0 ? (nightGreen - nightRed) / blueSpan : -1;
    const saturation = nightBlue > 0 ? (nightBlue - Math.min(nightRed, nightGreen)) / nightBlue : 0;
    const isTreeBlue =
      nightBlue > 25 &&
      nightBlue < 200 &&
      nightBlue > nightGreen &&
      greenPosition >= 0.4 &&
      greenPosition <= 0.67 &&
      saturation > 0.667;

    if (!isTreeBlue) continue;

    candidatePixels += 1;
    const [dayRed, dayGreen, dayBlue] = day.data.subarray(offset, offset + 3);
    const maximum = Math.max(dayRed, dayGreen, dayBlue);
    const minimum = Math.min(dayRed, dayGreen, dayBlue);
    const daySaturation = maximum > 0 ? (maximum - minimum) / maximum : 0;

    if (dayGreen > dayRed * 1.12 && dayGreen > dayBlue * 1.08 && dayGreen > 35) greenPixels += 1;
    if (maximum - minimum < 35 && maximum > 20) neutralPixels += 1;
    if (
      dayGreen > dayRed * 1.18 &&
      dayGreen > dayBlue * 1.1 &&
      daySaturation >= 0.47 &&
      dayGreen >= 55 &&
      maximum <= 220
    ) {
      vividPixels += 1;
    }
    if (daySaturation < 0.35 || maximum > 230) washedPixels += 1;
    if (maximum <= 100 && daySaturation >= 0.35) shadowPixels += 1;
  }

  return {
    candidatePixels,
    greenRatio: greenPixels / candidatePixels,
    neutralRatio: neutralPixels / candidatePixels,
    vividRatio: vividPixels / candidatePixels,
    washedRatio: washedPixels / candidatePixels,
    shadowRatio: shadowPixels / candidatePixels,
  };
}

test("as coníferas isoladas da lateral permanecem verdes e vivas na arte diurna", async () => {
  for (const region of isolatedTrees) {
    const stats = await blueSurfaceColorStats(region);

    assert.ok(stats.candidatePixels >= (region.minimumPixels ?? 1_000), `${region.name} não contém amostra suficiente de folhagem`);
    assert.ok(
      stats.greenRatio >= 0.6,
      `${region.name} tem só ${(stats.greenRatio * 100).toFixed(1)}% da folhagem verde`,
    );
    assert.ok(
      stats.neutralRatio <= 0.2,
      `${region.name} ainda tem ${(stats.neutralRatio * 100).toFixed(1)}% da folhagem cinza`,
    );
    assert.ok(
      stats.vividRatio >= 0.75,
      `${region.name} tem só ${(stats.vividRatio * 100).toFixed(1)}% da folhagem viva`,
    );
    assert.ok(
      stats.washedRatio <= 0.2,
      `${region.name} ainda tem ${(stats.washedRatio * 100).toFixed(1)}% da folhagem apagada`,
    );
    assert.ok(
      stats.shadowRatio >= 0.2,
      `${region.name} tem só ${(stats.shadowRatio * 100).toFixed(1)}% de sombra na copa`,
    );
  }
});

test("as rochas protegidas, inclusive junto ao céu, continuam cinzas", async () => {
  for (const region of protectedRockFaces) {
    const stats = await blueSurfaceColorStats(region);

    assert.ok(stats.candidatePixels >= 3_000, `${region.name} não contém amostra suficiente de rocha`);
    assert.ok(
      stats.greenRatio <= 0.25,
      `${region.name} ganhou ${(stats.greenRatio * 100).toFixed(1)}% de verde indevido`,
    );
    assert.ok(
      stats.neutralRatio >= 0.7,
      `${region.name} conserva só ${(stats.neutralRatio * 100).toFixed(1)}% da pedra cinza`,
    );
  }
});
