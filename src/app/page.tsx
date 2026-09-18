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

        <section className="section" id="secao-1">
          <div className="container" />
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
