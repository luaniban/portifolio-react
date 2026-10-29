"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { mascotScrollSteps, poseRotation } from "../lib/mascot-animation.mjs";

export { mascotScrollSteps };
type MascotScrollStep = (typeof mascotScrollSteps)[number];

const posesDaQueda = mascotScrollSteps.filter(({ pouso }) => !pouso);
const indicePouso = mascotScrollSteps.findIndex(({ pouso }) => pouso);

// Pés em relação ao centro do mascote, na pose de pé (quadro 1:1,5), em
// proporção da largura. Fixo de propósito: medir pelo quadro da pose atual faria
// a troca para a pose deitada (quadro mais baixo) desfazer o próprio pouso.
const PES_ABAIXO_DO_CENTRO = 0.68;

// Altura do topo do desenho da pose deitada até a base do quadro, em proporção
// da largura (o desenho começa na linha 136 de uma imagem 1378x1142; a margem
// transparente de baixo conta, porque o zoom cresce a partir da base do quadro).
const DESENHO_DEITADO_POR_LARGURA = (1142 - 136) / 1378;

// Trajeto em coordenadas normalizadas (0–100): ponto inicial + curvas cúbicas.
const TRAIL_START: [number, number] = [78, 5];
const TRAIL_CURVES: [number, number, number, number, number, number][] = [
  [96, 10, 98, 18, 96, 24],
  [92, 31, 53, 31, 50, 40],
  [47, 49, 100, 48, 99, 57],
  [91, 70, 1, 65, 0, 74],
  [0, 84, 72, 89, 96, 97],
];
const TRAIL_SAMPLES = 480;

// Sola do pé de apoio na pose 1, medida no PNG e relativa ao centro do quadro.
const MASCOT_FOOT = { x: -0.047, y: 0.4121 };

type Point = { x: number; y: number };

const buildTrail = (mapX: (x: number) => number, mapY: (y: number) => number, start?: Point) => {
  const point = (x: number, y: number) => `${mapX(x).toFixed(2)} ${mapY(y).toFixed(2)}`;
  const curves = TRAIL_CURVES.map(
    ([x1, y1, x2, y2, x, y]) => `C ${point(x1, y1)}, ${point(x2, y2)}, ${point(x, y)}`,
  );

  if (!start) return [`M ${point(...TRAIL_START)}`, ...curves].join(" ");

  // Saindo do pico da montanha: cai colado nele antes de abrir para a direita.
  const [, , x2, y2, x, y] = TRAIL_CURVES[0];
  const drop = start.y + (mapY(y) - start.y) * 0.4;

  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${start.x.toFixed(2)} ${drop.toFixed(2)}, ${point(x2, y2)}, ${point(x, y)}`,
    ...curves.slice(1),
  ].join(" ");
};

const fallbackTrail = buildTrail((x) => x, (y) => y);

const initialStyle = {
  "--mascot-x": "78vw",
  "--mascot-y": "36vh",
  "--mascot-rotate": "-4deg",
  "--mascot-scale": mascotScrollSteps[0].scale,
} as CSSProperties;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const interpolate = (from: number, to: number, progress: number) => from + (to - from) * progress;
const maxScale = Math.max(...mascotScrollSteps.map(({ scale }) => scale));

// Versões web das poses (scripts/gerar-mascote.py). O tamanho pedido ao
// navegador é o do quadro vezes a maior escala e o zoom da pose: é assim que o
// mascote aparece, e em telas 2x a imagem não precisa ser esticada.
const POSE_WIDTHS = [240, 400, 640];

export const poseUrl = (src: string, width: number) =>
  src.replace("/mascote-poses-caindo/", "/mascote-poses-caindo/web/").replace(/\.png$/, `-${width}.webp`);

export const poseSrcSet = (src: string) => POSE_WIDTHS.map((width) => `${poseUrl(src, width)} ${width}w`).join(", ");

const poseSizes = ({ zoom = 1 }: MascotScrollStep) => {
  const factor = (maxScale * zoom).toFixed(2);
  return `(max-width: 640px) calc(88px * ${factor}), (max-width: 1100px) calc(140px * ${factor}), calc(184px * ${factor})`;
};

export default function MascotScrollGuide() {
  const guideRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activePose, setActivePose] = useState(0);
  const [previousPose, setPreviousPose] = useState(0);

  useEffect(() => {
    const guide = guideRef.current;
    const trail = trailRef.current;
    const path = pathRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Pré-carrega a mesma versão que o <img> vai escolher para cada pose.
    mascotScrollSteps.forEach((step) => {
      const image = new window.Image();
      image.sizes = poseSizes(step);
      image.srcset = poseSrcSet(step.src);
    });

    if (!guide || !trail || !path || reducedMotion.matches) return;

    let frame = 0;
    let currentPose = 0;
    let trailWidth = 0;
    let trailHeight = 0;
    let samples: { x: number; y: number }[] = [];
    // Onde ele pousou, em coordenadas da página: depois do pouso ele fica preso
    // ali, em vez de seguir deslizando pela grama com a rolagem.
    let pousoFixo: { x: number; baseNaPagina: number } | null = null;
    // Altura da tela (0–1) onde começa a linha que o mascote acompanha. Nunca
    // abaixo do ponto de partida: no celular o pico fica bem alto na tela, e a
    // linha fixa em 32% já começava com o mascote caindo, longe do pico.
    let inicioDaLinha = 0.32;

    // Ponto de partida: a sola do pé em cima de [data-mascot-start] (o pico da
    // montanha). Descontamos do centro do quadro o vetor até o pé, já girado e
    // escalado como o CSS faz, para o apoio cair exatamente no pico.
    const startOnAnchor = (trailRect: DOMRect): Point | undefined => {
      const anchor = document.querySelector<HTMLElement>("[data-mascot-start]");
      if (!anchor) return undefined;

      const rect = anchor.getBoundingClientRect();
      const { rotate, scale } = mascotScrollSteps[0];
      const radians = (rotate * Math.PI) / 180;
      const footX = MASCOT_FOOT.x * guide.offsetWidth * scale;
      const footY = MASCOT_FOOT.y * guide.offsetHeight * scale;

      return {
        x:
          rect.left + rect.width / 2 - trailRect.left -
          (footX * Math.cos(radians) - footY * Math.sin(radians)),
        y:
          rect.top + rect.height / 2 - trailRect.top -
          (footX * Math.sin(radians) + footY * Math.cos(radians)),
      };
    };

    // Redesenha o trajeto em pixels, com margem lateral de meia largura do
    // mascote: assim o centro dele pode ficar sempre sobre a linha sem cortar.
    const rebuildTrail = () => {
      const trailRect = trail.getBoundingClientRect();
      const { width, height } = trailRect;
      if (!width || !height) return;

      const margin = (guide.offsetWidth / 2) * maxScale + 12;
      const isMobile = window.innerWidth <= 640;
      const left = isMobile ? Math.max(margin, width * 0.68) : margin;
      const right = Math.max(width - margin, left);

      trailWidth = width;
      trailHeight = height;
      trail.setAttribute("viewBox", `0 0 ${width} ${height}`);
      path.setAttribute(
        "d",
        buildTrail(
          (x) => left + (x / 100) * (right - left),
          (y) => (y / 100) * height,
          startOnAnchor(trailRect),
        ),
      );

      const length = path.getTotalLength();
      samples = Array.from({ length: TRAIL_SAMPLES + 1 }, (_, index) => {
        const { x, y } = path.getPointAtLength((length * index) / TRAIL_SAMPLES);
        return { x, y };
      });

      const partidaNaPagina = samples[0].y + trailRect.top + window.scrollY;
      inicioDaLinha = clamp(partidaNaPagina / window.innerHeight, 0, 0.32);
    };

    // Ponto do trajeto na altura pedida (primeiro cruzamento), interpolado.
    const pointAtY = (targetY: number) => {
      if (targetY <= samples[0].y) return samples[0];

      for (let index = 1; index < samples.length; index += 1) {
        const next = samples[index];
        if (next.y >= targetY) {
          const previous = samples[index - 1];
          const t = (targetY - previous.y) / Math.max(next.y - previous.y, 0.001);
          return { x: interpolate(previous.x, next.x, t), y: targetY };
        }
      }

      return samples[samples.length - 1];
    };

    const update = () => {
      frame = 0;
      if (!samples.length) return;

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = clamp(window.scrollY / maxScroll, 0, 1);
      const stepIndex = posesDaQueda.findIndex(({ end }) => progress < end);
      const quedaIndex = stepIndex < 0 ? posesDaQueda.length - 1 : stepIndex;
      const step = posesDaQueda[quedaIndex];
      const nextStep = posesDaQueda[Math.min(quedaIndex + 1, posesDaQueda.length - 1)];
      const localProgress = clamp((progress - step.start) / Math.max(step.end - step.start, 0.001), 0, 1);
      const easedProgress = localProgress * localProgress * (3 - 2 * localProgress);

      // O mascote desce a tela junto com a leitura e segue a linha nessa altura.
      const rect = trail.getBoundingClientRect();
      const scaleX = rect.width / trailWidth;
      const scaleY = rect.height / trailHeight;
      const anchorY = interpolate(inicioDaLinha, 0.68, progress) * window.innerHeight;
      const point = pointAtY((anchorY - rect.top) / scaleY);

      const x = rect.left + point.x * scaleX;
      const y = rect.top + point.y * scaleY;
      const rotate = poseRotation(step, nextStep, easedProgress);
      // O zoom da imagem compensa o enquadramento de cada desenho. A escala
      // do boneco não varia com a rolagem nem antecipa o tamanho da próxima pose.
      const scale = step.scale;

      // Pousou quando os pés passam da linha da grama.
      const chao = document.querySelector<HTMLElement>("[data-mascot-chao]");
      const pes = y + guide.offsetWidth * PES_ABAIXO_DO_CENTRO * scale;
      // No celular os pés não chegam à grama antes da rolagem acabar: no fim da
      // página ele pousa de qualquer jeito, caindo até o campo.
      const noFim = window.scrollY >= maxScroll - 2;
      const pousou = indicePouso >= 0 && !!chao && (pes >= chao.getBoundingClientRect().top || noFim);
      const pose = pousou ? indicePouso : mascotScrollSteps.indexOf(step);
      const poseAtual = mascotScrollSteps[pose];

      let posX = x;
      let posY = y;
      if (pousou) {
        if (!pousoFixo) {
          // Deitado, ele ocupa quase toda a faixa de grama que sobra embaixo da
          // placa: a base vai para o fundo do campo ([data-mascot-base]), e não
          // para onde estavam os pés, que o deixaria em cima da placa. A
          // diferença vira uma queda curta na entrada da pose (--queda).
          const fundo = document.querySelector<HTMLElement>("[data-mascot-base]");
          const base = fundo ? fundo.getBoundingClientRect().bottom - guide.offsetWidth * 0.1 : pes;
          pousoFixo = { x, baseNaPagina: base + window.scrollY };
          guide.style.setProperty("--queda", `${Math.min(pes - base, 0)}px`);

          // O zoom da pose deitada não pode passar da altura do campo: em telas
          // em que o mascote fica no tamanho mínimo, ele subiria na placa.
          if (chao) {
            const campo = base - chao.getBoundingClientRect().top - 6;
            const desenhoSemZoom = guide.offsetWidth * DESENHO_DEITADO_POR_LARGURA;
            guide.style.setProperty("--zoom-limite", String(Math.max(campo / desenhoSemZoom, 0.6)));
          }
        }
        const meiaAltura = (guide.offsetWidth * poseAtual.height) / poseAtual.width / 2;
        posX = pousoFixo.x;
        posY = pousoFixo.baseNaPagina - window.scrollY - meiaAltura;
      } else if (pousoFixo) {
        pousoFixo = null;
        guide.style.removeProperty("--queda");
        guide.style.removeProperty("--zoom-limite");
      }

      guide.style.setProperty("--mascot-x", `${posX}px`);
      guide.style.setProperty("--mascot-y", `${posY}px`);
      guide.style.setProperty("--mascot-rotate", `${pousou ? poseAtual.rotate : rotate}deg`);
      guide.style.setProperty("--mascot-scale", String(pousou ? poseAtual.scale : scale));

      if (pose !== currentPose) {
        setPreviousPose(currentPose);
        currentPose = pose;
        setActivePose(pose);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(() => {
      pousoFixo = null;
      rebuildTrail();
      requestUpdate();
    });

    rebuildTrail();
    update();
    resizeObserver.observe(trail);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <>
      <svg
        ref={trailRef}
        className="mascot-scroll-trail"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path ref={pathRef} d={fallbackTrail} />
      </svg>

      <div
        ref={guideRef}
        className="mascot-scroll-guide"
        style={initialStyle}
        aria-hidden="true"
      >
        {previousPose !== activePose && !mascotScrollSteps[activePose].pouso && (
          /* eslint-disable-next-line @next/next/no-img-element -- camada anterior do sprite */
          <img
            key={`previous-${previousPose}-${activePose}`}
            className="mascot-scroll-image is-previous"
            src={poseUrl(mascotScrollSteps[previousPose].src, POSE_WIDTHS[1])}
            srcSet={poseSrcSet(mascotScrollSteps[previousPose].src)}
            sizes={poseSizes(mascotScrollSteps[previousPose])}
            alt=""
            width={mascotScrollSteps[previousPose].width}
            height={mascotScrollSteps[previousPose].height}
            style={{
              "--pose-angle-offset": `${(mascotScrollSteps[activePose].angle ?? 0) - (mascotScrollSteps[previousPose].angle ?? 0)}deg`,
              "--pose-zoom": mascotScrollSteps[previousPose].zoom ?? 1,
            } as CSSProperties}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element -- srcset das poses próprias */}
        <img
          key={mascotScrollSteps[activePose].src}
          className={`mascot-scroll-image${mascotScrollSteps[activePose].pouso ? " is-landing" : ""}`}
          src={poseUrl(mascotScrollSteps[activePose].src, POSE_WIDTHS[1])}
          srcSet={poseSrcSet(mascotScrollSteps[activePose].src)}
          sizes={poseSizes(mascotScrollSteps[activePose])}
          alt=""
          width={mascotScrollSteps[activePose].width}
          height={mascotScrollSteps[activePose].height}
          style={{
            "--pose-zoom": mascotScrollSteps[activePose].zoom ?? 1,
            transformOrigin: mascotScrollSteps[activePose].pouso ? "center bottom" : "center",
          } as CSSProperties}
          fetchPriority={activePose === 0 ? "high" : undefined}
        />
      </div>
    </>
  );
}
