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
