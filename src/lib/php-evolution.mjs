/**
 * Retorna a etapa da última placa que já cruzou a linha de leitura da tela.
 * Antes da primeira placa, a história começa no primeiro exemplo de PHP.
 *
 * @param {number[]} tops
 * @param {number} triggerLine
 */
export function activeStageFromTops(tops, triggerLine) {
  let activeStage = 0;

  tops.forEach((top, index) => {
    if (top <= triggerLine) activeStage = index;
  });

  return activeStage;
}
