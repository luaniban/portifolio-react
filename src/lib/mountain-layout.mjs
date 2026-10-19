const LEGACY_ART_HEIGHT = 2172;
const EXTENDED_ART_HEIGHT = 3132;
const TRAIL_VERTICAL_SHIFT = 649;

const percent = (value) => `${value.toFixed(2)}%`;

export const MOUNTAIN_IMAGE = {
  src: "/montanha-noite-site-v4.png",
  daySrc: "/montanha-dia-site-v1.png",
  width: 2048,
  height: 8860,
};

export const SECTION_SIGN_IMAGE = {
  src: "/placas-secao/placa-secao-grama-v1.png",
  width: 1649,
  height: 954,
};

export const CONTENT_SIGN_IMAGE = {
  src: "/placas-secao/placa-conteudo-grama-v1.png",
  width: 1649,
  height: 954,
};

export const TRAJECTORY_IMAGE = {
  directory: "/trajetoria-grama-v2/web",
  width: 1063,
  height: 1023,
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
  { left: "50.05%", top: "56.55%" },
  { left: "54.69%", top: "62.21%" },
  { left: "59.08%", top: "68.34%" },
  { left: "58.59%", top: "74.92%" },
];

// A borda inferior das folhas entra alguns pixels no platô. Assim o contato
// visual é definido pela superfície da grama, não pelo último pixel do PNG.
export function trajectoryStyle(position) {
  return { ...position, "--placa-encaixe": "5.80%" };
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
    top: "54.91%",
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
          "Gosto de transformar processos confusos em experiências simples. Uno lógica, design e visão de produto para criar sistemas que as pessoas realmente gostam de usar.",
          "Atuo em todas as camadas de uma aplicação: interface, regras de negócio, banco de dados, integrações e deploy.",
        ],
      },
      en: {
        body: [
          "I enjoy turning confusing processes into simple experiences. I combine logic, design, and product thinking to create systems people genuinely enjoy using.",
          "I work across every application layer: interface, business rules, databases, integrations, and deployment.",
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
