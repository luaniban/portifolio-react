import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";

const animation = await import("../src/lib/mascot-animation.mjs").catch(() => null);

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

test("a pose 05 não aumenta a altura aparente do mascote em relação à pose 06", async () => {
  const height = async step => {
    const { data, info } = await sharp(new URL("../public" + step.src, import.meta.url).pathname)
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let top = info.height;
    let bottom = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] < 200) continue;
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
    return (bottom - top + 1) / info.width * step.scale;
  };
  const inverted = animation.mascotScrollSteps.find(step => step.src.includes("05-de-cabeca-para-baixo-v2"));
  const canonical = animation.mascotScrollSteps.find(step => step.src.includes("06-estabilizando"));
  const referenceHeight = await height(canonical);
  const difference = Math.abs(await height(inverted) - referenceHeight) / referenceHeight;
  assert.ok(difference < 0.02, `diferença de altura visível: ${(difference * 100).toFixed(2)}%`);
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
