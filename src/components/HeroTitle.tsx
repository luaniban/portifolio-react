"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function HeroTitle() {
  const { language } = useLanguage();
  return (
    <h1 className="mapa-titulo">
      <Image
        src={language === "en" ? "/titulo-luan-ibanhez-en.png" : "/titulo-luan-ibanhez.png"}
        alt={language === "en" ? "Hi, I'm Luan Ibanhez, Full Stack Developer. Turning ideas into real applications." : "Olá, eu sou o Luan Ibanhez, Desenvolvedor Full Stack"}
        fill
        sizes="(max-width: 640px) 86vw, 54vw"
        priority
      />
    </h1>
  );
}
