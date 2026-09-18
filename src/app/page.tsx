"use client";

import Image from "next/image";
import Header from "../components/Header";
import { useLanguage } from "../components/LanguageProvider";
import { getFeaturedPostPreviews } from "../components/LinkedinPosts";
import LinkedinPostsLink from "../components/LinkedinPostsLink";
import MascotScrollGuide from "../components/MascotScrollGuide";
import PhpEvolution from "../components/PhpEvolution";
import ProjectScrollTransition from "../components/ProjectScrollTransition";
import Reveal from "../components/Reveal";

type Project = {
  number: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  tags: string[];
  highlight: string;
};

const projectsPt: Project[] = [
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

const projectsEn: Project[] = [
  {
    number: "01",
    title: "AvaRede — Municipal Assessments",
    description:
      "A system for the City of Caraguatatuba’s school network assessments. Schools submit answers by reading the answer sheet from a photo, PDF, or phone camera (QR Code), grades are calculated automatically, and results become charts by student, class, school, and skill, with comparisons across terms and schools.",
    image: "/projects/questionarios-rede.png",
    url: "https://questionarios-rede.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "TallStackUI", "MySQL", "DomPDF", "MapLibre"],
    highlight: "Answer-sheet grading from file or camera",
  },
  {
    number: "02",
    title: "LivroDigital",
    description:
      "A system for the City of Caraguatatuba’s informational books about the city. The administrator uploads a PDF, the system turns each page into an image and builds a flipbook with page-turn animation and zoom. The library is public, with search, filters, and downloads.",
    image: "/projects/livro-digital.png",
    url: "https://livrodigital.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Alpine.js", "Turn.js", "MySQL"],
    highlight: "PDF-to-flipbook conversion",
  },
  {
    number: "03",
    title: "HelpEduc — IT Service Desk",
    description:
      "An internal ticketing system: schools open tickets with category, urgency, and description, and the IT team tracks and answers them. A chatbot guides users through opening a ticket and can hand them over to an agent, and the dashboard shows tickets by status, period, and category.",
    image: "/projects/helpeduc.png",
    url: "https://chamados.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Reverb", "TallStackUI", "MySQL"],
    highlight: "Chatbot, dashboard, and real-time notifications",
  },
  {
    number: "04",
    title: "Quizzard",
    description:
      "A gamified question-and-answer SaaS platform for children aged 6 to 10. Teachers create questions and playlists, run live classes, and follow their class, while a machine learning service adapts difficulty to each student’s level. Multi-tenant, with free and paid plans.",
    image: "/projects/quizzard-professor.png",
    url: "https://github.com/Zakly-Educacao/Quizzard-frontend",
    tags: ["Next.js", "Laravel", "Reverb", "FastAPI", "Redis", "Docker"],
    highlight: "ML-powered adaptive difficulty",
  },
  {
    number: "05",
    title: "Paideia",
    description:
      "A gamified education system built as a team at Caraguatatuba’s 30-hour hackathon. Students answer BNCC-based questions and earn XP, points, and achievements, level up characters, complete missions, and challenge classmates live; teachers and managers follow performance by class, question, and subject.",
    image: "/projects/paideia.png",
    url: "https://bugnoanzol.hyanferreira.com.br/",
    tags: ["Laravel", "Sanctum", "Reverb", "Next.js", "MySQL"],
    highlight: "Built at a 30-hour hackathon",
  },
  {
    number: "06",
    title: "PDGE",
    description:
      "A system for the City of Caraguatatuba’s teacher records. Teachers enter personal, employment, and education data, courses, conferences, and committees, and the system calculates the score sheet used in the rankings for class assignment and transfers.",
    image: "/projects/pdge.png",
    tags: ["Laravel", "Livewire", "Chart.js", "MySQL", "Laravel Excel"],
    highlight: "Automatic teacher scoring",
  },
  {
    number: "07",
    title: "Autoavaliação",
    description:
      "A self-assessment questionnaire for the City of Caraguatatuba, answered online or on a QR Code answer sheet. Answers become indicators such as socioeconomic level (NSE), family support, digital access, and study conditions, comparing the same student across two different years.",
    image: "/projects/autoavaliacao.png",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "DomPDF"],
    highlight: "Same-student comparison across two years",
  },
  {
    number: "08",
    title: "SIGTU",
    description:
      "A university transportation management system rebuilt by my team in IFSP’s Software Engineering course, at the Department of Education’s request, replacing UNIBUS. Students apply and re-register; the Department manages requests, the waiting list, institutions, courses, and bus line occupancy.",
    image: "/projects/sigtu.png",
    tags: ["Laravel", "Sanctum", "Next.js", "MySQL", "PHPUnit"],
    highlight: "REST API with RBAC and mutation testing",
  },
];

const timelinePt = [
  {
    period: "Fev 2021 a Dez 2023",
    title: "Técnico em Informática integrado ao Ensino Médio",
    place: "Instituto Federal de São Paulo (IFSP)",
    kind: "Formação",
    description:
      "Base sólida em lógica, programação e infraestrutura, onde nasceu o gosto por transformar ideias em software.",
  },
  {
    period: "Fev 2024 até hoje",
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    place: "Instituto Federal de São Paulo (IFSP)",
    kind: "Formação",
    description:
      "Graduação em andamento com foco em engenharia de software, banco de dados e desenvolvimento de aplicações.",
  },
  {
    period: "Out 2024 até hoje",
    title: "Estagiário em Desenvolvimento Full Stack PHP",
    place: "Secretaria de Educação, Prefeitura de Caraguatatuba",
    kind: "Experiência",
    description:
      "Desenvolvo, evoluo e mantenho aplicações web em PHP 7/8 e Laravel usadas pelas equipes da Secretaria: APIs RESTful, autenticação com Sanctum, modelagem MySQL com Eloquent e manutenção de sistemas em produção, com Git em fluxo colaborativo, deploys e CI/CD.",
  },
  {
    period: "2026",
    title: "Palestrante e Instrutor de Tecnologia",
    place: "IFSP Caraguatatuba, Extensão",
    kind: "Ensino",
    description:
      "Ministrei cursos de HTML, Tailwind CSS, PHP, Laravel, MVC, desenvolvimento backend e APIs. Todos tiveram certificação, fortalecendo minha comunicação e compartilhamento de conhecimento.",
  },
];

const timelineEn = [
  {
    period: "Feb 2021 to Dec 2023",
    title: "Technical Degree in Information Technology with High School",
    place: "Federal Institute of São Paulo (IFSP)",
    kind: "Education",
    description:
      "A solid foundation in logic, programming, and infrastructure, where my interest in turning ideas into software began.",
  },
  {
    period: "Feb 2024 to present",
    title: "Associate Degree in Systems Analysis and Development",
    place: "Federal Institute of São Paulo (IFSP)",
    kind: "Education",
    description:
      "Degree in progress focused on software engineering, databases, and application development.",
  },
  {
    period: "Oct 2024 to present",
    title: "PHP Full Stack Development Intern",
    place: "Caraguatatuba Department of Education",
    kind: "Experience",
    description:
      "I develop, improve, and maintain PHP 7/8 and Laravel web applications used by the Department’s teams: RESTful APIs, Sanctum authentication, MySQL modeling with Eloquent, and production system maintenance with Git, collaborative workflows, deployments, and CI/CD.",
  },
  {
    period: "2026",
    title: "Technology Speaker and Instructor",
    place: "IFSP Caraguatatuba, Extension Program",
    kind: "Teaching",
    description:
      "I taught courses on HTML, Tailwind CSS, PHP, Laravel, MVC, backend development, and APIs. Every course included a certificate, strengthening my communication and knowledge-sharing skills.",
  },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`icon ${className}`} viewBox="0 0 24 24" fill="none">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar" aria-hidden="true">
        <p className="browser-url">{url.replace("https://", "").replace(/\/$/, "")}</p>
      </div>
      {children}
    </div>
  );
}

function SectionHead({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
      {children && <div className="section-meta">{children}</div>}
    </div>
  );
}

function SectionMarker({ label }: { label: string }) {
  return (
    <p className="section-marker" aria-hidden="true">
      <span /> {label}
    </p>
  );
}

function CommitWalker({ className }: { className: string }) {
  return (
    <span className={`commit-walker ${className}`}>
      <span className="commit-walker-motion">
        <span className="commit-walker-body" />
        <span className="commit-walker-arm is-left" />
        <span className="commit-walker-arm is-right" />
        <span className="commit-walker-leg is-left" />
        <span className="commit-walker-leg is-right" />
      </span>
    </span>
  );
}

const stackGroups = [
  { pt: "Back-end", en: "Back-end", items: ["PHP", "Laravel", "Livewire", "MySQL"] },
  { pt: "Front-end", en: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { pt: "Infra e fluxo", en: "Infra & workflow", items: ["Git", "GitHub Actions", "Linux", "Docker"] },
];

export default function Home() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const projects = isEnglish ? projectsEn : projectsPt;
  const heroProjects = [projects[0], projects[1], projects[4]];
  const [featuredProject, ...otherProjects] = projects;
  const timeline = isEnglish ? timelineEn : timelinePt;
  const currentRole = timeline[2];
  const currentDegree = timeline[1];
  const postPreviews = getFeaturedPostPreviews(language);
  const copy = isEnglish
    ? {
        role: "Full Stack Developer",
        heroSub: "I design, build, and launch complete web applications: interface, business rules, database, and deployment.",
        factCurrent: "Currently",
        factEducation: "Education",
        factProduction: "In production",
        factProductionValue: "3+ products",
        factStack: "Main stack",
        viewProjects: "View projects",
        systemsPreview: "Preview of published systems",
        projects: "Projects",
        projectCount: `${projects.length} projects`,
        openProject: "Open",
        openProjectAria: "Open",
        technologies: "Technologies used",
        visitProject: "Visit project",
        skills: "Stack & tools",
        journey: "Journey",
        downloadResume: "Download résumé (PDF)",
        viewProfile: "View full profile",
        githubAria: "Open Luan Ibanhez’s GitHub profile",
        githubAlt: "GitHub contributions graph for Luan Ibanhez: 753 contributions in the last year",
        posts: "Posts",
        post: "Post",
        postsSummary: "10 posts about projects, Laravel, education, and the courses I teach.",
        allPosts: "View all posts",
        contact: "Contact",
        email: "Email",
        footer: "Designed & developed by Luan Ibanhez",
        top: "Back to top ↑",
      }
    : {
        role: "Desenvolvedor Full Stack",
        heroSub: "Projeto, desenvolvo e publico aplicações web completas: interface, regras de negócio, banco de dados e deploy.",
        factCurrent: "Atualmente",
        factEducation: "Formação",
        factProduction: "Em produção",
        factProductionValue: "3+ produtos",
        factStack: "Stack principal",
        viewProjects: "Ver projetos",
        systemsPreview: "Prévia dos sistemas publicados",
        projects: "Projetos",
        projectCount: `${projects.length} projetos`,
        openProject: "Abrir sistema",
        openProjectAria: "Abrir",
        technologies: "Tecnologias utilizadas",
        visitProject: "Visitar projeto",
        skills: "Stack & ferramentas",
        journey: "Trajetória",
        downloadResume: "Baixar currículo (PDF)",
        viewProfile: "Ver perfil completo",
        githubAria: "Abrir perfil do GitHub de Luan Ibanhez",
        githubAlt: "Gráfico de contribuições do GitHub de Luan Ibanhez: 753 contribuições no último ano",
        posts: "Posts",
        post: "Publicação",
        postsSummary: "10 publicações sobre projetos, Laravel, educação e os cursos que ministro.",
        allPosts: "Ver todos os posts",
        contact: "Contato",
        email: "E-mail",
        footer: "Projetado & desenvolvido por Luan Ibanhez",
        top: "Voltar ao topo ↑",
      };

  function renderProject(project: Project, featured: boolean) {
    const media = (
      <BrowserFrame url={project.url ?? project.title}>
        <div className="project-image">
          <Image
            src={project.image}
            alt={`Tela do sistema ${project.title}`}
            fill
            sizes={featured ? "(max-width: 980px) 100vw, 680px" : "(max-width: 980px) 100vw, 540px"}
          />
        </div>
      </BrowserFrame>
    );

    return (
      <Reveal
        key={project.title}
        as="article"
        className={`project${featured ? " project-featured" : ""}`}
      >
        {project.url ? (
          <a
            className={`project-media${featured ? " shared-project-target" : ""}`}
            data-shared-project-target={featured || undefined}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${copy.openProjectAria} ${project.title}`}
          >
            {media}
            <span className="project-open" aria-hidden="true">
              {copy.openProject} <ArrowUpRight />
            </span>
          </a>
        ) : (
          <div className="project-media">{media}</div>
        )}

        <div className="project-info">
          <span className="project-number" aria-hidden="true">
            {project.number}
          </span>
          <h3>{project.title}</h3>
          <p className="project-highlight">{project.highlight}</p>
          <p className="project-desc">{project.description}</p>
          <ul className="tag-list" aria-label={copy.technologies}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.url && (
            <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
              {copy.visitProject} <ArrowUpRight />
            </a>
          )}
        </div>
      </Reveal>
    );
  }

  return (
    <>
      <Header />
      <ProjectScrollTransition />

      <main id="inicio">
        <MascotScrollGuide />

        {/* ---------------- HERO ---------------- */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <Reveal className="hero-copy">
              <p className="hero-role">{copy.role}</p>
              <h1 id="hero-title">Luan Ibanhez</h1>
              <p className="hero-sub">{copy.heroSub}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#projetos">
                  {copy.viewProjects}
                </a>
                <a className="btn btn-ghost btn-mono" href="mailto:luanibanhez.dev@gmail.com">
                  luanibanhez.dev@gmail.com
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="hero-stage-wrap">
              <div className="hero-stage" aria-label={copy.systemsPreview}>
                {heroProjects.map((project, index) => (
                  <a
                    key={project.title}
                    className={`stage-card stage-card-${index + 1}${index === 0 ? " shared-project-source" : ""}`}
                    data-shared-project-source={index === 0 || undefined}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${copy.openProjectAria} ${project.title}`}
                  >
                    <BrowserFrame url={project.url ?? project.title}>
                      <div className="stage-image">
                        <Image
                          src={project.image}
                          alt={`Tela do sistema ${project.title}`}
                          fill
                          sizes="(max-width: 980px) 84vw, 560px"
                          priority={index === 0}
                        />
                      </div>
                    </BrowserFrame>
                    <span className="stage-label">{project.title}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="container">
            <dl className="hero-facts">
              <div>
                <dt>{copy.factCurrent}</dt>
                <dd>
                  {currentRole.title}
                  <span>{currentRole.place}</span>
                </dd>
              </div>
              <div>
                <dt>{copy.factEducation}</dt>
                <dd>
                  {currentDegree.title}
                  <span>{currentDegree.place} · {currentDegree.period}</span>
                </dd>
              </div>
              <div>
                <dt>{copy.factProduction}</dt>
                <dd>
                  {copy.factProductionValue}
                  <span>{projects.slice(0, 3).map((project) => project.title).join(", ")}</span>
                </dd>
              </div>
              <div>
                <dt>{copy.factStack}</dt>
                <dd>
                  Laravel, Livewire
                  <span>React, Next.js, MySQL</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---------------- PROJETOS ---------------- */}
        <section className="section projects" id="projetos" aria-labelledby="projects-title">
          <div className="container">
            <SectionMarker label={copy.projects} />
            <SectionHead id="projects-title" title={copy.projects}>
              {copy.projectCount}
            </SectionHead>

            {renderProject(featuredProject, true)}

            <div className="project-grid">
              {otherProjects.map((project) => renderProject(project, false))}
            </div>
          </div>
        </section>

        {/* ---------------- STACK + GITHUB ---------------- */}
        <div className="section section-surface">
          <div className="container">
            <SectionMarker label="Stack & GitHub" />
            <div className="code-band">
              <section className="stack" id="sobre" aria-labelledby="about-title">
                <SectionHead id="about-title" title={copy.skills} />

                <Reveal>
                  <dl className="skills">
                    {stackGroups.map((group) => (
                      <div key={group.pt}>
                        <dt>{isEnglish ? group.en : group.pt}</dt>
                        <dd>
                          <ul>
                            {group.items.map((skill) => (
                              <li key={skill}>{skill}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </section>

              <section className="github" id="github" aria-labelledby="github-title">
                <SectionHead id="github-title" title="GitHub">
                  <a className="text-link" href="https://github.com/luaniban" target="_blank" rel="noreferrer">
                    {copy.viewProfile} <ArrowUpRight />
                  </a>
                </SectionHead>

                <Reveal className="github-graph-wrap">
                  <a
                    className="github-graph"
                    href="https://github.com/luaniban"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={copy.githubAria}
                  >
                    <Image
                      src="/github/contributions.png"
                      alt={copy.githubAlt}
                      width={1494}
                      height={360}
                    />
                    <span className="github-walkers" aria-hidden="true">
                      <CommitWalker className="walker-east walker-one" />
                      <CommitWalker className="walker-west walker-two" />
                      <CommitWalker className="walker-east walker-three is-waving" />
                      <CommitWalker className="walker-west walker-four is-hopping" />
                      <CommitWalker className="walker-emerge" />
                    </span>
                  </a>
                </Reveal>
              </section>
            </div>
          </div>
        </div>

        {/* ---------------- TRAJETÓRIA ---------------- */}
        <section className="section journey" id="trajetoria" aria-labelledby="journey-title">
          <div className="container">
            <SectionMarker label={copy.journey} />
            <SectionHead id="journey-title" title={copy.journey}>
              <a className="btn btn-ghost btn-sm" href="/curriculo-luan-ibanhez.pdf" download>
                {copy.downloadResume}
              </a>
            </SectionHead>

            <div className="journey-layout">
              <ol className="timeline">
                {timeline.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item.title}
                    className="timeline-item"
                    timelineStep={index}
                  >
                    <span className="timeline-dot" aria-hidden="true" />
                    <div className="timeline-meta">
                      <span className="timeline-period">{item.period}</span>
                      <span className="timeline-kind">{item.kind}</span>
                    </div>
                    <div className="timeline-content">
                      <h3>{item.title}</h3>
                      <p className="timeline-place">{item.place}</p>
                      <p className="timeline-desc">{item.description}</p>
                      <PhpEvolution stage={index} compact />
                    </div>
                  </Reveal>
                ))}
              </ol>

              <PhpEvolution />
            </div>
          </div>
        </section>

        {/* ---------------- POSTS ---------------- */}
        <section className="section section-surface posts-preview" id="posts" aria-labelledby="posts-title">
          <div className="container">
            <SectionMarker label={copy.posts} />
            <SectionHead id="posts-title" title={copy.posts}>
              LinkedIn
            </SectionHead>

            <Reveal>
              <div className="posts-overview" data-linkedin-profile-source>
                <Image src="/linkedin-profile.png" alt="Luan Ibanhez de Almeida" width={400} height={400} />
                <div>
                  <h3>Luan Ibanhez de Almeida</h3>
                  <p>{copy.postsSummary}</p>
                </div>
                <LinkedinPostsLink>{copy.allPosts}</LinkedinPostsLink>
              </div>
            </Reveal>

            <ul className="post-previews">
              {postPreviews.map((preview) => (
                <Reveal as="li" key={preview.order}>
                  <a className="post-preview" href="/posts">
                    <span className="post-preview-media">
                      {preview.media.type === "video" ? (
                        <video src={`${preview.media.src}#t=1`} muted playsInline preload="metadata" aria-hidden="true" />
                      ) : (
                        <Image src={preview.media.src} alt="" fill sizes="(max-width: 980px) 100vw, 360px" unoptimized />
                      )}
                    </span>
                    <span className="post-preview-order">
                      {copy.post} {String(preview.order).padStart(2, "0")}
                    </span>
                    <span className="post-preview-excerpt">{preview.excerpt}</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- CONTATO ---------------- */}
        <section className="section band-inverse contact" id="contato" aria-labelledby="contact-title">
          <div className="container">
            <SectionMarker label={copy.contact} />
            <div className="contact-layout">
              <h2 id="contact-title">{copy.contact}</h2>

              <dl className="contact-list">
                <div>
                  <dt>{copy.email}</dt>
                  <dd>
                    <a href="mailto:luanibanhez.dev@gmail.com">luanibanhez.dev@gmail.com</a>
                  </dd>
                </div>
                <div>
                  <dt>LinkedIn</dt>
                  <dd>
                    <a href="https://linkedin.com/in/luanibanhez" target="_blank" rel="noreferrer">
                      linkedin.com/in/luanibanhez <ArrowUpRight />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>GitHub</dt>
                  <dd>
                    <a href="https://github.com/luaniban" target="_blank" rel="noreferrer">
                      github.com/luaniban <ArrowUpRight />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer band-inverse">
        <div className="container footer-inner">
          <a href="#inicio" className="logo-image footer-logo" aria-label={copy.top}>
            <Image className="brand-avatar" src="/avatar-logo.png" alt="" width={64} height={64} />
          </a>
          <p>{copy.footer} · {new Date().getFullYear()}</p>
          <a href="#inicio" className="footer-top">
            {copy.top}
          </a>
        </div>
      </footer>
    </>
  );
}
