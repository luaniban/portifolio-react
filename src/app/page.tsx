import Image from "next/image";
import Carregamento from "../components/Carregamento";
import Header from "../components/Header";
import HeroTitle from "../components/HeroTitle";
import MascotScrollGuide from "../components/MascotScrollGuide";
import MountainArt from "../components/MountainArt";
import Neblina from "../components/Neblina";
import Nicho from "../components/Nicho";
import Placa, { type PlacaTrajetoria } from "../components/Placa";
import PlacaConteudo, { type ContentPanel } from "../components/PlacaConteudo";
import PlacaSecao from "../components/PlacaSecao";
import PhpEvolution from "../components/PhpEvolution";
import SiteFooter from "../components/SiteFooter";
import { projects } from "../lib/projects.mjs";
import {
  codeEvolutionPlacements,
  codeEvolutionTrack,
  projectPlacements,
  contentPanels,
  sectionAnchors,
  sectionPlaques,
  trajectoryPlacements,
  trajectoryStyle,
} from "../lib/mountain-layout.mjs";

// As placas da trajetória, em ordem cronológica. O texto está desenhado na
// arte de cada placa (public/trajetoria, preparadas por scripts/gerar-placas.py);
// aqui ele vai inteiro para o alt. Os cortes foram medidos por pixel nas
// emendas das tábuas; se a arte de uma placa mudar, é aqui que se ajusta.
const trajetoria: PlacaTrajetoria[] = [
  {
    imagem: "placa-tec-informatica-1",
    texto:
      "Fev 2021 a Dez 2023. Técnico em Informática integrado ao Ensino Médio, Instituto Federal de São Paulo (IFSP). Base sólida em lógica, programação e infraestrutura, onde nasceu o gosto por transformar ideias em software.",
    cortes: [8.8, 24.15, 47.15, 60.79, 78.2],
  },
  {
    imagem: "placa-tecnologoads-2",
    texto:
      "Fev 2024 até hoje. Tecnólogo em Análise e Desenvolvimento de Sistemas, Instituto Federal de São Paulo (IFSP). Graduação em andamento com foco em engenharia de software, banco de dados e desenvolvimento de aplicações.",
    cortes: [2.94, 16.43, 38.89, 51.33, 74.46],
  },
  {
    imagem: "placa-estagiario-3",
    texto:
      "Out 2024 até hoje. Estagiário em Desenvolvimento Full Stack PHP, Secretaria de Educação, Prefeitura de Caraguatatuba. Desenvolvo e mantenho aplicações web em PHP 7/8 e Laravel usadas pelas equipes da Secretaria: APIs RESTful, autenticação com Sanctum, MySQL com Eloquent, deploys e CI/CD.",
    cortes: [1.86, 18.1, 40.95, 59.34, 83.17],
  },
  {
    imagem: "placa-palestrante-4",
    texto:
      "2026. Palestrante e Instrutor de Tecnologia, IFSP Caraguatatuba, Extensão. Ministrei cursos certificados de HTML, Tailwind CSS, PHP, Laravel, MVC, desenvolvimento backend e APIs.",
    cortes: [0.1, 13.98, 39.19, 53.87, 76.27],
  },
];

// A arte da montanha é o site inteiro. Os conteúdos usam as coordenadas da
// versão estendida, centralizadas em mountain-layout.mjs.
export default function Home() {
  const [placaProjetos, placaSobre, placaTrajetoria, placaContato] = sectionPlaques;
  const [conteudoSobre, conteudoContato] = contentPanels as ContentPanel[];

  return (
    <>
      <Carregamento />
      <Header />

      <main id="inicio">
        <MascotScrollGuide />
        <Neblina />

        {/* A moldura e a cena seguem a proporção da arte inteira. Todos os
            componentes usam coordenadas em % dessa mesma imagem. */}
        <div className="mapa" data-mascot-base>
          <div className="mapa-cena">
            <MountainArt />
            {/* o sol e a lua, à esquerda do título: o CSS mostra o do tema e anima
                a troca. Vêm antes do título para passar por trás das nuvens dele. */}
            <span className="mapa-astro" aria-hidden="true">
              <Image className="mapa-astro-sol" src="/astro-sol.png" alt="" fill sizes="(max-width: 640px) 16vw, 12vw" />
              <Image className="mapa-astro-lua" src="/astro-lua.png" alt="" fill sizes="(max-width: 640px) 16vw, 12vw" />
            </span>
            <HeroTitle />
            <span className="mapa-pico" data-mascot-start aria-hidden="true" />
            <span className="mapa-chao" data-neblina-fim data-mascot-chao aria-hidden="true" />
            <section className="mapa-grupo" aria-labelledby={placaProjetos.id}>
              <PlacaSecao
                id={placaProjetos.id}
                label={placaProjetos.label}
                posicao={{ left: placaProjetos.left, top: placaProjetos.top, width: placaProjetos.width }}
              />
              {projects.map((projeto, indice) => (
                <Nicho key={projeto.titulo} projeto={projeto} posicao={projectPlacements[indice]} />
              ))}
            </section>
            <section className="mapa-grupo" aria-labelledby={placaSobre.id}>
              <PlacaSecao
                id={placaSobre.id}
                label={placaSobre.label}
                posicao={{ left: placaSobre.left, top: placaSobre.top, width: placaSobre.width }}
              />
              <PlacaConteudo panel={conteudoSobre} />
            </section>
            <section className="mapa-grupo" aria-labelledby={placaTrajetoria.id}>
              <PlacaSecao
                id={placaTrajetoria.id}
                label={placaTrajetoria.label}
                posicao={{ left: placaTrajetoria.left, top: placaTrajetoria.top, width: placaTrajetoria.width }}
              />
              <ol className="trajetoria" aria-labelledby={placaTrajetoria.id}>
                {trajetoria.map((placa, indice) => (
                  <Placa
                    key={placa.imagem}
                    placa={placa}
                    posicao={trajectoryStyle(trajectoryPlacements[indice])}
                    stage={indice}
                  />
                ))}
              </ol>
              <div className="codigo-trajetoria-track" style={codeEvolutionTrack}>
                <PhpEvolution />
              </div>
              <div className="codigo-trajetoria-mobile">
                {codeEvolutionPlacements.map((posicao, indice) => (
                  <div className="codigo-trajetoria-etapa" style={posicao} key={trajetoria[indice].imagem}>
                    <PhpEvolution stage={indice} compact />
                  </div>
                ))}
              </div>
            </section>
            <section className="mapa-grupo" aria-labelledby={placaContato.id}>
              <PlacaSecao
                id={placaContato.id}
                label={placaContato.label}
                posicao={{ left: placaContato.left, top: placaContato.top, width: placaContato.width }}
              />
              <PlacaConteudo panel={conteudoContato} />
            </section>
            {sectionAnchors.map(({ id, top }) => (
              <span key={id} id={id} className="mapa-ancora" style={{ top }} aria-hidden="true" />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
