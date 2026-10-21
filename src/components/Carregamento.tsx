"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { mascotScrollSteps, poseSrcSet, poseUrl } from "./MascotScrollGuide";

// Sem isso a tela abre num céu vazio, com o mascote solto no ar, e a arte
// aparece aos pedaços. A tela cobre tudo até a primeira cena estar pronta: a
// arte, o título, o astro e o mascote no pico. Só aparece com JS (html.js);
// se algo travar, some sozinha depois de LIMITE_MS.
const LIMITE_MS = 10000;

// De dia o navegador baixa as duas artes, e a de dia vem por último, com
// prioridade baixa: numa conexão lenta ela chega vários segundos depois. Com o
// resto pronto, ela tem ESPERA_DIA_MS para chegar; se não chegar, a tela sai
// mostrando a cena da noite e a de dia entra esmaecendo quando ficar pronta.
const ESPERA_DIA_MS = 1500;

const poseNoPico = mascotScrollSteps[0];

const imagemPronta = (imagem: HTMLImageElement) =>
  new Promise<void>((resolve) => {
    if (imagem.complete) return resolve();
    imagem.addEventListener("load", () => resolve(), { once: true });
    imagem.addEventListener("error", () => resolve(), { once: true });
  }).then(() => imagem.decode().catch(() => undefined));

// A arte de dia só aparece quando o MountainArt marca .is-ready.
const classePresente = (elemento: Element, classe: string) =>
  new Promise<void>((resolve) => {
    if (elemento.classList.contains(classe)) return resolve();
    const observador = new MutationObserver(() => {
      if (!elemento.classList.contains(classe)) return;
      observador.disconnect();
      resolve();
    });
    observador.observe(elemento, { attributes: true, attributeFilter: ["class"] });
  });

export default function Carregamento() {
  const [pronto, setPronto] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const raiz = document.documentElement;
    const dia = raiz.getAttribute("data-theme") === "light";
    const seletores = [
      ".mapa-titulo img",
      ".mascot-scroll-image",
      dia ? ".mapa-astro-sol" : ".mapa-astro-lua",
      ".mapa-arte-noite",
    ];
    let cena: Promise<void> = Promise.all(
      seletores
        .map((seletor) => document.querySelector<HTMLImageElement>(seletor))
        .filter((imagem) => imagem !== null)
        .map(imagemPronta),
    ).then(() => undefined);

    const arteDia = document.querySelector(".mapa-arte-dia");
    if (dia && arteDia) {
      const diaPronto = classePresente(arteDia, "is-ready");
      cena = cena.then(() =>
        Promise.race([diaPronto, new Promise<void>((resolve) => window.setTimeout(resolve, ESPERA_DIA_MS))]),
      );
    }

    // a página não rola por baixo da tela: ao abrir, a cena começa no pico
    raiz.style.overflow = "hidden";
    let ativo = true;
    const terminar = () => {
      if (!ativo) return;
      ativo = false;
      raiz.style.removeProperty("overflow");
      setPronto(true);
    };

    const limite = window.setTimeout(terminar, LIMITE_MS);
    // Um quadro entre a cena pronta e a saída: sem ele o .is-ready da arte de
    // dia e o .is-done entram no mesmo cálculo de estilo, e a arte esmaece já
    // com a tela saindo.
    void cena.then(() =>
      window.requestAnimationFrame(() => window.requestAnimationFrame(terminar)),
    );

    return () => {
      ativo = false;
      window.clearTimeout(limite);
      raiz.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div className={`carregamento${pronto ? " is-done" : ""}`} role="status" aria-hidden={pronto || undefined}>
      <span className="carregamento-status">{pronto ? "" : language === "en" ? "Loading" : "Carregando"}</span>
      <div className="carregamento-cena" aria-hidden="true">
        <span className="carregamento-pico" />
        {/* eslint-disable-next-line @next/next/no-img-element -- srcset das poses próprias */}
        <img
          className="carregamento-mascote"
          src={poseUrl(poseNoPico.src, 240)}
          srcSet={poseSrcSet(poseNoPico.src)}
          sizes="(max-width: 438px) 26vw, 7.2rem"
          alt=""
          width={poseNoPico.width}
          height={poseNoPico.height}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
