"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { SECTION_SIGN_IMAGE, sectionSignStyle } from "../lib/mountain-layout.mjs";
import { useLanguage } from "./LanguageProvider";

type SectionLabel = {
  pt: string;
  en: string;
};

export default function PlacaSecao({
  id,
  label,
  posicao,
}: {
  id: string;
  label: SectionLabel;
  posicao: CSSProperties;
}) {
  const { language } = useLanguage();
  const titulo = label[language];

  return (
    <h2 id={id} className={`placa-secao placa-secao--${id}`} style={sectionSignStyle(posicao)}>
      <Image
        className="placa-secao-arte"
        src={SECTION_SIGN_IMAGE.src}
        alt=""
        fill
        sizes="(max-width: 640px) 33vw, 22vw"
        quality={95}
      />
      <span>{titulo}</span>
    </h2>
  );
}
