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

const trajetoria = [
  { periodo: "2021–2023", titulo: "Técnico em Informática", lugar: "IFSP" },
  { periodo: "2024–hoje", titulo: "Tecnólogo em ADS", lugar: "IFSP" },
  { periodo: "2024–hoje", titulo: "Estagiário Full Stack PHP", lugar: "Prefeitura de Caraguá" },
  { periodo: "2026", titulo: "Palestrante e instrutor", lugar: "IFSP Caraguatatuba" },
];

const contatos = [
  { rotulo: "E-mail", valor: "luanibanhez.dev@gmail.com", url: "mailto:luanibanhez.dev@gmail.com" },
  { rotulo: "LinkedIn", valor: "linkedin.com/in/luanibanhez", url: "https://linkedin.com/in/luanibanhez" },
  { rotulo: "GitHub", valor: "github.com/luaniban", url: "https://github.com/luaniban" },
];

// Encaixes da arte, em % da própria imagem: os oito nichos escavados na rocha
// e as placas de madeira. Se a arte mudar, é aqui que se ajusta.
const nichos = [
  { left: "31.7%", top: "15%", width: "22.9%", height: "4.1%" },
  { left: "61.8%", top: "15%", width: "22.5%", height: "4.1%" },
  { left: "31.2%", top: "21.4%", width: "23.4%", height: "4.3%" },
  { left: "61.8%", top: "21.4%", width: "24.1%", height: "4.3%" },
  { left: "31.2%", top: "27.8%", width: "23.3%", height: "4.1%" },
  { left: "62%", top: "27.8%", width: "24.3%", height: "4.1%" },
  { left: "31.2%", top: "34.2%", width: "23.3%", height: "4.1%" },
  { left: "62%", top: "34.2%", width: "24.1%", height: "4.1%" },
];

const placas = {
  sobre: { left: "44.5%", top: "40.8%", width: "38%", height: "3.6%" },
  trajetoria: { left: "33.2%", top: "56.9%", width: "21.2%", height: "2.2%" },
  commits: { left: "26.5%", top: "75.2%", width: "29%", height: "2.4%" },
  github: { left: "62.5%", top: "75.4%", width: "22.5%", height: "1.8%" },
  contato: { left: "30%", top: "85.3%", width: "38%", height: "2.4%" },
};

function Nicho({ projeto, posicao }: { projeto: Projeto; posicao: React.CSSProperties }) {
  const conteudo = (
    <>
      <Image
        className="nicho-tela"
        src={projeto.image}
        alt={`Tela do sistema ${projeto.title}`}
        width={1440}
        height={900}
        sizes="420px"
      />
      <span className="nicho-nome">{projeto.title}</span>
    </>
  );

  return (
    <article className="nicho" style={posicao}>
      {projeto.url ? (
        <a className="nicho-alvo" href={projeto.url} target="_blank" rel="noreferrer">
          {conteudo}
        </a>
      ) : (
        <div className="nicho-alvo">{conteudo}</div>
      )}

      <div className="nicho-painel">
        <h3>{projeto.title}</h3>
        <p className="nicho-linha">{projeto.highlight}</p>
        <p>{projeto.description}</p>
        <p className="nicho-tags">{projeto.tags.join(" · ")}</p>
      </div>
    </article>
  );
}

// A arte é o site inteiro: cada seção fica sobre o trecho dela que lhe cabe.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
        <MascotScrollGuide />

        <div className="mapa">
          <Image className="mapa-arte" src="/montanha-site.png" alt="" fill sizes="100vw" priority />
          <span className="mapa-pico" data-mascot-start aria-hidden="true" />

          {/* projetos: os oito nichos escavados na rocha */}
          <section className="mapa-secao section-1" id="section-1" aria-label="Projetos">
            {projetos.map((projeto, indice) => (
              <Nicho key={projeto.title} projeto={projeto} posicao={nichos[indice]} />
            ))}
          </section>

          {/* sobre mim: a placa grande ao lado do letreiro */}
          <section className="mapa-secao section-2" id="section-2" aria-label="Sobre mim">
            <div className="placa" style={placas.sobre}>
              <p className="placa-destaque">Desenvolvedor Full Stack</p>
              <p>
                Projeto, desenvolvo e publico aplicações web completas: interface, regras de negócio,
                banco de dados e deploy.
              </p>
              <p className="placa-nota">
                Estagiário na Secretaria de Educação de Caraguatatuba · Tecnólogo em ADS no IFSP
              </p>
            </div>
          </section>

          {/* trajetória */}
          <section className="mapa-secao section-3" id="section-3" aria-label="Trajetória">
            <ol className="placa placa-lista" style={placas.trajetoria}>
              {trajetoria.map((item) => (
                <li key={item.titulo}>
                  <span className="placa-rotulo">{item.periodo}</span>
                  {item.titulo} · {item.lugar}
                </li>
              ))}
            </ol>
          </section>

          {/* commits e GitHub */}
          <section className="mapa-secao section-4" id="section-4" aria-label="GitHub">
            <div className="placa" style={placas.commits}>
              <Image
                className="placa-grafico"
                src="/github/contributions.png"
                alt="Gráfico de contribuições do GitHub de Luan Ibanhez"
                width={880}
                height={180}
              />
            </div>

            <div className="placa placa-centro" style={placas.github}>
              <a href="https://github.com/luaniban" target="_blank" rel="noreferrer">
                github.com/luaniban
              </a>
            </div>
          </section>

          {/* contato */}
          <section className="mapa-secao section-5" id="section-5" aria-label="Contato">
            <ul className="placa placa-contato" style={placas.contato}>
              {contatos.map((contato) => (
                <li key={contato.rotulo}>
                  <span className="placa-rotulo">{contato.rotulo}</span>
                  <a href={contato.url} target="_blank" rel="noreferrer">
                    {contato.valor}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* telas estreitas: a arte não comporta os encaixes, então o mesmo
            conteúdo aparece em lista */}
        <div className="container mapa-lista">
          <h2 className="bloco-titulo">Projetos</h2>
          <ol className="lista-projetos">
            {projetos.map((projeto) => (
              <li className="item-projeto" key={projeto.title}>
                <Image
                  className="item-projeto-imagem"
                  src={projeto.image}
                  alt={`Tela do sistema ${projeto.title}`}
                  width={1440}
                  height={900}
                  sizes="100vw"
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
            ))}
          </ol>

          <h2 className="bloco-titulo">Trajetória</h2>
          <ol className="lista-simples">
            {trajetoria.map((item) => (
              <li key={item.titulo}>
                <span className="placa-rotulo">{item.periodo}</span>
                {item.titulo} · {item.lugar}
              </li>
            ))}
          </ol>

          <h2 className="bloco-titulo">Contato</h2>
          <ul className="lista-simples">
            {contatos.map((contato) => (
              <li key={contato.rotulo}>
                <span className="placa-rotulo">{contato.rotulo}</span>
                <a href={contato.url} target="_blank" rel="noreferrer">
                  {contato.valor}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
