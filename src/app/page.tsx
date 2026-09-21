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

// Os oito projetos, um por nicho, na ordem das fileiras (esquerda, direita).
const projetos = [
  { titulo: "AvaRede — Questionários da Rede", imagem: "/projects/questionarios-rede.png", url: "https://questionarios-rede.luanibanhez.tech/" },
  { titulo: "LivroDigital", imagem: "/projects/livro-digital.png", url: "https://livrodigital.luanibanhez.tech/" },
  { titulo: "HelpEduc — Chamados de TI", imagem: "/projects/helpeduc.png", url: "https://chamados.luanibanhez.tech/" },
  { titulo: "Quizzard", imagem: "/projects/quizzard-professor.png", url: "https://github.com/Zakly-Educacao/Quizzard-frontend" },
  { titulo: "Paideia", imagem: "/projects/paideia.png", url: "https://bugnoanzol.hyanferreira.com.br/" },
  { titulo: "PDGE", imagem: "/projects/pdge.png" },
  { titulo: "Autoavaliação", imagem: "/projects/autoavaliacao.png" },
  { titulo: "SIGTU", imagem: "/projects/sigtu.png" },
];

// Onde cada tela fica dentro do seu nicho, em % da arte. Medido por pixel:
// a abertura escura menos uma folga nas laterais e no topo, e a base termina
// 12 px (de arte) acima das pedrinhas dos cantos, para elas ficarem à mostra.
const telas = [
  { left: "28.81%", top: "25.72%", width: "19.43%", height: "2.99%" },
  { left: "55.91%", top: "25.72%", width: "19.73%", height: "3.01%" },
  { left: "28.61%", top: "30.75%", width: "19.63%", height: "3.09%" },
  { left: "56.15%", top: "30.75%", width: "19.97%", height: "3.09%" },
  { left: "28.61%", top: "35.94%", width: "19.68%", height: "2.99%" },
  { left: "56.15%", top: "35.92%", width: "20.26%", height: "3.03%" },
  { left: "28.71%", top: "41.05%", width: "19.63%", height: "3.19%" },
  { left: "56.15%", top: "41.05%", width: "20.65%", height: "3.21%" },
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
          <h1 className="mapa-titulo">
            <Image
              src="/titulo-luan-ibanhez.png"
              alt="Olá, eu sou o Luan Ibanhez, Desenvolvedor Full Stack"
              fill
              sizes="48vw"
              priority
            />
          </h1>
          <span className="mapa-pico" data-mascot-start aria-hidden="true" />
          <span className="mapa-chao" data-neblina-fim aria-hidden="true" />
          {projetos.map(({ titulo, imagem, url }, indice) => {
            const tela = (
              <Image src={imagem} alt={`Tela do sistema ${titulo}`} fill sizes="21vw" />
            );
            return url ? (
              <a key={titulo} className="nicho-tela" style={telas[indice]} href={url} target="_blank" rel="noreferrer">
                {tela}
              </a>
            ) : (
              <div key={titulo} className="nicho-tela" style={telas[indice]}>
                {tela}
              </div>
            );
          })}
          {ancoras.map(({ id, top }) => (
            <span key={id} id={id} className="mapa-ancora" style={{ top }} aria-hidden="true" />
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
