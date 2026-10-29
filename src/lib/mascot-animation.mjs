/**
 * @typedef {{id: string, start: number, end: number, src: string, width: number,
 * height: number, rotate: number, scale: number, zoom?: number,
 * pouso?: boolean, angle?: number}} MascotScrollStep
 */

// Cada desenho intermediário ocupa um trecho real da rolagem; o pouso
// continua separado e só é disparado pelo contato com a grama.
export const MASCOT_FALL_SCALE = 1.08;

// Zoom calibrado pela área das pupilas / largura de cada PNG, tomando a
// primeira pose como referência. Não usamos a caixa do corpo: braços abertos,
// joelhos dobrados e rotação mudam essa caixa sem mudar o tamanho do mascote.
const frames = [
  ["01-desequilibrando", 1024, 1536, -4, 15, 1],
  ["01b-perdendo-apoio", 1024, 1536, 0, 5, 0.97499],
  ["02-inicio-da-queda", 1023, 1538, 4, 0, 1.00303],
  ["02b-abrindo-pernas", 1024, 1536, -1, -20, 1.03161],
  ["03-queda-livre", 1024, 1536, -6, -32, 1.13201],
  ["03b-inclinando", 1024, 1536, 0, -43, 1.1374],
  ["04-girando", 1024, 1536, 7, -60, 1.22371],
  ["04b-meio-giro", 1024, 1536, 2, -125, 1.30127],
  ["05-de-cabeca-para-baixo-v2", 1024, 1536, -2, -180, 0.98946],
  // A saída do giro usa a arte canônica inclinada; só a rotação muda.
  // Isso mantém cabeça, anatomia, roupa e traço exatamente iguais à pose 06.
  ["05b-saindo-do-giro", 1023, 1538, 120, -360, 0.99969, "06-estabilizando"],
  ["06-estabilizando", 1023, 1538, 1, -360, 0.99969],
  ["06b-preparando-impacto", 1024, 1536, 0, -360, 0.93972],
];

/** @type {MascotScrollStep[]} */
export const mascotScrollSteps = frames.map(([name, width, height, rotate, angle, zoom, asset = name], index) => ({
  id: String(name),
  start: index / frames.length,
  end: (index + 1) / frames.length,
  src: `/mascote-poses-caindo/${asset}.png`,
  width: Number(width),
  height: Number(height),
  rotate: Number(rotate),
  scale: MASCOT_FALL_SCALE,
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
  id: "07-de-cara-na-grama",
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
