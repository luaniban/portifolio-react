"use client";

import Image from "next/image";
import { useState } from "react";
import { MOUNTAIN_IMAGE } from "../lib/mountain-layout.mjs";

const responsiveSizes = "(max-width: 640px) 150vw, 100vw";

export default function MountainArt() {
  const [dayReady, setDayReady] = useState(false);

  async function revealDay(image: HTMLImageElement) {
    try {
      await image.decode();
    } catch {
      // A imagem já pode estar decodificada quando o onLoad dispara.
    }
    setDayReady(true);
  }

  return (
    <>
      <Image
        className="mapa-arte mapa-arte-noite"
        src={MOUNTAIN_IMAGE.src}
        alt=""
        fill
        sizes={responsiveSizes}
        quality={95}
        priority
      />
      <Image
        className={`mapa-arte mapa-arte-dia${dayReady ? " is-ready" : ""}`}
        src={MOUNTAIN_IMAGE.daySrc}
        alt=""
        fill
        sizes={responsiveSizes}
        quality={95}
        loading="eager"
        fetchPriority="low"
        onLoad={(event) => void revealDay(event.currentTarget)}
      />
    </>
  );
}
