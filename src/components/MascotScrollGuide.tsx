"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type MascotScrollStep = {
  start: number;
  end: number;
  src: string;
  width: number;
  height: number;
  rotate: number;
  scale: number;
};

export const mascotScrollSteps: MascotScrollStep[] = [
  {
    start: 0,
    end: 0.15,
    src: "/mascote-poses-caindo/01-desequilibrando.png",
    width: 1024,
    height: 1536,
    rotate: -4,
    scale: 1.08,
  },
  {
    start: 0.15,
    end: 0.3,
    src: "/mascote-poses-caindo/02-inicio-da-queda.png",
    width: 1023,
    height: 1538,
    rotate: 4,
    scale: 0.98,
  },
  {
    start: 0.3,
    end: 0.48,
    src: "/mascote-poses-caindo/03-queda-livre.png",
    width: 1024,
    height: 1536,
    rotate: -6,
    scale: 1,
  },
  {
    start: 0.48,
    end: 0.65,
    src: "/mascote-poses-caindo/04-girando.png",
    width: 1024,
    height: 1536,
    rotate: 7,
    scale: 0.96,
  },
  {
    start: 0.65,
    end: 0.82,
    src: "/mascote-poses-caindo/05-de-cabeca-para-baixo.png",
    width: 1023,
    height: 1538,
    rotate: -2,
    scale: 0.98,
  },
  {
    start: 0.82,
    end: 0.96,
    src: "/mascote-poses-caindo/06-estabilizando.png",
    width: 1023,
    height: 1538,
    rotate: 1,
    scale: 1,
  },
  {
    // pouso: de cara na grama, só nos últimos 4% da rolagem
    start: 0.96,
    end: 1,
    src: "/mascote-poses-caindo/07-de-cara-na-grama.png",
    width: 1024,
    height: 1536,
    rotate: 0,
    scale: 1.05,
  },
];

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
  "--mascot-scale": 1.08,
} as CSSProperties;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const interpolate = (from: number, to: number, progress: number) => from + (to - from) * progress;
const maxScale = Math.max(...mascotScrollSteps.map(({ scale }) => scale));

export default function MascotScrollGuide() {
  const guideRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activePose, setActivePose] = useState(0);

  useEffect(() => {
    const guide = guideRef.current;
    const trail = trailRef.current;
    const path = pathRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    mascotScrollSteps.forEach(({ src }) => {
      const image = new window.Image();
      image.src = src;
    });

    if (!guide || !trail || !path || reducedMotion.matches) return;

    let frame = 0;
    let currentPose = 0;
    let trailWidth = 0;
    let trailHeight = 0;
    let samples: { x: number; y: number }[] = [];

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
      const stepIndex = mascotScrollSteps.findIndex(({ end }) => progress < end);
      const safeStepIndex = stepIndex < 0 ? mascotScrollSteps.length - 1 : stepIndex;
      const step = mascotScrollSteps[safeStepIndex];
      const nextStep = mascotScrollSteps[Math.min(safeStepIndex + 1, mascotScrollSteps.length - 1)];
      const localProgress = clamp((progress - step.start) / Math.max(step.end - step.start, 0.001), 0, 1);
      const easedProgress = localProgress * localProgress * (3 - 2 * localProgress);

      // O mascote desce a tela junto com a leitura e segue a linha nessa altura.
      const rect = trail.getBoundingClientRect();
      const scaleX = rect.width / trailWidth;
      const scaleY = rect.height / trailHeight;
      const anchorY = interpolate(0.32, 0.68, progress) * window.innerHeight;
      const point = pointAtY((anchorY - rect.top) / scaleY);

      const x = rect.left + point.x * scaleX;
      const y = rect.top + point.y * scaleY;
      const rotate = interpolate(step.rotate, nextStep.rotate, easedProgress);
      const scale = interpolate(step.scale, nextStep.scale, easedProgress);

      guide.style.setProperty("--mascot-x", `${x}px`);
      guide.style.setProperty("--mascot-y", `${y}px`);
      guide.style.setProperty("--mascot-rotate", `${rotate}deg`);
      guide.style.setProperty("--mascot-scale", String(scale));

      if (safeStepIndex !== currentPose) {
        currentPose = safeStepIndex;
        setActivePose(safeStepIndex);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(() => {
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
        <Image
          key={mascotScrollSteps[activePose].src}
          className="mascot-scroll-image"
          src={mascotScrollSteps[activePose].src}
          alt=""
          width={mascotScrollSteps[activePose].width}
          height={mascotScrollSteps[activePose].height}
          sizes="(max-width: 640px) 88px, (max-width: 1100px) 140px, 184px"
          priority
        />
      </div>
    </>
  );
}
