"use client";

import Image from "next/image";
import Header from "../components/Header";
import { useLanguage } from "../components/LanguageProvider";
import LinkedinPostsLink from "../components/LinkedinPostsLink";
import PhpEvolution from "../components/PhpEvolution";
import ProjectScrollTransition from "../components/ProjectScrollTransition";
import Reveal from "../components/Reveal";

const projectsPt = [
  {
    number: "01",
    title: "Rede Questionários",
    description:
      "Plataforma completa de avaliação educacional: questionários por série e período, leitura de gabaritos por câmera e QR Code, correção automática e painéis com indicadores por escola, turma e aluno.",
    image: "/projects/questionarios-rede.png",
    url: "https://questionarios-rede.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Visão computacional", "Dashboards"],
    highlight: "Scanner de gabaritos + gráficos comparativos",
  },
  {
    number: "02",
    title: "Livro Digital",
    description:
      "Biblioteca digital interativa para gerenciar, explorar e personalizar experiências de leitura, com upload de acervo, filtros e leitura de PDF direto no navegador.",
    image: "/projects/livro-digital.png",
    url: "https://livrodigital.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Tailwind", "PDF"],
    highlight: "Leitura fluida direto no navegador",
  },
  {
    number: "03",
    title: "Chamados de TI",
    description:
      "Central de suporte para abertura, priorização e acompanhamento de chamados, aproximando usuários e equipe técnica com atualizações em tempo real.",
    image: "/projects/chamados.png",
    url: "https://chamados.luanibanhez.tech/",
    tags: ["Laravel", "Reverb", "WebSockets", "Tempo real"],
    highlight: "Notificações em tempo real",
  },
  {
    number: "04",
    title: "Quizzard",
    description:
      "Plataforma gamificada de perguntas e respostas com aprendizado adaptativo por machine learning para crianças de 6 a 10 anos, com trilhas por matéria, energia, recordes e serviço de ML que ajusta a dificuldade ao desempenho de cada aluno.",
    image: "/projects/quizzard.png",
    url: "https://github.com/Zakly-Educacao/Quizzard-frontend",
    tags: ["Next.js", "Laravel", "FastAPI", "Machine Learning", "Docker"],
    highlight: "Dificuldade adaptativa com ML",
  },
  {
    number: "05",
    title: "Paideia: Bug no Anzol",
    description:
      "Sistema educacional gamificado desenvolvido em hackathon: banco de questões da BNCC, pontos, XP e ranking, loja de personagens, desafios ao vivo via WebSocket e dashboards para alunos, professores e gestores. Atuei como desenvolvedor backend da equipe.",
    image: "/projects/bug-no-anzol.png",
    url: "https://bugnoanzol.hyanferreira.com.br/",
    tags: ["Laravel", "Sanctum", "Reverb", "MySQL", "Backend"],
    highlight: "Backend da equipe no hackathon",
  },
];

const projectsEn = [
  {
    number: "01",
    title: "Questionnaire Network",
    description:
      "A complete educational assessment platform: questionnaires by grade and term, answer-sheet scanning by camera and QR Code, automatic grading, and dashboards with indicators by school, class, and student.",
    image: "/projects/questionarios-rede.png",
    url: "https://questionarios-rede.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Computer vision", "Dashboards"],
    highlight: "Answer-sheet scanner + comparative charts",
  },
  {
    number: "02",
    title: "Digital Book",
    description:
      "An interactive digital library to manage, explore, and personalize reading experiences, with collection uploads, filters, and PDF reading directly in the browser.",
    image: "/projects/livro-digital.png",
    url: "https://livrodigital.luanibanhez.tech/",
    tags: ["Laravel", "Livewire", "Tailwind", "PDF"],
    highlight: "Smooth reading directly in the browser",
  },
  {
    number: "03",
    title: "IT Service Desk",
    description:
      "A support hub for opening, prioritizing, and tracking requests, bringing users and the technical team closer through real-time updates.",
    image: "/projects/chamados.png",
    url: "https://chamados.luanibanhez.tech/",
    tags: ["Laravel", "Reverb", "WebSockets", "Real time"],
    highlight: "Real-time notifications",
  },
  {
    number: "04",
    title: "Quizzard",
    description:
      "A gamified question-and-answer platform with machine-learning-driven adaptive learning for children aged 6 to 10, with subject paths, energy, records, and an ML service that adjusts difficulty to each student’s performance.",
    image: "/projects/quizzard.png",
    url: "https://github.com/Zakly-Educacao/Quizzard-frontend",
    tags: ["Next.js", "Laravel", "FastAPI", "Machine Learning", "Docker"],
    highlight: "ML-powered adaptive difficulty",
  },
  {
    number: "05",
    title: "Paideia: Bug on the Hook",
    description:
      "A gamified educational system built at a hackathon: a BNCC question bank, points, XP, rankings, character store, live challenges through WebSocket, and dashboards for students, teachers, and managers. I worked as the team’s backend developer.",
    image: "/projects/bug-no-anzol.png",
    url: "https://bugnoanzol.hyanferreira.com.br/",
    tags: ["Laravel", "Sanctum", "Reverb", "MySQL", "Backend"],
    highlight: "Hackathon team backend",
  },
];

const stack = [
  "Laravel",
  "PHP",
  "Livewire",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "MySQL",
  "Git",
  "GitHub Actions",
  "Linux",
  "Docker",
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

const factsPt = [
  { value: "3+", label: "produtos em produção" },
  { value: "Full", label: "stack do banco ao deploy" },
  { value: "Do zero", label: "da ideia ao site no ar" },
];

const factsEn = [
  { value: "3+", label: "production products" },
  { value: "Full", label: "stack from database to deployment" },
  { value: "From scratch", label: "from idea to a live site" },
];

const githubStatsPt = [{ value: "753", label: "contribuições no último ano" }];
const githubStatsEn = [{ value: "753", label: "contributions in the last year" }];

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
        <div className="browser-dots">
          <span />
          <span />
          <span />
        </div>
        <p className="browser-url">{url.replace("https://", "").replace(/\/$/, "")}</p>
        <span className="browser-lock" />
      </div>
      {children}
    </div>
  );
}

function RevealLine({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className="text-reveal-line">
      <span className={accent ? "grad-text" : undefined}>{children}</span>
    </span>
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

export default function Home() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const projects = isEnglish ? projectsEn : projectsPt;
  const heroProjects = [projects[0], projects[1], projects[4]];
  const timeline = isEnglish ? timelineEn : timelinePt;
  const facts = isEnglish ? factsEn : factsPt;
  const githubStats = isEnglish ? githubStatsEn : githubStatsPt;
  const copy = isEnglish
    ? {
        heroKicker: "Full Stack Developer",
        heroTitle: ["Ideas become", "products that ship."],
        heroSub: "I’m",
        heroSubEnd: ". I design, build, and launch complete web applications: interface, business rules, database, and deployment.",
        viewProjects: "View projects",
        systemsPreview: "Preview of published systems",
        scrollProjects: "Scroll to projects",
        selectedProjects: "Selected projects",
        projectsTitle: ["Real systems, in use,", "end to end."],
        openProject: "Open",
        openProjectAria: "Open",
        technologies: "Technologies used",
        visitProject: "Visit project",
        about: "About me",
        aboutTitle: ["Technology with", "purpose."],
        aboutLead: "I enjoy turning confusing processes into simple experiences. My work combines",
        aboutLeadStrong: "logic, design, and product thinking",
        aboutLeadEnd: "to build systems people genuinely enjoy using.",
        aboutText: "I work across every application layer: I design the interface, structure business rules, databases, integrations, and handle deployment. This end-to-end view helps me deliver with more consistency and less friction.",
        skills: "Stack & tools",
        journey: "Journey",
        journeyTitle: ["Experience, teaching", "and education."],
        resumeQuestion: "Want the complete version with every detail?",
        downloadResume: "Download résumé (PDF)",
        githubTitle: ["Code every day,", "for real."],
        githubLead: "Committing is a habit, not an exception.",
        viewProfile: "View full profile",
        githubAria: "Open Luan Ibanhez’s GitHub profile",
        githubAlt: "GitHub contributions graph for Luan Ibanhez: 753 contributions in the last year",
        postsTitle: ["What I build,", "I share here."],
        postsSummary: "10 posts about projects, Laravel, education, and the courses I teach.",
        allPosts: "View all posts",
        contact: "Contact",
        contactTitle: ["Have an idea?", "Let’s bring it to life."],
        talk: "Talk to me",
        contactMail: "or email me directly at",
        footer: "Designed & developed by Luan Ibanhez",
        top: "Back to top ↑",
      }
    : {
        heroKicker: "Desenvolvedor Full Stack",
        heroTitle: ["Ideias viram", "produtos no ar."],
        heroSub: "Sou",
        heroSubEnd: ". Projeto, desenvolvo e publico aplicações web completas: interface, regras de negócio, banco de dados e deploy.",
        viewProjects: "Ver projetos",
        systemsPreview: "Prévia dos sistemas publicados",
        scrollProjects: "Rolar para os projetos",
        selectedProjects: "Projetos selecionados",
        projectsTitle: ["Sistemas reais, em uso,", "de ponta a ponta."],
        openProject: "Abrir sistema",
        openProjectAria: "Abrir",
        technologies: "Tecnologias utilizadas",
        visitProject: "Visitar projeto",
        about: "Sobre mim",
        aboutTitle: ["Tecnologia com", "propósito."],
        aboutLead: "Gosto de transformar processos confusos em experiências simples. Meu trabalho une",
        aboutLeadStrong: "lógica, design e visão de produto",
        aboutLeadEnd: "para criar sistemas que as pessoas realmente gostam de usar.",
        aboutText: "Atuo em todas as camadas de uma aplicação: desenho a interface, estruturo regras de negócio, banco de dados, integrações e faço o deploy. Essa visão de ponta a ponta me ajuda a entregar com mais consistência e menos atrito.",
        skills: "Stack & ferramentas",
        journey: "Trajetória",
        journeyTitle: ["Experiência, ensino", "e formação."],
        resumeQuestion: "Quer a versão completa, com todos os detalhes?",
        downloadResume: "Baixar currículo (PDF)",
        githubTitle: ["Código todo dia,", "de verdade."],
        githubLead: "Commit é rotina, não exceção.",
        viewProfile: "Ver perfil completo",
        githubAria: "Abrir perfil do GitHub de Luan Ibanhez",
        githubAlt: "Gráfico de contribuições do GitHub de Luan Ibanhez: 753 contribuições no último ano",
        postsTitle: ["O que eu construo,", "compartilho por aqui."],
        postsSummary: "10 publicações sobre projetos, Laravel, educação e os cursos que ministro.",
        allPosts: "Ver todos os posts",
        contact: "Contato",
        contactTitle: ["Tem uma ideia?", "Vamos tirá-la do papel."],
        talk: "Fale comigo",
        contactMail: "ou escreva direto para",
        footer: "Projetado & desenvolvido por Luan Ibanhez",
        top: "Voltar ao topo ↑",
      };

  return (
    <>
      <Header />
      <ProjectScrollTransition />

      <main id="inicio">
        {/* ---------------- HERO ---------------- */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-bg" aria-hidden="true">
            <span className="orb orb-a" />
            <span className="orb orb-b" />
            <span className="hero-grid" />
          </div>

          <div className="container hero-layout">
            <div className="hero-copy">
              <Reveal>
                <p className="hero-kicker">
                  <span className="kicker-pulse" aria-hidden="true" />
                  {copy.heroKicker}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 id="hero-title">
                  <RevealLine>{copy.heroTitle[0]}</RevealLine>
                  <RevealLine accent>{copy.heroTitle[1]}</RevealLine>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="hero-sub">
                  {copy.heroSub} <strong>Luan Ibanhez</strong>{copy.heroSubEnd}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#projetos">
                    {copy.viewProjects} <ArrowUpRight />
                  </a>
                  <a className="btn btn-ghost" href="mailto:luanibanhez.dev@gmail.com">
                    luanibanhez.dev@gmail.com
                  </a>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <dl className="hero-facts">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.value}</dt>
                      <dd>{fact.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={200} className="hero-stage-wrap">
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
                    <BrowserFrame url={project.url}>
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

          <a className="hero-scroll" href="#projetos" aria-label={copy.scrollProjects}>
            <span />
          </a>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
        <Reveal>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[...stack, ...stack].map((item, i) => (
                <span key={`${item}-${i}`}>
                  {item}
                  <i className="marquee-dot" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---------------- PROJETOS ---------------- */}
        <section className="projects" id="projetos" aria-labelledby="projects-title">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="section-kicker">
                  <span>01</span> {copy.selectedProjects}
                </p>
                <h2 id="projects-title">
                  <RevealLine>{copy.projectsTitle[0]}</RevealLine>
                  <RevealLine accent>{copy.projectsTitle[1]}</RevealLine>
                </h2>
              </div>
            </Reveal>

            <div className="project-list">
              {projects.map((project) => (
                <Reveal key={project.title} as="article" className="project-row" delay={60}>
                  <a
                    className={`project-media${project.number === "01" ? " shared-project-target" : ""}`}
                    data-shared-project-target={project.number === "01" || undefined}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${copy.openProjectAria} ${project.title}`}
                  >
                    <BrowserFrame url={project.url}>
                      <div className="project-image">
                        <Image
                          src={project.image}
                          alt={`Tela do sistema ${project.title}`}
                          fill
                          sizes="(max-width: 980px) 100vw, 60vw"
                        />
                      </div>
                    </BrowserFrame>
                    <span className="project-open" aria-hidden="true">
                      {copy.openProject} <ArrowUpRight />
                    </span>
                  </a>

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
                    <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                      {copy.visitProject} <ArrowUpRight />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SOBRE ---------------- */}
        <section className="about" id="sobre" aria-labelledby="about-title">
          <div className="container about-layout">
            <Reveal className="about-head">
              <p className="section-kicker">
                <span>02</span> {copy.about}
              </p>
              <h2 id="about-title">
                <RevealLine>{copy.aboutTitle[0]}</RevealLine>
                <RevealLine accent>{copy.aboutTitle[1]}</RevealLine>
              </h2>
            </Reveal>

            <div className="about-body">
              <Reveal delay={80}>
                <p className="about-lead">
                  {copy.aboutLead}{" "}
                  <strong>{copy.aboutLeadStrong}</strong>{" "}{copy.aboutLeadEnd}
                </p>
                <p className="about-text">
                  {copy.aboutText}
                </p>
              </Reveal>

              <Reveal delay={140}>
                <div className="skills">
                  <p className="skills-title">{copy.skills}</p>
                  <ul>
                    {stack.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- TRAJETÓRIA ---------------- */}
        <section className="journey" id="trajetoria" aria-labelledby="journey-title">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="section-kicker">
                  <span>03</span> {copy.journey}
                </p>
                <h2 id="journey-title">
                  <RevealLine>{copy.journeyTitle[0]}</RevealLine>
                  <RevealLine accent>{copy.journeyTitle[1]}</RevealLine>
                </h2>
              </div>
            </Reveal>

            <div className="journey-layout">
              <ol className="timeline">
                {timeline.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item.title}
                    className="timeline-item"
                    delay={index * 60}
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

            <Reveal delay={120}>
              <div className="journey-cta">
                <p>{copy.resumeQuestion}</p>
                <a className="btn btn-ghost" href="/curriculo-luan-ibanhez.pdf" download>
                  {copy.downloadResume} <ArrowUpRight />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- GITHUB ---------------- */}
        <section className="github" id="github" aria-labelledby="github-title">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="section-kicker">
                  <span>04</span> GitHub
                </p>
                <h2 id="github-title">
                  <RevealLine>{copy.githubTitle[0]}</RevealLine>
                  <RevealLine accent>{copy.githubTitle[1]}</RevealLine>
                </h2>
              </div>
            </Reveal>

            <div className="github-layout">
              <Reveal delay={80} className="github-info">
                <p className="github-lead">
                  <strong>{copy.githubLead}</strong>
                </p>

                <dl className="github-stats">
                  {githubStats.map((stat) => (
                    <div key={stat.label}>
                      <dt>{stat.value}</dt>
                      <dd>{stat.label}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  className="btn btn-ghost"
                  href="https://github.com/luaniban"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.viewProfile} <ArrowUpRight />
                </a>
              </Reveal>

              <Reveal delay={160} className="github-graph-wrap">
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
            </div>
          </div>
        </section>

        {/* ---------------- POSTS ---------------- */}
        <section className="posts posts-preview" id="posts" aria-labelledby="posts-title">
          <div className="container">
            <Reveal>
              <div className="section-head posts-head">
                <p className="section-kicker">
                  <span>05</span> LinkedIn
                </p>
                <h2 id="posts-title">
                  <RevealLine>{copy.postsTitle[0]}</RevealLine>
                  <RevealLine accent>{copy.postsTitle[1]}</RevealLine>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="posts-overview" data-linkedin-profile-source>
                <Image src="/linkedin-profile.png" alt="Luan Ibanhez de Almeida" width={400} height={400} />
                <div>
                  <p className="posts-overview-kicker">LinkedIn</p>
                  <h3>Luan Ibanhez de Almeida</h3>
                  <p>{copy.postsSummary}</p>
                </div>
                <LinkedinPostsLink>
                  {copy.allPosts} <ArrowUpRight />
                </LinkedinPostsLink>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CONTATO ---------------- */}
        <section className="contact" id="contato" aria-labelledby="contact-title">
          <div className="container">
            <Reveal className="contact-card">
              <p className="section-kicker">
                <span>06</span> {copy.contact}
              </p>
              <h2 id="contact-title">
                <RevealLine>{copy.contactTitle[0]}</RevealLine>
                <RevealLine accent>{copy.contactTitle[1]}</RevealLine>
              </h2>
              <div className="contact-actions">
                <a className="btn btn-primary btn-lg" href="mailto:luanibanhez.dev@gmail.com">
                  {copy.talk} <ArrowUpRight />
                </a>
                <a
                  className="btn btn-ghost btn-lg"
                  href="https://linkedin.com/in/luanibanhez"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight />
                </a>
                <a className="btn btn-ghost btn-lg" href="https://github.com/luaniban" target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight />
                </a>
              </div>
              <p className="contact-mail">
                {copy.contactMail} <a href="mailto:luanibanhez.dev@gmail.com">luanibanhez.dev@gmail.com</a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Reveal className="container footer-inner">
          <a href="#inicio" className="logo logo-image footer-logo">
            <Image className="brand-avatar" src="/avatar-logo.png" alt="" width={64} height={64} />
          </a>
          <p>{copy.footer} · {new Date().getFullYear()}</p>
          <a href="#inicio" className="footer-top">
            {copy.top}
          </a>
        </Reveal>
      </footer>
    </>
  );
}
