"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "span" | "li";
  timelineStep?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  timelineStep,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Cada bloco de texto recebe um pequeno atraso próprio. Assim, ao entrar
    // na viewport, a leitura acompanha o movimento em vez de todo o conteúdo
    // aparecer de uma vez.
    const textTargets = Array.from(
      el.querySelectorAll<HTMLElement>(
        "p, h1, h2, h3, h4, dt, dd, li, .project-number, .project-link, .timeline-period, .timeline-kind, .stage-label, .project-open, .browser-url"
      )
    ).filter((target) => !target.querySelector(".text-reveal-line"));

    textTargets.forEach((target, index) => {
      target.classList.add("scroll-text");
      target.style.setProperty("--text-delay", `${Math.min(index * 55, 440)}ms`);
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      data-timeline-step={timelineStep}
    >
      {children}
    </Tag>
  );
}
