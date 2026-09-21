import Image from "next/image";
import Header from "../components/Header";
import MascotScrollGuide from "../components/MascotScrollGuide";
import Neblina from "../components/Neblina";
import SiteFooter from "../components/SiteFooter";

// Destinos dos links do header, em % da altura da arte: logo acima de cada
// placa (medidas pela cor da madeira). Se a arte mudar, é aqui que se ajusta.
const ancoras = [
  { id: "projetos", top: "20.8%" },
  { id: "sobre", top: "45.4%" },
  { id: "trajetoria", top: "58.6%" },
  { id: "github", top: "70.2%" },
  { id: "contato", top: "80%" },
];

// A arte da montanha é o site inteiro. Por enquanto só ela e o mascote: o
// conteúdo entra depois, encaixado nos vãos e nas placas.
export default function Home() {
  return (
    <>
      <Header />

      <main id="inicio">
        <MascotScrollGuide />
        <Neblina />

        <div className="mapa">
          <Image className="mapa-arte" src="/montanha-v6.png" alt="" fill sizes="100vw" priority />
          <span className="mapa-pico" data-mascot-start aria-hidden="true" />
          <span className="mapa-chao" data-neblina-fim aria-hidden="true" />
          {ancoras.map(({ id, top }) => (
            <span key={id} id={id} className="mapa-ancora" style={{ top }} aria-hidden="true" />
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
