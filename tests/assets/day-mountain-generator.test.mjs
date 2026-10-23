import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");
const nightPath = join(repositoryRoot, "public/montanha-noite-site-v4.png");
const dayPath = join(repositoryRoot, "public/montanha-dia-site-v5.png");
const generatorPath = join(repositoryRoot, "scripts/gerar-montanha-dia.py");
const generateDayMountain = promisify(execFile);

async function decodedPixelHash(path) {
  const image = await sharp(path).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  return {
    hash: createHash("sha256").update(image.data).digest("hex"),
    width: image.info.width,
    height: image.info.height,
    channels: image.info.channels,
  };
}

test("o gerador reproduz os pixels da arte diurna publicada", async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "montanha-dia-"));
  const generatedPath = join(temporaryDirectory, "montanha-dia.png");

  try {
    await generateDayMountain("python3", [generatorPath, nightPath, generatedPath], {
      cwd: repositoryRoot,
    });

    const [night, publishedDay, generatedDay] = await Promise.all(
      [nightPath, dayPath, generatedPath].map(decodedPixelHash),
    );

    assert.deepEqual(
      { width: night.width, height: night.height },
      { width: 2048, height: 8860 },
      "a arte noturna mudou de geometria",
    );
    assert.deepEqual(
      { width: publishedDay.width, height: publishedDay.height, channels: publishedDay.channels },
      { width: night.width, height: night.height, channels: night.channels },
      "a arte diurna publicada mudou de geometria",
    );
    assert.deepEqual(
      { width: generatedDay.width, height: generatedDay.height, channels: generatedDay.channels },
      { width: night.width, height: night.height, channels: night.channels },
      "a saída do gerador mudou de geometria",
    );
    assert.equal(
      generatedDay.hash,
      publishedDay.hash,
      "os pixels do PNG publicado divergem da saída do gerador",
    );
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
