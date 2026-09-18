import Image from "next/image";
import MascotScrollGuide from "../components/MascotScrollGuide";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

type Projeto = {
  number: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  tags: string[];
  highlight: string;
};

const projetos: Projeto[] = [
  {
    number: "01",
    title: "AvaRede — Questionários da Rede",
    description:
      "Sistema da Prefeitura de Caraguatatuba para as avaliações da rede municipal. As escolas lançam as respostas lendo a folha por foto, PDF ou câmera do celular (QR Code), as notas são calculadas automaticamente e os resultados viram gráficos por aluno, turma, escola e habilidade, com comparativo entre períodos e escolas.",
    image: "/projects/questionarios-rede.png",
    url: "https://questionarios-rede.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "TallStackUI", "MySQL", "DomPDF", "MapLibre"],
    highlight: "Correção de gabaritos por arquivo ou câmera",
  },
  {
    number: "02",
    title: "LivroDigital",
    description:
      "Sistema da Prefeitura de Caraguatatuba para livros informativos sobre a cidade. O administrador envia o PDF, o sistema converte cada página em imagem e monta um flipbook com animação de folhear e zoom. A biblioteca é pública, com busca, filtros e download.",
    image: "/projects/livro-digital.png",
    url: "https://livrodigital.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Alpine.js", "Turn.js", "MySQL"],
    highlight: "Conversão de PDF em flipbook",
  },
  {
    number: "03",
    title: "HelpEduc — Chamados de TI",
    description:
      "Sistema interno de chamados: as escolas abrem ocorrências com categoria, urgência e descrição, e a equipe de TI acompanha e responde. Um chatbot guia a abertura do chamado e permite pedir um atendente, e o painel mostra chamados por status, período e categoria.",
    image: "/projects/helpeduc.png",
    url: "https://chamados.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Reverb", "TallStackUI", "MySQL"],
    highlight: "Chatbot, dashboard e notificações em tempo real",
  },
  {
    number: "04",
    title: "Quizzard",
    description:
      "Plataforma SaaS de perguntas e respostas gamificada para crianças de 6 a 10 anos. O professor cria questões e playlists, conduz aulas ao vivo e acompanha a turma, e um serviço de machine learning adapta a dificuldade ao nível de cada aluno. Multi-tenant, com planos gratuito e pago.",
    image: "/projects/quizzard-professor.png",
    url: "https://github.com/Zakly-Educacao/Quizzard-frontend",
    tags: ["Next.js", "Laravel", "Reverb", "FastAPI", "Redis", "Docker"],
    highlight: "Dificuldade adaptativa com ML",
  },
  {
    number: "05",
    title: "Paideia",
    description:
      "Sistema de gamificação na educação criado em equipe no hackathon de 30 horas de Caraguatatuba. Alunos respondem questões da BNCC e ganham XP, pontos e conquistas, evoluem personagens, cumprem missões e desafiam colegas ao vivo; professores e gestores acompanham o desempenho por turma, questão e disciplina.",
    image: "/projects/paideia.png",
    url: "https://bugnoanzol.hyanferreira.com.br/",
    tags: ["Laravel", "Sanctum", "Reverb", "Next.js", "MySQL"],
    highlight: "Criado em hackathon de 30 horas",
  },
  {
    number: "06",
    title: "PDGE",
    description:
      "Sistema da Prefeitura de Caraguatatuba para o cadastro dos professores. O professor informa dados pessoais, funcionais, formação, cursos, congressos e comissões, e o sistema calcula a ficha de pontuação usada nas classificações de atribuição de aulas e remoção.",
    image: "/projects/pdge.png",
    tags: ["Laravel", "Livewire", "Chart.js", "MySQL", "Laravel Excel"],
    highlight: "Cálculo automático da pontuação dos professores",
  },
  {
    number: "07",
    title: "Autoavaliação",
    description:
      "Questionário autoavaliativo da Prefeitura de Caraguatatuba, respondido online ou em folha com QR Code. As respostas viram indicadores como nível socioeconômico (NSE), apoio familiar, acesso digital e condições de estudo, comparando o mesmo aluno em dois anos diferentes.",
    image: "/projects/autoavaliacao.png",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "DomPDF"],
    highlight: "Evolução do mesmo aluno entre dois anos",
  },
  {
    number: "08",
    title: "SIGTU",
    description:
      "Sistema de Gestão de Transporte Universitário, refeito pelo meu time na disciplina de Engenharia de Software do IFSP a pedido da Secretaria de Educação, substituindo o UNIBUS. Estudantes fazem inscrição e recadastro; a Secretaria gerencia solicitações, lista de espera, instituições, cursos e a ocupação das linhas.",
    image: "/projects/sigtu.png",
    tags: ["Laravel", "Sanctum", "Next.js", "MySQL", "PHPUnit"],
    highlight: "API REST com RBAC e testes de mutação",
  },
];

// Recortes das quatro cavernas na arte, em % da própria imagem.
const cavernas = [
  { left: "28.6%", top: "25.8%", width: "17.8%", height: "13%" },
  { left: "63.6%", top: "26.8%", width: "17.8%", height: "12.5%" },
  { left: "20.7%", top: "57.2%", width: "18.7%", height: "12.2%" },
  { left: "69.7%", top: "58.2%", width: "18.2%", height: "12.2%" },
];


function ItemProjeto({ projeto }: { projeto: Projeto }) {
  return (
    <li className="item-projeto">
      <Image
        className="item-projeto-imagem"
        src={projeto.image}
        alt={`Tela do sistema ${projeto.title}`}
        width={1440}
        height={900}
        sizes="(max-width: 860px) 100vw, 520px"
      />

      <div>
        <h3>
          {projeto.number} — {projeto.title}
        </h3>
        <p className="item-projeto-linha">{projeto.highlight}</p>
        <p>{projeto.description}</p>
        <p className="item-projeto-tags">{projeto.tags.join(" · ")}</p>
        {projeto.url && (
          <a href={projeto.url} target="_blank" rel="noreferrer">
            {projeto.url.replace("https://", "").replace(/\/$/, "")}
          </a>
        )}
      </div>
    </li>
  );
}

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

        {/* Seção 2: a montanha com as quatro cavernas. Cada caverna guarda
            um projeto; ao passar o mouse, a descrição abre por cima da arte. */}
        <section className="section section-sky section-cavernas" id="secao-2">
          <div className="cavernas">
            <Image src="/montanha-cavernas.png" alt="" fill sizes="100vw" priority />

            {projetos.slice(0, 4).map((projeto, indice) => (
              <article className="caverna" key={projeto.title} style={cavernas[indice]}>
                <a className="caverna-alvo" href={projeto.url} target="_blank" rel="noreferrer">
                  <Image
                    className="caverna-tela"
                    src={projeto.image}
                    alt={`Tela do sistema ${projeto.title}`}
                    width={1440}
                    height={900}
                    sizes="320px"
                  />
                  <span className="caverna-nome">{projeto.title}</span>
                </a>

                <div className="caverna-painel">
                  <h3>{projeto.title}</h3>
                  <p className="caverna-linha">{projeto.highlight}</p>
                  <p>{projeto.description}</p>
                  <p className="caverna-tags">{projeto.tags.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>

          {/* telas estreitas: a arte não comporta as cavernas, então os mesmos
              projetos aparecem em lista */}
          <div className="container cavernas-lista">
            <h2 className="bloco-titulo">Projetos</h2>
            <ol className="lista-projetos">
              {projetos.slice(0, 4).map((projeto) => (
                <ItemProjeto key={projeto.title} projeto={projeto} />
              ))}
            </ol>
          </div>
        </section>

        {/* Seção 3: os outros quatro projetos, ainda na versão simples, à
            espera da próxima parte da montanha. */}
        <section className="section section-sky" id="secao-3">
          <div className="container">
            <h2 className="bloco-titulo">Projetos (continuação)</h2>
            <ol className="lista-projetos">
              {projetos.slice(4).map((projeto) => (
                <ItemProjeto key={projeto.title} projeto={projeto} />
              ))}
            </ol>
          </div>
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
