"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "./LanguageProvider";
import { projectsEn } from "../lib/projects.mjs";

export type Projeto = {
  titulo: string;
  destaque: string;
  descricao: string;
  tags: string[];
  miniatura: string;
  url?: string;
};

// Uma tela de projeto dentro de um nicho da montanha. Ao passar o mouse (ou
// focar pelo teclado) a tela cresce e a descrição abre embaixo. Se não couber,
// abre do lado com mais espaço e, se ainda faltar, é empurrada para dentro da
// tela: em telas baixas nenhum dos lados comporta o quadro inteiro.
export default function Nicho({ projeto: projetoOriginal, posicao }: { projeto: Projeto; posicao: CSSProperties }) {
  const { language } = useLanguage();
  const localized = language === "en" ? projectsEn.find((item) => item.miniatura === projetoOriginal.miniatura) : projetoOriginal;
  const projeto = localized ?? projetoOriginal;
  const descricaoRef = useRef<HTMLDivElement>(null);
  const [lado, setLado] = useState({ acima: false, ajuste: 0 });

  const escolherLado = (event: { currentTarget: HTMLElement }) => {
    const descricao = descricaoRef.current;
    if (!descricao) return;

    const nicho = event.currentTarget.getBoundingClientRect();
    const altura = descricao.offsetHeight;
    const distancia = 20 + 12; // do nicho até o quadro + respiro da borda da tela
    const topoUtil = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;

    const embaixo = window.innerHeight - nicho.bottom - distancia;
    const emCima = nicho.top - topoUtil - distancia;
    const acima = embaixo < altura && emCima > embaixo;
    const falta = Math.max(altura - (acima ? emCima : embaixo), 0);

    setLado({ acima, ajuste: acima ? falta : -falta });
  };

  // Miniaturas pré-geradas por scripts/gerar-miniaturas.py: reduzidas de uma
  // vez, com nitidez, ficam bem mais legíveis que as do otimizador do Next.
  const base = `/projects/miniaturas/${projeto.miniatura}`;
  const tela = (
    // eslint-disable-next-line @next/next/no-img-element -- srcset das miniaturas próprias
    <img
      src={`${base}-360.webp`}
      srcSet={`${base}-360.webp 360w, ${base}-720.webp 720w`}
      sizes="(max-width: 860px) 42vw, 21vw"
      alt={language === "en" ? `${projeto.titulo} screenshot` : `Tela do sistema ${projeto.titulo}`}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <article className="nicho" style={posicao} onPointerEnter={escolherLado} onFocus={escolherLado}>
      {projeto.url ? (
        <a className="nicho-tela" href={projeto.url} target="_blank" rel="noreferrer">
          {tela}
        </a>
      ) : (
        <div className="nicho-tela" tabIndex={0}>
          {tela}
        </div>
      )}

      <div
        ref={descricaoRef}
        className={`nicho-descricao${lado.acima ? " is-acima" : ""}`}
        style={{ "--ajuste": `${lado.ajuste}px` } as CSSProperties}
      >
        <h3>{projeto.titulo}</h3>
        <p className="nicho-destaque">{projeto.destaque}</p>
        <p>{projeto.descricao}</p>
        <p className="nicho-tags">{projeto.tags.join(" · ")}</p>
      </div>
    </article>
  );
}
