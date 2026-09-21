import Image from "next/image";
import MascotScrollGuide from "../components/MascotScrollGuide";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

// A arte da montanha é o site inteiro. Por enquanto só ela e o mascote: o
// conteúdo entra depois, encaixado nos vãos e nas placas.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
        <MascotScrollGuide />

        <div className="mapa">
          <Image className="mapa-arte" src="/montanha-v4.png" alt="" fill sizes="100vw" priority />
          <span className="mapa-pico" data-mascot-start aria-hidden="true" />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
