"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const between = (from: number, to: number, progress: number) => from + (to - from) * progress;

function documentRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

export default function ProjectScrollTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transition = transitionRef.current;
    const source = document.querySelector<HTMLElement>("[data-shared-project-source]");
    const target = document.querySelector<HTMLElement>("[data-shared-project-target]");

    if (!transition || !source || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let sourceRect: Rect;
    let targetRect: Rect;
    let startAt = 0;
    let endAt = 1;
    let frame = 0;

    const update = () => {
      frame = 0;

      const progress = clamp((window.scrollY - startAt) / (endAt - startAt), 0, 1);
      const x = between(sourceRect.left, targetRect.left, progress) - window.scrollX;
      const y = between(sourceRect.top, targetRect.top, progress) - window.scrollY;
      const width = between(sourceRect.width, targetRect.width, progress);
      const height = between(sourceRect.height, targetRect.height, progress);

      const entering = clamp(progress / 0.06, 0, 1);
      const leaving = clamp((1 - progress) / 0.1, 0, 1);

      transition.style.setProperty("--morph-x", `${x}px`);
      transition.style.setProperty("--morph-y", `${y}px`);
      transition.style.setProperty("--morph-width", `${width}px`);
      transition.style.setProperty("--morph-height", `${height}px`);
      transition.style.setProperty("--morph-rotate", `${between(-2, 0, progress)}deg`);
      transition.style.opacity = String(Math.min(entering, leaving));
      source.style.opacity = String(1 - entering);
    };

    const measure = () => {
      source.style.opacity = "";
      sourceRect = documentRect(source);
      targetRect = documentRect(target);
      startAt = Math.max(0, sourceRect.top - window.innerHeight * 0.48);
      endAt = Math.max(startAt + 1, targetRect.top - window.innerHeight * 0.42);
      update();
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frame);
      source.style.opacity = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="project-scroll-morph" ref={transitionRef} aria-hidden="true">
      <div className="morph-browser-frame">
        <div className="morph-browser-bar">
          <span className="morph-browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="morph-browser-url">questionarios-rede.luanibanhez.tech</span>
        </div>
        <div className="morph-browser-preview">
          <Image src="/projects/questionarios-rede.png" alt="" fill sizes="60vw" />
        </div>
      </div>
    </div>
  );
}
