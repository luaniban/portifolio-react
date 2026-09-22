import Image from "next/image";
import Header from "../components/Header";
import MascotScrollGuide from "../components/MascotScrollGuide";
import Neblina from "../components/Neblina";
import Nicho, { type Projeto } from "../components/Nicho";
import Placa, { type PlacaTrajetoria } from "../components/Placa";
import SiteFooter from "../components/SiteFooter";

// Destinos dos links do header, em % da altura da arte: logo acima de cada
// placa (medidas pela cor da madeira). Se a arte mudar, é aqui que se ajusta.
const ancoras = [
  { id: "projetos", top: "20.8%" },
  { id: "sobre", top: "45.4%" },
  { id: "trajetoria", top: "53%" },
  { id: "github", top: "70.2%" },
  { id: "contato", top: "80%" },
];

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

// As placas da trajetória, em ordem cronológica. O texto está desenhado na
// arte de cada placa (public/trajetoria, preparadas por scripts/gerar-placas.py);
// aqui ele vai inteiro para o alt. Os cortes foram medidos por pixel nas
// emendas das tábuas; se a arte de uma placa mudar, é aqui que se ajusta.
const trajetoria: PlacaTrajetoria[] = [
  {
    imagem: "placa-tec-informatica-1",
    texto:
      "Fev 2021 a Dez 2023. Técnico em Informática integrado ao Ensino Médio, Instituto Federal de São Paulo (IFSP). Base sólida em lógica, programação e infraestrutura, onde nasceu o gosto por transformar ideias em software.",
    cortes: [7.28, 19.97, 38.97, 50.28, 64.67],
  },
  {
    imagem: "placa-tecnologoads-2",
    texto:
      "Fev 2024 até hoje. Tecnólogo em Análise e Desenvolvimento de Sistemas, Instituto Federal de São Paulo (IFSP). Graduação em andamento com foco em engenharia de software, banco de dados e desenvolvimento de aplicações.",
    cortes: [2.43, 13.58, 32.17, 42.44, 61.6],
  },
  {
    imagem: "placa-estagiario-3",
    texto:
      "Out 2024 até hoje. Estagiário em Desenvolvimento Full Stack PHP, Secretaria de Educação, Prefeitura de Caraguatatuba. Desenvolvo e mantenho aplicações web em PHP 7/8 e Laravel usadas pelas equipes da Secretaria: APIs RESTful, autenticação com Sanctum, MySQL com Eloquent, deploys e CI/CD.",
    cortes: [1.54, 14.96, 33.87, 49.07, 68.8],
  },
  {
    imagem: "placa-palestrante-4",
    texto:
      "2026. Palestrante e Instrutor de Tecnologia, IFSP Caraguatatuba, Extensão. Ministrei cursos certificados de HTML, Tailwind CSS, PHP, Laravel, MVC, desenvolvimento backend e APIs.",
    cortes: [0.08, 11.56, 32.42, 44.54, 63.06],
  },
];

// Onde cada placa fica, em % da arte: duas fileiras à direita da placa
// "Trajetória", lidas da esquerda para a direita, entre o platô do "Sobre mim"
// e as placas de "Meus commits" e "GitHub". A altura sai do aspect-ratio.
const placas = [
  { left: "51%", top: "53.4%" },
  { left: "75%", top: "53.4%" },
  { left: "51%", top: "62.4%" },
  { left: "75%", top: "62.4%" },
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

        {/* A moldura (.mapa) mostra a arte só até a metade do campo de grama;
            a cena por dentro segue do tamanho da arte inteira, e todas as
            posições em % continuam valendo. */}
        <div className="mapa" data-mascot-base>
          <div className="mapa-cena">
            <Image className="mapa-arte" src="/montanha-v6.png" alt="" fill sizes="100vw" priority />
            <h1 className="mapa-titulo">
              <Image
                src="/titulo-luan-ibanhez.png"
                alt="Olá, eu sou o Luan Ibanhez, Desenvolvedor Full Stack"
                fill
                sizes="(max-width: 640px) 66vw, 54vw"
                priority
              />
            </h1>
            <span className="mapa-pico" data-mascot-start aria-hidden="true" />
            <span className="mapa-chao" data-neblina-fim data-mascot-chao aria-hidden="true" />
            {projetos.map((projeto, indice) => (
              <Nicho key={projeto.titulo} projeto={projeto} posicao={telas[indice]} />
            ))}
            <ol className="trajetoria" aria-label="Trajetória">
              {trajetoria.map((placa, indice) => (
                <Placa key={placa.imagem} placa={placa} posicao={placas[indice]} />
              ))}
            </ol>
            {ancoras.map(({ id, top }) => (
              <span key={id} id={id} className="mapa-ancora" style={{ top }} aria-hidden="true" />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
