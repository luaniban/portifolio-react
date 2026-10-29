/**
 * @typedef {{start: number, end: number, src: string, width: number,
 * height: number, rotate: number, scale: number, zoom?: number,
 * pouso?: boolean, angle?: number}} MascotScrollStep
 */

// Cada desenho intermediário ocupa um trecho real da rolagem; o pouso
// continua separado e só é disparado pelo contato com a grama.
const frames = [
  ["01-desequilibrando", 1024, 1536, -4, 1.08, 15],
  ["01b-perdendo-apoio", 1024, 1536, 0, 1.03, 5],
  ["02-inicio-da-queda", 1023, 1538, 4, 0.98, 0],
  ["02b-abrindo-pernas", 1024, 1536, -1, 0.99, -20],
  ["03-queda-livre", 1024, 1536, -6, 1, -32],
  ["03b-inclinando", 1024, 1536, 0, 0.98, -43],
  ["04-girando", 1024, 1536, 7, 0.96, -60],
  ["04b-meio-giro", 1024, 1536, 2, 0.97, -125],
  ["05-de-cabeca-para-baixo-v2", 1024, 1536, -2, 0.95, -180],
  ["05b-saindo-do-giro", 1024, 1536, 0, 0.99, -240, 1.3],
  ["06-estabilizando", 1023, 1538, 1, 1, -360],
  ["06b-preparando-impacto", 1024, 1536, 0, 1, -360],
];

/** @type {MascotScrollStep[]} */
export const mascotScrollSteps = frames.map(([name, width, height, rotate, scale, angle, zoom], index) => ({
  start: index / frames.length,
  end: (index + 1) / frames.length,
  src: `/mascote-poses-caindo/${name}.png`,
  width: Number(width),
  height: Number(height),
  rotate: Number(rotate),
  scale: Number(scale),
  angle: Number(angle),
  zoom: Number(zoom ?? 1),
}));

/**
 * Compensa a inclinação já desenhada no sprite para continuar o giro na troca.
 * @param {MascotScrollStep} current
 * @param {MascotScrollStep} next
 * @param {number} progress Progresso já suavizado, entre zero e um.
 */
export function poseRotation(current, next, progress) {
  const target = next.rotate + (next.angle ?? 0) - (current.angle ?? 0);
  return current.rotate + (target - current.rotate) * progress;
}

mascotScrollSteps.push({
  start: 1,
  end: 1,
  src: "/mascote-poses-caindo/07-de-cara-na-grama.png",
  width: 1378,
  height: 1142,
  rotate: 0,
  scale: 1,
  zoom: 1.55,
  pouso: true,
});
