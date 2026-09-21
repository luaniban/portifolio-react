import Image from "next/image";
import MascotScrollGuide from "../components/MascotScrollGuide";
import Neblina from "../components/Neblina";
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
        <Neblina />

        <div className="mapa">
          <Image className="mapa-arte" src="/montanha-v6.png" alt="" fill sizes="100vw" priority />
          <span className="mapa-pico" data-mascot-start aria-hidden="true" />
          <span className="mapa-chao" data-neblina-fim aria-hidden="true" />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
