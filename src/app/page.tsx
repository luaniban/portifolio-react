import Image from "next/image";
import Header from "../components/Header";
import Reveal from "../components/Reveal";

const projects = [
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
      "Biblioteca digital interativa para gerenciar, explorar e personalizar experiências de leitura — upload de acervo, filtros e leitura de PDF direto no navegador.",
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
      "Plataforma gamificada de perguntas e respostas com aprendizado adaptativo por machine learning para crianças de 6 a 10 anos — trilhas por matéria, energia, recordes e serviço de ML que ajusta a dificuldade ao desempenho de cada aluno.",
    image: "/projects/quizzard.png",
    url: "https://github.com/Zakly-Educacao/Quizzard-frontend",
    tags: ["Next.js", "Laravel", "FastAPI", "Machine Learning", "Docker"],
    highlight: "Dificuldade adaptativa com ML",
  },
  {
    number: "05",
    title: "Paideia — Bug no Anzol",
    description:
      "Sistema educacional gamificado desenvolvido em hackathon: banco de questões da BNCC, pontos, XP e ranking, loja de personagens, desafios ao vivo via WebSocket e dashboards para alunos, professores e gestores. Atuei como desenvolvedor backend da equipe.",
    image: "/projects/bug-no-anzol.png",
    url: "https://bugnoanzol.hyanferreira.com.br/",
    tags: ["Laravel", "Sanctum", "Reverb", "MySQL", "Backend"],
    highlight: "Backend da equipe no hackathon",
  },
];

const heroProjects = [projects[0], projects[1], projects[4]];

const stack = [
  "Laravel",
  "PHP",
  "Livewire",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Git",
  "GitHub Actions",
  "AWS",
  "Nginx",
  "Linux",
  "Docker",
];

const timeline = [
  {
    period: "Out 2024 — Atual",
    title: "Estagiário em Desenvolvimento Full Stack PHP",
    place: "Secretaria de Educação — Prefeitura de Caraguatatuba",
    kind: "Experiência",
    description:
      "Desenvolvo, evoluo e mantenho aplicações web em PHP 7/8 e Laravel usadas pelas equipes da Secretaria: APIs RESTful, autenticação com Sanctum, modelagem MySQL com Eloquent e manutenção de sistemas em produção, com Git em fluxo colaborativo, deploys e CI/CD.",
  },
  {
    period: "2026",
    title: "Palestrante e Instrutor de Tecnologia",
    place: "IFSP Caraguatatuba — Extensão",
    kind: "Ensino",
    description:
      "Ministrei minicursos de PHP, Laravel, MVC, desenvolvimento backend e APIs, fortalecendo comunicação e compartilhamento de conhecimento.",
  },
  {
    period: "Fev 2024 — Atual",
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    place: "Instituto Federal de São Paulo (IFSP)",
    kind: "Formação",
    description:
      "Graduação em andamento com foco em engenharia de software, banco de dados e desenvolvimento de aplicações.",
  },
  {
    period: "Fev 2021 — Dez 2023",
    title: "Técnico em Informática integrado ao Ensino Médio",
    place: "Instituto Federal de São Paulo (IFSP)",
    kind: "Formação",
    description:
      "Base sólida em lógica, programação e infraestrutura, onde nasceu o gosto por transformar ideias em software.",
  },
];

const facts = [
  { value: "3+", label: "produtos em produção" },
  { value: "Full", label: "stack — do banco ao deploy" },
  { value: "E2E", label: "UI, API, dados e infra" },
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

export default function Home() {
  return (
    <>
      <Header />

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
                  Desenvolvedor Full Stack
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 id="hero-title">
                  Ideias viram
                  <br />
                  <span className="grad-text">produtos no ar.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="hero-sub">
                  Sou <strong>Luan Ibanhez</strong>. Projeto, desenvolvo e publico aplicações web
                  completas — interface, regras de negócio, banco de dados e deploy.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#projetos">
                    Ver projetos <ArrowUpRight />
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
              <div className="hero-stage" aria-label="Prévia dos sistemas publicados">
                {heroProjects.map((project, index) => (
                  <a
                    key={project.title}
                    className={`stage-card stage-card-${index + 1}`}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir ${project.title}`}
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

          <a className="hero-scroll" href="#projetos" aria-label="Rolar para os projetos">
            <span />
          </a>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
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

        {/* ---------------- PROJETOS ---------------- */}
        <section className="projects" id="projetos" aria-labelledby="projects-title">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="section-kicker">
                  <span>01</span> Projetos selecionados
                </p>
                <h2 id="projects-title">
                  Sistemas reais, em uso,
                  <br />
                  <span className="grad-text">de ponta a ponta.</span>
                </h2>
              </div>
            </Reveal>

            <div className="project-list">
              {projects.map((project, index) => (
                <Reveal key={project.title} as="article" className="project-row" delay={60}>
                  <a
                    className="project-media"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir ${project.title} em nova aba`}
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
                      Abrir sistema <ArrowUpRight />
                    </span>
                  </a>

                  <div className="project-info">
                    <span className="project-number" aria-hidden="true">
                      {project.number}
                    </span>
                    <h3>{project.title}</h3>
                    <p className="project-highlight">{project.highlight}</p>
                    <p className="project-desc">{project.description}</p>
                    <ul className="tag-list" aria-label="Tecnologias utilizadas">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                      Visitar projeto <ArrowUpRight />
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
                <span>02</span> Sobre mim
              </p>
              <h2 id="about-title">
                Tecnologia com
                <br />
                <span className="grad-text">propósito.</span>
              </h2>
            </Reveal>

            <div className="about-body">
              <Reveal delay={80}>
                <p className="about-lead">
                  Gosto de transformar processos confusos em experiências simples. Meu trabalho une{" "}
                  <strong>lógica, design e visão de produto</strong> para criar sistemas que as
                  pessoas realmente gostam de usar.
                </p>
                <p className="about-text">
                  Atuo em todas as camadas de uma aplicação: desenho a interface, estruturo regras
                  de negócio, banco de dados, integrações e faço o deploy. Essa visão de ponta a
                  ponta me ajuda a entregar com mais consistência e menos atrito.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <div className="skills">
                  <p className="skills-title">Stack &amp; ferramentas</p>
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
                  <span>03</span> Trajetória
                </p>
                <h2 id="journey-title">
                  Experiência, ensino
                  <br />
                  <span className="grad-text">e formação.</span>
                </h2>
              </div>
            </Reveal>

            <ol className="timeline">
              {timeline.map((item, index) => (
                <Reveal as="li" key={item.title} className="timeline-item" delay={index * 60}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-meta">
                    <span className="timeline-period">{item.period}</span>
                    <span className="timeline-kind">{item.kind}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p className="timeline-place">{item.place}</p>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <div className="journey-cta">
                <p>Quer a versão completa, com todos os detalhes?</p>
                <a className="btn btn-ghost" href="/curriculo-luan-ibanhez.pdf" download>
                  Baixar currículo (PDF) <ArrowUpRight />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CONTATO ---------------- */}
        <section className="contact" id="contato" aria-labelledby="contact-title">
          <div className="container">
            <Reveal className="contact-card">
              <p className="section-kicker">
                <span>04</span> Contato
              </p>
              <h2 id="contact-title">
                Tem uma ideia?
                <br />
                <span className="grad-text">Vamos tirá-la do papel.</span>
              </h2>
              <div className="contact-actions">
                <a className="btn btn-primary btn-lg" href="mailto:luanibanhez.dev@gmail.com">
                  Fale comigo <ArrowUpRight />
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
                ou escreva direto para <a href="mailto:luanibanhez.dev@gmail.com">luanibanhez.dev@gmail.com</a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a href="#inicio" className="logo footer-logo">
            <span className="logo-mark" aria-hidden="true" />
            luan<span className="logo-accent">.ibanhez</span>
          </a>
          <p>Projetado &amp; desenvolvido por Luan Ibanhez · {new Date().getFullYear()}</p>
          <a href="#inicio" className="footer-top">
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </>
  );
}
