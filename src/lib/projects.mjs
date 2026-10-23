// Os oito projetos, um por nicho, na ordem das fileiras (esquerda, direita).
export const projects = [
  {
    titulo: "AvaRede — Questionários da Rede",
    destaque: "Correção de gabaritos por arquivo ou câmera",
    descricao:
      "Plataforma de avaliações educacionais. As escolas lançam as respostas lendo a folha por foto, PDF ou câmera do celular (QR Code), as notas são calculadas automaticamente e os resultados viram gráficos por aluno, turma, escola e habilidade, com comparativo entre períodos e escolas.",
    tags: ["Laravel", "Livewire", "TallStackUI", "MySQL", "DomPDF", "MapLibre"],
    miniatura: "questionarios-rede",
    url: "https://questionarios-rede.luanibanhez.tech/",
  },
  {
    titulo: "LivroDigital",
    destaque: "Conversão de PDF em flipbook",
    descricao:
      "Biblioteca digital de livros informativos. O administrador envia o PDF, o sistema converte cada página em imagem e monta um flipbook com animação de folhear e zoom. A biblioteca é pública, com busca, filtros e download.",
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
    url: "https://quizzard.luanibanhez.tech/",
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
      "Sistema para cadastro e pontuação de professores. O professor informa dados pessoais, funcionais, formação, cursos, congressos e comissões, e o sistema calcula a ficha de pontuação usada nas classificações de atribuição de aulas e remoção.",
    tags: ["Laravel", "Livewire", "Chart.js", "MySQL", "Laravel Excel"],
    miniatura: "pdge",
  },
  {
    titulo: "Autoavaliação",
    destaque: "Evolução do mesmo aluno entre dois anos",
    descricao:
      "Questionário autoavaliativo respondido online ou em folha com QR Code. As respostas viram indicadores como nível socioeconômico (NSE), apoio familiar, acesso digital e condições de estudo, comparando o mesmo aluno em dois anos diferentes.",
    tags: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "DomPDF"],
    miniatura: "autoavaliacao",
  },
  {
    titulo: "SIGTU",
    destaque: "API REST com RBAC e testes de mutação",
    descricao:
      "Plataforma de Gestão de Transporte Universitário desenvolvida em equipe na disciplina de Engenharia de Software do IFSP. Estudantes fazem inscrição e recadastro; gestores administram solicitações, lista de espera, instituições, cursos e a ocupação das linhas.",
    tags: ["Laravel", "Sanctum", "Next.js", "MySQL", "PHPUnit"],
    miniatura: "sigtu",
    url: "https://sigtu.luanibanhez.tech/",
  },
];

// Product names and technology names stay as published; descriptive copy is localized.
export const projectsEn = projects.map((project, index) => ({
  ...project,
  ...[
    { titulo: "AvaRede — School Network Assessments", destaque: "Answer sheet grading from files or a camera", descricao: "An educational assessment platform. Schools submit answers using a photo, PDF or phone camera with a QR code. Grades are calculated automatically, with charts by student, class, school and skill, and comparisons across periods and schools." },
    { destaque: "PDF-to-flipbook conversion", descricao: "A digital library of informational books. Administrators upload PDFs, and the system converts each page into an image to create a flipbook with page-turn animations and zoom. The public library supports search, filters and downloads." },
    { titulo: "HelpEduc — IT Support Tickets", destaque: "Chatbot, dashboard and real-time notifications", descricao: "An internal support ticket system. Schools report issues with a category, urgency and description, while the IT team tracks and responds to requests. A chatbot guides ticket creation and offers a human agent. The dashboard groups tickets by status, period and category." },
    { destaque: "Adaptive difficulty with machine learning", descricao: "A gamified quiz SaaS platform for children aged 6–10. Teachers create questions and playlists, run live lessons and track their classes. A machine learning service adapts difficulty to each student's level. Multi-tenant, with free and paid plans." },
    { destaque: "Built during a 30-hour hackathon", descricao: "An educational gamification system built as a team during the 30-hour Caraguatatuba hackathon. Students answer questions aligned with Brazil's national curriculum (BNCC), earn XP, points and achievements, level up characters, complete missions and challenge classmates live. Teachers and administrators track performance by class, question and subject." },
    { destaque: "Automatic calculation of teacher ranking scores", descricao: "A teacher registration and scoring system. Teachers submit personal and employment details, qualifications, courses, conferences and committee work. The system calculates the scores used to rank teachers for class assignments and transfers." },
    { titulo: "Self-Assessment", destaque: "Tracking the same student across two years", descricao: "A self-assessment questionnaire completed online or on a printed sheet with a QR code. Responses become indicators of socioeconomic status, family support, digital access and study conditions, comparing the same student across two different years." },
    { destaque: "REST API with RBAC and mutation testing", descricao: "A university transport management platform developed as a team for the Software Engineering course at IFSP. Students apply and renew their registrations. Administrators manage applications, waiting lists, institutions, courses and route capacity." },
  ][index],
}));
