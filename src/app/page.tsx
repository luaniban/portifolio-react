import Image from "next/image";
import Header from "../components/Header";
import MascotScrollGuide from "../components/MascotScrollGuide";
import Neblina from "../components/Neblina";
import Nicho, { type Projeto } from "../components/Nicho";
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
          {projetos.map((projeto, indice) => (
            <Nicho key={projeto.titulo} projeto={projeto} posicao={telas[indice]} />
          ))}
          {ancoras.map(({ id, top }) => (
            <span key={id} id={id} className="mapa-ancora" style={{ top }} aria-hidden="true" />
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
