"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { CONTENT_SIGN_IMAGE, contentSignStyle } from "../lib/mountain-layout.mjs";
import { useLanguage } from "./LanguageProvider";

type Language = "pt" | "en";

type ContentCopy = {
  body: string[];
};

type ContentAction = {
  label: string;
  href: string;
};

export type ContentPanel = {
  id: "sobre" | "contato";
  left: string;
  top: string;
  width: string;
  copy: Record<Language, ContentCopy>;
  actions: ContentAction[];
};

export default function PlacaConteudo({ panel }: { panel: ContentPanel }) {
  const { language } = useLanguage();
  const copy = panel.copy[language];
  const position = contentSignStyle({
    left: panel.left,
    top: panel.top,
    width: panel.width,
  }) as CSSProperties;

  return (
    <article
      className={`placa-conteudo placa-conteudo--${panel.id}`}
      style={position}
      tabIndex={0}
      aria-label={panel.id === "sobre" ? (language === "pt" ? "Sobre mim" : "About me") : undefined}
    >
      <Image
        className="placa-conteudo-arte"
        src={CONTENT_SIGN_IMAGE.src}
        alt=""
        fill
        sizes="(max-width: 640px) 54vw, 36vw"
        quality={95}
      />
      <div className="placa-conteudo-corpo">
        {copy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {panel.actions.length > 0 && (
          <div className="placa-conteudo-acoes" aria-label={language === "pt" ? "Formas de contato" : "Contact options"}>
            {panel.actions.map((action) => {
              const external = action.href.startsWith("http");
              return (
                <a
                  key={action.href}
                  href={action.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  {action.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
