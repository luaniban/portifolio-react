import Image from "next/image";
import Header from "../components/Header";
import MascotScrollGuide from "../components/MascotScrollGuide";
import MountainArt from "../components/MountainArt";
import Neblina from "../components/Neblina";
import Nicho, { type Projeto } from "../components/Nicho";
import Placa, { type PlacaTrajetoria } from "../components/Placa";
import PlacaConteudo, { type ContentPanel } from "../components/PlacaConteudo";
import PlacaSecao from "../components/PlacaSecao";
import PhpEvolution from "../components/PhpEvolution";
import SiteFooter from "../components/SiteFooter";
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

// Os oito projetos, um por nicho, na ordem das fileiras (esquerda, direita).
const projetos: Projeto[] = [
  {
    titulo: "AvaRede — Questionários da Rede",
    destaque: "Correção de gabaritos por arquivo ou câmera",
    descricao:
      "Sistema da Prefeitura de Caraguatatuba para as avaliações da rede municipal. As escolas lançam as respostas lendo a folha por foto, PDF ou câmera do celular (QR Code), as notas são calculadas automaticamente e os resultados viram gráficos por aluno, turma, escola e habilidade, com comparativo entre períodos e escolas.",
    tags: ["Laravel", "Livewire", "TallStackUI", "MySQL", "DomPDF", "MapLibre"],
    miniatura: "questionarios-rede",
    url: "https://questionarios-rede.luanibanhez.tech/",
  },
  {
    titulo: "LivroDigital",
    destaque: "Conversão de PDF em flipbook",
    descricao:
      "Sistema da Prefeitura de Caraguatatuba para livros informativos sobre a cidade. O administrador envia o PDF, o sistema converte cada página em imagem e monta um flipbook com animação de folhear e zoom. A biblioteca é pública, com busca, filtros e download.",
    tags: ["Laravel", "Livewire", "Alpine.js", "Turn.js", "MySQL"],
    miniatura: "livro-digital",
    url: "https://livrodigital.luanibanhez.tech/",
  },
  {
    titulo: "HelpEduc — Chamados de TI",
    destaque: "Chatbot, dashboard e notificações em tempo real",
    descricao:
      "Sistema interno de chamados: as escolas abrem ocorrências com categoria, urgência e descrição, e a equipe de TI acompanha e responde. Um chatbot guia a abertura do chamado e permite pedir um atendente, e o painel mostra chamados por status, período e categoria.",
    tags: ["Laravel", "Livewire", "Reverb", "TallStackUI", "MySQL"],
    miniatura: "helpeduc",
    url: "https://chamados.luanibanhez.tech/",
  },
  {
    titulo: "Quizzard",
    destaque: "Dificuldade adaptativa com ML",
    descricao:
      "Plataforma SaaS de perguntas e respostas gamificada para crianças de 6 a 10 anos. O professor cria questões e playlists, conduz aulas ao vivo e acompanha a turma, e um serviço de machine learning adapta a dificuldade ao nível de cada aluno. Multi-tenant, com planos gratuito e pago.",
    tags: ["Next.js", "Laravel", "Reverb", "FastAPI", "Redis", "Docker"],
    miniatura: "quizzard-professor",
    url: "https://github.com/Zakly-Educacao/Quizzard-frontend",
  },
  {
    titulo: "Paideia",
    destaque: "Criado em hackathon de 30 horas",
    descricao:
      "Sistema de gamificação na educação criado em equipe no hackathon de 30 horas de Caraguatatuba. Alunos respondem questões da BNCC e ganham XP, pontos e conquistas, evoluem personagens, cumprem missões e desafiam colegas ao vivo; professores e gestores acompanham o desempenho por turma, questão e disciplina.",
    tags: ["Laravel", "Sanctum", "Reverb", "Next.js", "MySQL"],
    miniatura: "paideia",
    url: "https://bugnoanzol.hyanferreira.com.br/",
  },
  {
    titulo: "PDGE",
    destaque: "Cálculo automático da pontuação dos professores",
    descricao:
      "Sistema da Prefeitura de Caraguatatuba para o cadastro dos professores. O professor informa dados pessoais, funcionais, formação, cursos, congressos e comissões, e o sistema calcula a ficha de pontuação usada nas classificações de atribuição de aulas e remoção.",
    tags: ["Laravel", "Livewire", "Chart.js", "MySQL", "Laravel Excel"],
    miniatura: "pdge",
  },
  {
    titulo: "Autoavaliação",
    destaque: "Evolução do mesmo aluno entre dois anos",
    descricao:
      "Questionário autoavaliativo da Prefeitura de Caraguatatuba, respondido online ou em folha com QR Code. As respostas viram indicadores como nível socioeconômico (NSE), apoio familiar, acesso digital e condições de estudo, comparando o mesmo aluno em dois anos diferentes.",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "DomPDF"],
    miniatura: "autoavaliacao",
  },
  {
    titulo: "SIGTU",
    destaque: "API REST com RBAC e testes de mutação",
    descricao:
      "Sistema de Gestão de Transporte Universitário, refeito pelo meu time na disciplina de Engenharia de Software do IFSP a pedido da Secretaria de Educação, substituindo o UNIBUS. Estudantes fazem inscrição e recadastro; a Secretaria gerencia solicitações, lista de espera, instituições, cursos e a ocupação das linhas.",
    tags: ["Laravel", "Sanctum", "Next.js", "MySQL", "PHPUnit"],
    miniatura: "sigtu",
  },
];

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
            <h1 className="mapa-titulo">
              <Image
                src="/titulo-luan-ibanhez.png"
                alt="Olá, eu sou o Luan Ibanhez, Desenvolvedor Full Stack"
                fill
                sizes="(max-width: 640px) 86vw, 54vw"
                priority
              />
            </h1>
            <span className="mapa-pico" data-mascot-start aria-hidden="true" />
            <span className="mapa-chao" data-neblina-fim data-mascot-chao aria-hidden="true" />
            <section className="mapa-grupo" aria-labelledby={placaProjetos.id}>
              <PlacaSecao
                id={placaProjetos.id}
                label={placaProjetos.label}
                posicao={{ left: placaProjetos.left, top: placaProjetos.top, width: placaProjetos.width }}
              />
              {projetos.map((projeto, indice) => (
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
              <ol className="trajetoria" aria-label="Trajetória">
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
