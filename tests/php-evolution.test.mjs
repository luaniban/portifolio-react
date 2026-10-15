import assert from "node:assert/strict";
import test from "node:test";

const evolution = await import("../src/lib/php-evolution.mjs").catch(() => null);

test("o código avança para a última placa que cruzou a linha de leitura", () => {
  assert.ok(evolution, "a regra de evolução do código ainda não existe");

  assert.equal(evolution.activeStageFromTops([720, 1380, 2040, 2700], 800), 0);
  assert.equal(evolution.activeStageFromTops([120, 760, 1420, 2080], 800), 1);
  assert.equal(evolution.activeStageFromTops([-900, -240, 390, 1050], 800), 2);
  assert.equal(evolution.activeStageFromTops([-1500, -840, -180, 470], 800), 3);
});

test("a evolução começa no PHP básico antes da primeira placa", () => {
  assert.ok(evolution, "a regra de evolução do código ainda não existe");
  assert.equal(evolution.activeStageFromTops([900, 1560, 2220, 2880], 800), 0);
  assert.equal(evolution.activeStageFromTops([], 800), 0);
});
