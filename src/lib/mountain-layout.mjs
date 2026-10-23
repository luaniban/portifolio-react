const LEGACY_ART_HEIGHT = 2172;
const EXTENDED_ART_HEIGHT = 3132;
const TRAIL_VERTICAL_SHIFT = 649;

const percent = (value) => `${value.toFixed(2)}%`;

export const MOUNTAIN_IMAGE = {
  src: "/montanha-noite-site-v4.png",
  daySrc: "/montanha-dia-site-v5.png",
  width: 2048,
  height: 8860,
};

export const SECTION_SIGN_IMAGE = {
  src: "/placas-secao/placa-secao-grama-v1.png",
  width: 1649,
  height: 954,
  supportInset: "17.51%",
};

export const CONTENT_SIGN_IMAGE = {
  src: "/placas-secao/placa-conteudo-grama-v1.png",
  width: 1649,
  height: 954,
  supportInset: "9.12%",
};

export const TRAJECTORY_IMAGE = {
  directory: "/trajetoria-grama-v2/web",
  width: 1063,
  height: 1023,
  supportInset: "7.92%",
};

/** @param {number} legacyPercent @param {number} [shiftPixels] */
export function toExtendedTop(legacyPercent, shiftPixels = 0) {
  const originalPixels = (legacyPercent / 100) * LEGACY_ART_HEIGHT;
  return percent(((originalPixels + shiftPixels) / EXTENDED_ART_HEIGHT) * 100);
}

/** @param {number} legacyPercent */
export function toExtendedHeight(legacyPercent) {
  return percent((legacyPercent * LEGACY_ART_HEIGHT) / EXTENDED_ART_HEIGHT);
}

const legacyProjectPlacements = [
  { left: "27.44%", top: 26.37, width: "18.02%", height: 2.8 },
  { left: "52.44%", top: 26.55, width: "18.21%", height: 2.99 },
  { left: "27.34%", top: 31.01, width: "18.07%", height: 2.99 },
  { left: "52.44%", top: 31.22, width: "18.46%", height: 3.34 },
  { left: "27.34%", top: 36, width: "18.02%", height: 3.08 },
  { left: "52.39%", top: 36.3, width: "18.41%", height: 3.14 },
  { left: "27.29%", top: 41.03, width: "18.07%", height: 3.17 },
  { left: "52.34%", top: 41.23, width: "18.41%", height: 3.12 },
];

export const projectPlacements = legacyProjectPlacements.map(({ top, height, ...horizontal }) => ({
  ...horizontal,
  top: toExtendedTop(top),
  height: toExtendedHeight(height),
}));

// Cada placa usa left/top como o ponto central da base. O CSS desloca a arte
// meia largura para a esquerda e uma altura para cima, fazendo a base pousar
// exatamente no centro da plataforma, independentemente da largura da tela.
export const trajectoryPlacements = [
  { left: "50.05%", top: "56.55%", supportInset: "7.92%" },
  { left: "54.69%", top: "62.21%", supportInset: "7.92%" },
  { left: "59.42%", top: "68.63%", supportInset: "1.31%" },
  { left: "56.20%", top: "75.21%", supportInset: "2.81%" },
];

// A borda inferior das folhas entra alguns pixels no platô. Assim o contato
// visual é definido pela superfície da grama, não pelo último pixel do PNG.
export function trajectoryStyle(position) {
  const { supportInset = TRAJECTORY_IMAGE.supportInset, ...coordinates } = position;
  return { ...coordinates, "--placa-encaixe": supportInset };
}

export function sectionSignStyle(position) {
  return { ...position, "--placa-encaixe": SECTION_SIGN_IMAGE.supportInset };
}

export function contentSignStyle(position) {
  return { ...position, "--placa-encaixe": CONTENT_SIGN_IMAGE.supportInset };
}

export const codeEvolutionTrack = {
  top: "53.84%",
  right: "3.00%",
  bottom: "22.22%",
  width: "25.00%",
};

export const codeEvolutionPlacements = trajectoryPlacements.map(({ top }) => ({
  left: "72.50%",
  top,
  width: "20.00%",
}));

export const sectionPlaques = [
  {
    id: "projetos",
    label: { pt: "Projetos", en: "Projects" },
    left: "50.78%",
    top: "16.70%",
  },
  {
    id: "sobre",
    label: { pt: "Sobre mim", en: "About me" },
    left: "27.00%",
    top: "42.89%",
    width: "15.50%",
  },
  {
    id: "trajetoria",
    label: { pt: "Trajetória", en: "Journey" },
    left: "30.00%",
    top: "54.40%",
  },
  {
    id: "contato",
    label: { pt: "Contato", en: "Contact" },
    left: "25.00%",
    top: "98.76%",
    width: "15.50%",
  },
];

export const contentPanels = [
  {
    id: "sobre",
    left: "56.00%",
    top: "42.89%",
    width: "40.00%",
    copy: {
      pt: {
        body: [
          "Sou desenvolvedor full stack e trabalho principalmente com PHP. Gosto de explorar novas ideias e, como este portfólio mostra, dar um toque criativo e bem-humorado a projetos profissionais.",
          "Gosto de criar experiências que surpreendam e até arranquem um sorriso. Por gostar do que faço, me envolvo em cada detalhe e busco ir além do esperado, encontrando formas de tornar cada entrega melhor.",
        ],
      },
      en: {
        body: [
          "I'm a full stack developer working mainly with PHP. I enjoy exploring new ideas and, as this portfolio shows, bringing creativity and a sense of humor to professional projects.",
          "I enjoy creating experiences that surprise people and even make them smile. Because I love what I do, I care about the details and aim to go beyond expectations, finding ways to make each delivery better.",
        ],
      },
    },
    actions: [],
  },
  {
    id: "contato",
    left: "52.00%",
    top: "98.76%",
    width: "36.00%",
    copy: {
      pt: { body: ["Tem uma ideia? Vamos tirá-la do papel."] },
      en: { body: ["Have an idea? Let's bring it to life."] },
    },
    actions: [
      { label: "E-mail", href: "mailto:luanibanhez.dev@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/luanibanhez" },
      { label: "GitHub", href: "https://github.com/luaniban" },
    ],
  },
];

export const sectionAnchors = [
  { id: "github", top: toExtendedTop(70.2, TRAIL_VERTICAL_SHIFT) },
];
