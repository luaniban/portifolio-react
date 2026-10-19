import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectModule = await import(join(repositoryRoot, "src/lib/projects.mjs")).catch(() => null);

test("somente o projeto do hackathon menciona Caraguatatuba", () => {
  assert.ok(projectModule, "os projetos ainda não estão disponíveis como dados verificáveis");

  for (const project of projectModule.projects) {
    assert.doesNotMatch(
      project.descricao,
      /Prefeitura|Secretaria de Educação/i,
      `${project.titulo} ainda cria vínculo institucional indevido`,
    );

    if (project.titulo === "Paideia") {
      assert.match(project.descricao, /hackathon.+Caraguatatuba/i);
      continue;
    }

    assert.doesNotMatch(
      project.descricao,
      /Caraguatatuba/i,
      `${project.titulo} ainda cria vínculo geográfico indevido`,
    );
  }
});

test("preserva os oito projetos na ordem exibida na montanha", () => {
  assert.ok(projectModule, "os projetos ainda não estão disponíveis como dados verificáveis");
  assert.deepEqual(
    projectModule.projects.map(({ titulo }) => titulo),
    [
      "AvaRede — Questionários da Rede",
      "LivroDigital",
      "HelpEduc — Chamados de TI",
      "Quizzard",
      "Paideia",
      "PDGE",
      "Autoavaliação",
      "SIGTU",
    ],
  );
});

test("Quizzard e SIGTU abrem seus domínios públicos", () => {
  assert.ok(projectModule, "os projetos ainda não estão disponíveis como dados verificáveis");

  const urlByTitle = Object.fromEntries(projectModule.projects.map(({ titulo, url }) => [titulo, url]));
  assert.equal(urlByTitle.Quizzard, "https://quizzard.luanibanhez.tech/");
  assert.equal(urlByTitle.SIGTU, "https://sigtu.luanibanhez.tech/");
});
