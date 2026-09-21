"use client";

import { useEffect, useRef } from "react";

// Neblina fixa na parte de baixo da tela. Ela se dissipa conforme o chão de
// grama ([data-neblina-fim]) sobe pela tela: quando o mascote pousa, já sumiu.
export default function Neblina() {
  const neblinaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const neblina = neblinaRef.current;
    const chao = document.querySelector<HTMLElement>("[data-neblina-fim]");
    if (!neblina || !chao) return;

    let frame = 0;

    const atualizar = () => {
      frame = 0;
      const topoDoChao = chao.getBoundingClientRect().top;
      const altura = window.innerHeight;

      // chão abaixo da tela: neblina cheia; chão a 45% da tela: nenhuma
      const inicio = altura;
      const fim = altura * 0.45;
      const opacidade = Math.min(Math.max((topoDoChao - fim) / (inicio - fim), 0), 1);
      neblina.style.opacity = String(opacidade);
    };

    const pedirAtualizacao = () => {
      if (!frame) frame = window.requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", pedirAtualizacao, { passive: true });
    window.addEventListener("resize", pedirAtualizacao);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", pedirAtualizacao);
      window.removeEventListener("resize", pedirAtualizacao);
    };
  }, []);

  return <div ref={neblinaRef} className="neblina" aria-hidden="true" />;
}
