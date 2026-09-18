import Image from "next/image";
import MascotScrollGuide from "../components/MascotScrollGuide";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

// Modelo em branco. A única coisa viva na página é o mascote caindo, que
// segue a linha do trajeto desenhada sobre o <main> inteiro. Cada seção
// abaixo está vazia e separada, pronta para receber o conteúdo novo; a
// altura mínima delas está no CSS (.section) só para dar curso à queda.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
        <MascotScrollGuide />

        {/* Seção 1: a montanha de onde o mascote cai. O ponto marcado com
            data-mascot-start é o pico, onde a linha do trajeto começa. */}
        <section className="section section-mountain" id="secao-1">
          <div className="container" />

          <div className="mountain" aria-hidden="true">
            <Image src="/montanha.png" alt="" fill priority sizes="100vw" />
            <span className="mountain-peak" data-mascot-start />
          </div>
        </section>

        <section className="section" id="secao-2">
          <div className="container" />
        </section>

        <section className="section" id="secao-3">
          <div className="container" />
        </section>

        <section className="section" id="secao-4">
          <div className="container" />
        </section>

        <section className="section" id="secao-5">
          <div className="container" />
        </section>

        <section className="section" id="secao-6">
          <div className="container" />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
