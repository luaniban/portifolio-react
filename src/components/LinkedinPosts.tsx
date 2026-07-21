"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

type Media = {
  src: string;
  type: "image" | "video";
};

type Post = {
  order: number;
  text: string;
  media: Media[];
};

const profileUrl = "https://www.linkedin.com/in/luanibanhez/";
const featuredPostOrders = new Set([1, 3, 10]);

const posts: Post[] = [
  {
    order: 1,
    text: `Tenho prazer de compartilhar o projeto PDGE - Sistema de Pontuação de Professores no qual trabalhei juntamente com o programador Felipe Pardinho.

Muitas vezes, as pessoas pensam que o maior problema de um projeto é a parte técnica. Mas a realidade é que o verdadeiro desafio está em lidar com pessoas.

Explicar o funcionamento de um sistema para quem não tem contato com programação exige clareza. Foi preciso traduzir termos técnicos para uma linguagem acessível, mostrando que a tecnologia é apenas uma ferramenta para facilitar o dia a dia.

Outro ponto essencial foram os testes de usabilidade. Eles permitiram observar como os usuários de fato interagiam com o sistema, revelando dificuldades, falhas e até bugs que não apareciam durante o desenvolvimento. Esse processo foi fundamental para melhorar a experiência do usuário, deixando o sistema mais simples, intuitivo e funcional.

Esse projeto reforçou para mim que desenvolver sistemas não é apenas escrever código. É sobre entender pessoas, ouvir feedbacks e transformar necessidades em soluções práticas.

Link do projeto: https://lnkd.in/dUUMJCqe`,
    media: [{ src: "/posts-portifolio/post-pdge-1/1757517586922.jpeg", type: "image" }],
  },
  {
    order: 2,
    text: `Atualmente, os chamados que recebemos no setor chegam por e-mail, o que acaba dificultando a organização e o acompanhamento das solicitações. Pensando nisso, iniciei o desenvolvimento de um sistema de chamados interno que vai trazer mais clareza para o nosso setor e mais facilidade para quem precisa abrir e acompanhar uma solicitação. É uma solução para tornar nosso fluxo de trabalho mais eficiente e organizado.`,
    media: [{ src: "/posts-portifolio/post-chamados-2/ChatGPT Image 20 de jul. de 2026, 10_49_28.png", type: "image" }],
  },
  {
    order: 3,
    text: `Desenvolvi um chat bot integrado ao sistema de chamados da Prefeitura, pensado para que os usuários possam relatar problemas específicos que não estão nos chamados. Ao iniciar um novo chat, o usuário é recebido por um bot que é representado de forma estilizada como um dos funcionários da equipe de Informática Educativa, escolhido aleatoriamente. Essa abordagem torna a experiência mais humanizada e próxima, dando a sensação de atendimento real.

No chat, o bot guia o usuário para detalhar o problema, filtrando as informações necessárias e respondendo de forma dinâmica. Para tornar a interação mais natural, utilizei Alpine.js para criar o efeito de “digitando”, mostrando primeiro os três pontos e depois exibindo a mensagem do bot, e JavaScript para que a conversa faça o scroll automaticamente para baixo, garantindo que o usuário veja sempre a última mensagem.

Na implementação, usei Laravel e Livewire no backend e Tailwind CSS, JS e Alpine.js no frontend. O sistema já está preparado para um futuro chat em tempo real, permitindo que, após o bot filtrar o problema, o usuário possa conversar diretamente com um funcionário pelo próprio chat.`,
    media: [{ src: "/posts-portifolio/post-chamados2-3/ChatGPT Image 20 de jul. de 2026, 10_49_28.png", type: "image" }],
  },
  {
    order: 4,
    text: `Muita gente começa projetos em Laravel colocando toda a lógica direto no controller.

E sim, funciona.

Você consegue validar, acessar o banco, aplicar regras de negócio e retornar dados, tudo dentro de um único método.

Mas o problema não é funcionar. O problema é manter, escalar e evoluir isso depois.

Quando o projeto cresce, esse tipo de abordagem gera:

• Controllers enormes e difíceis de entender
• Regras de negócio espalhadas
• Código difícil de testar
• Alto acoplamento entre camadas

Uma forma muito mais organizada, e usada em projetos profissionais, é separar responsabilidades:

Request: validação dos dados
Service: regras de negócio
Model: acesso ao banco
Resource: padronização da resposta

Isso deixa o controller limpo, simples e direto ao ponto.

O resultado? Código mais organizado, testável e fácil de manter.

No fim, não é só sobre fazer funcionar. É sobre construir algo que continue funcionando bem no futuro 🚀

#Laravel #PHP #CleanCode #DesenvolvimentoDeSoftware #Backend`,
    media: [{ src: "/posts-portifolio/post-service-4/1777295554758.jpeg", type: "image" }],
  },
  {
    order: 5,
    text: `Como você prova que realmente sabe uma tecnologia?

Não é só estudando.
É colocando em prática.
É ensinando.

Em breve, vou ministrar um minicurso de HTML, Tailwind CSS, PHP e Laravel em uma instituição federal, junto com meu amigo de trabalho Hyan Ferreira.

E isso tem um significado grande para mim.

Há 5 anos, no primeiro ano do técnico em informática, eu ficava até assustado ao ler uma linha de código.

Hoje, tenho a oportunidade de ensinar um framework que eu realmente gosto.

Atualmente, trabalho com Laravel no dia a dia e também ensino na prática, ajudando pessoas novas que entram na secretaria e agora através desse curso.

Nesse minicurso, vou abordar desde os fundamentos até o desenvolvimento prático de um sistema, com foco no que realmente é utilizado no dia a dia.

Ensinar é uma das formas mais rápidas de evoluir.

E esse é só mais um passo.

Você se sentiria preparado para ensinar o que sabe hoje?

#Laravel #PHP #DesenvolvimentoWeb #Programação #Tech #CarreiraEmTecnologia`,
    media: [{ src: "/posts-portifolio/post-curso-laravel-css-php-5/1777897890323.jpeg", type: "image" }],
  },
  {
    order: 6,
    text: `Lógica antes da linguagem.

Recentemente atuei como palestrante em um curso de PHP, e um dos maiores desafios ficou muito claro logo no início:

Não é só sobre ensinar PHP. É sobre ensinar como pensar como programador.

Muita gente chega esperando aprender comandos, mas encontra a verdadeira barreira na base: lógica de programação. E aí está o ponto crítico: explicar estruturas de decisão, repetição e raciocínio lógico enquanto a pessoa ainda está tentando entender a sintaxe da linguagem.

Fazer isso em pouco tempo exige decisões difíceis: o que aprofundar, o que simplificar e como evitar sobrecarga em quem está começando.

Ao longo do curso, ficou evidente que o maior avanço não foi escrever código, mas começar a entender o porquê das soluções.

A linguagem é só uma ferramenta. A lógica é o que realmente sustenta tudo.

Essa experiência reforçou o quanto ensinar exige clareza, paciência e adaptação constante.

Seguimos evoluindo, porque ensinar também é aprender.

#PHP #LógicaDeProgramação #Desenvolvimento #Tecnologia #Educação #CarreiraDev`,
    media: [{ src: "/posts-portifolio/curso-certificado-php-6/1779837556314.jpeg", type: "image" }],
  },
  {
    order: 7,
    text: `Ensinando Laravel e alguns aprendizados que ficaram

Nas últimas 2 semanas, tive a oportunidade de ministrar um curso de Laravel.

Tem uma frase do livro Desenvolvendo com Laravel, do Matt Stauffer, que sempre fez muito sentido para mim:

“Tenho muitas ferramentas no toolkit de nossa agência de consultoria, porém fico mais feliz quando sento em frente a uma linha de comando e digito laravel new project.”

E eu trouxe essa frase aqui porque ela representa exatamente o que eu sinto.

Mesmo com tantas tecnologias hoje em dia, o meu carinho por Laravel continua o mesmo. Sempre vou ficar feliz quando for a hora de começar e estruturar um novo projeto.

E, depois dessas duas semanas ensinando, isso só ficou mais evidente.

A real é que ensinar em pouco tempo é um desafio completamente diferente do que parece.

Não é só sobre mostrar código funcionando. É sobre organizar o raciocínio, simplificar o que é complexo e conseguir levar as pessoas do “não entendi nada” até o “agora fez sentido”.

Mas foi aí que eu tive ainda mais certeza do quanto eu gosto de trabalhar com Laravel e, principalmente, de compartilhar conhecimento.

Não poderia deixar de agradecer ao professor Nelson Alves, que tornou esse curso possível; ao Hyan Ferreira, que esteve comigo como palestrante; e ao Vinicius Trecenti de Araújo, que me apresentou ao Laravel e com quem aprendi os fundamentos do que sei hoje.

No fim, fica claro: ensinar também é uma das formas mais fortes de aprender. E com certeza não vai parar por aqui.`,
    media: [
      { src: "/posts-portifolio/curso-laravel-7/1780244915699.jpeg", type: "image" },
      { src: "/posts-portifolio/curso-laravel-7/1780244918269.jpeg", type: "image" },
      { src: "/posts-portifolio/curso-laravel-7/1780244919659.jpeg", type: "image" },
    ],
  },
  {
    order: 8,
    text: `Quizzard: quando estudar parece brincadeira e o professor enxerga o que importa.

Nos últimos meses, tenho me dedicado ao Quizzard: uma plataforma gamificada de perguntas e respostas, com aprendizado adaptativo por IA, feita para crianças do 1º ao 5º ano. A ideia que move tudo é simples de dizer e difícil de executar: estudar deveria ter cara de jogo, e o professor deveria conseguir ver, em tempo real, como cada criança está aprendendo de verdade.

Boa parte do trabalho foi justamente nesse “de verdade”. O serviço de machine learning não só ajusta a dificuldade conforme o desempenho de cada aluno: ele trabalha em cima do currículo da BNCC, seleciona questões equilibrando o tópico mais fraco da criança com o conteúdo previsto para a série, e ainda gera questões novas com ajuda de IA.

As sessões ao vivo são conduzidas pelo professor em tempo real: ele empurra as questões, acompanha quem já respondeu e vê o placar atualizando na hora. Há rankings, desafios coletivos, conquistas e recompensas, com direito a pinguim dançando e confete quando a meta é batida.

Do lado da escola, montei uma estrutura SaaS multi-tenant com sete perfis de acesso, cada um com seu próprio portal: estudante, professor, escola particular, diretor de escola, prefeitura, responsável e um admin master.

Sobre a parte técnica: Next.js 15 com TypeScript no front, Laravel 13 no back e Python com FastAPI no serviço de ML, tudo orquestrado em Docker. O banco já passa das 10 mil questões.

O projeto segue em desenvolvimento ativo, mas a maior parte do roadmap já está rodando. E sim, o mascote é um pinguim, porque ninguém aprende bem com medo de errar.`,
    media: [
      { src: "/posts-portifolio/post-quizzard-8/1781203510039.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510205.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510207.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510239.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510340.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510462.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510672.jpeg", type: "image" },
      { src: "/posts-portifolio/post-quizzard-8/1781203510723.jpeg", type: "image" },
    ],
  },
  {
    order: 9,
    text: `30 horas sem dormir por causa do maior hackathon de Caraguatatuba.

Além do desafio proposto pelo tema, nosso grupo tinha um desafio próprio: queríamos saber se seríamos capazes de entregar algo escalável, funcional e com ideias inovadoras em tão pouco tempo. Queríamos entender até onde conseguiríamos chegar construindo um sistema completo.

Nosso tema foi gamificação na educação. Criamos um sistema com sessão ao vivo para aulas, desafios entre os próprios alunos, personagens personalizados com níveis e tiers, conquistas, missões, XP, energia, rankings, pontos para gastar em uma loja e uma mecânica importante: mesmo quando o estudante errava uma questão, ele ainda recebia alguns pontos, para não associar o erro a uma experiência negativa.

Na visão administrativa, o professor conseguia acompanhar gráficos de desempenho da turma, visualizar dificuldades dos alunos, analisar o desempenho por questões e acompanhar a evolução da sala. Também pensamos em uma visão de gestor, com dados mais amplos da escola, administração de professores, turmas, alunos e acompanhamento geral dos resultados.

No fim, fiquei muito satisfeito com o nosso projeto. Além do conhecimento técnico aplicado, entregamos carinho e amor pelo que fazemos.

Quero agradecer ao Robert Cortez Rudi, Hyan Ferreira e Emerson Soares.

Estávamos fazendo aquilo porque gostamos de tecnologia, de programação, de resolver problemas e de construir algo com propósito.

#Hackathon #Tecnologia #Programação #Educação #Gamificação #DesenvolvimentoWeb`,
    media: [
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507879854.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507880192.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507880670.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507881052.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507882128.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507883828.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507884027.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507884244.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507884332.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507884559.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507884850.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507885003.jpeg", type: "image" },
      { src: "/posts-portifolio/post-hackaton-paideia-9/1783507885267.jpeg", type: "image" },
    ],
  },
  {
    order: 10,
    text: `Corrigir uma turma inteira de gabaritos agora leva segundos, não mais uma tarde inteira.

Essa é uma das funcionalidades que desenvolvi. Cada aluno recebe uma folha de respostas com um QR Code exclusivo e, na hora de corrigir, o professor tem dois caminhos, os dois que mostro no vídeo:

Leitura pela câmera: aponta o celular para a folha e a correção acontece na hora.

Envio de foto ou PDF: dá para subir várias folhas de uma vez, em lote.

O sistema identifica o aluno, lê as alternativas marcadas e já exibe a correção na tela, com o gabarito destacado e o total de acertos. E, antes de salvar, o professor confere tudo. Se uma questão ficou em branco ou com marcação dupla, o sistema avisa.

O resultado é direto. Menos tempo de digitação e mais tempo para o que realmente importa, acompanhar de perto cada aluno.

#EducaçãoPública #PHP #Laravel #LaravelDeveloper #DesenvolvimentoWeb #Tecnologia`,
    media: [{ src: "/posts-portifolio/post-gabarito-10/2026_07_14_13_40_02.mp4", type: "video" }],
  },
];

const englishPostText: Record<number, string> = {
  1: `I’m happy to share the PDGE, a Teacher Scoring System project I worked on alongside developer Felipe Pardinho.

People often think the biggest challenge in a project is the technical side. In reality, the real challenge is working with people.

Explaining how a system works to people without a programming background requires clarity. I had to translate technical terms into accessible language and show that technology is a tool to make everyday work easier.

Usability testing was another essential part. It showed how people actually interacted with the system, revealing difficulties, failures, and bugs that did not appear during development. That process was key to making the experience simpler, more intuitive, and more functional.

This project reinforced that building systems is not only about writing code. It is about understanding people, listening to feedback, and turning needs into practical solutions.

Project link: https://lnkd.in/dUUMJCqe`,
  3: `I developed a chatbot integrated with the City Hall service desk system so users can report specific issues that do not fit the available request categories. When a new chat begins, the user is greeted by a bot styled as one of the Educational IT team members, selected at random. This makes the experience feel more human and closer to real support.

The bot guides the user through describing the issue, filters the necessary information, and responds dynamically. To make the interaction more natural, I used Alpine.js to create the typing effect, first showing three dots and then the bot message, plus JavaScript to keep the conversation scrolled to the latest message.

I built it with Laravel and Livewire on the backend and Tailwind CSS, JavaScript, and Alpine.js on the frontend. The system is already prepared for a future real-time chat, allowing users to talk directly with a staff member after the bot has filtered the issue.`,
  10: `Grading an entire class of answer sheets now takes seconds, not an entire afternoon.

This is one of the features I developed. Each student receives an answer sheet with a unique QR Code and, when grading, the teacher has two options, both shown in the video:

Camera scanning: point a phone at the sheet and the grading happens immediately.

Photo or PDF upload: upload multiple sheets at once, in batches.

The system identifies the student, reads the marked answers, and immediately shows the result, with the answer key highlighted and the total correct answers. Before saving, the teacher can review everything. If a question is blank or has double marking, the system warns them.

The result is simple: less time typing and more time for what matters, following each student closely.

#PublicEducation #PHP #Laravel #LaravelDeveloper #WebDevelopment #Technology`,
};

function LinkedinIcon() {
  return <span className="linkedin-icon" aria-hidden="true">in</span>;
}

function PostMedia({ media, order }: { media: Media[]; order: number }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const [imageRatio, setImageRatio] = useState<number | null>(null);
  const current = media[active];

  return (
    <div className="linkedin-post-media">
      <div
        className={`linkedin-media-main is-${current.type}`}
        style={current.type === "image" && imageRatio ? { aspectRatio: imageRatio } : undefined}
      >
        {current.type === "video" ? (
          <video controls playsInline preload="metadata">
            <source src={current.src} type="video/mp4" />
            {language === "en" ? "Your browser does not support video." : "Seu navegador não suporta vídeo."}
          </video>
        ) : (
          <Image
            key={current.src}
            src={current.src}
            alt={language === "en" ? `Media from post ${order}` : `Mídia da publicação ${order}`}
            fill
            sizes="(max-width: 520px) calc(100vw - 40px), 480px"
            unoptimized
            onLoad={(event) => setImageRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)}
          />
        )}

        {media.length > 1 && <span className="linkedin-media-count">{active + 1} / {media.length}</span>}
      </div>

      {media.length > 1 && (
        <div className="linkedin-media-thumbs" aria-label={language === "en" ? `Media from post ${order}` : `Mídias da publicação ${order}`}>
          {media.map((item, index) => (
            <button
              type="button"
              key={item.src}
              className={index === active ? "is-active" : ""}
              aria-label={language === "en" ? `Show media ${index + 1}` : `Exibir mídia ${index + 1}`}
              aria-pressed={index === active}
              onClick={() => {
                setActive(index);
                setImageRatio(null);
              }}
            >
              <Image src={item.src} alt="" fill sizes="72px" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const text = language === "en" ? englishPostText[post.order] ?? post.text : post.text;
  const needsExpansion = text.length > 760;
  const visibleText = expanded || !needsExpansion ? text : `${text.slice(0, 760).trimEnd()}…`;

  return (
    <article className="linkedin-post">
      <header className="linkedin-post-author">
        <Image className="linkedin-avatar" src="/linkedin-profile.png" alt="" width={48} height={48} />
        <div>
          <a href={profileUrl} target="_blank" rel="noreferrer">Luan Ibanhez de Almeida</a>
          <p>{language === "en" ? "PHP Full Stack Developer | Laravel | Web Interfaces with Tailwind and JavaScript" : "Desenvolvedor PHP Full Stack | Laravel | Interfaces Web com Tailwind e JavaScript"}</p>
          <span>{language === "en" ? "Post" : "Publicação"} {String(post.order).padStart(2, "0")}</span>
        </div>
        <a className="linkedin-post-link" href={profileUrl} target="_blank" rel="noreferrer" aria-label={language === "en" ? "Open LinkedIn profile" : "Abrir perfil no LinkedIn"}>
          <LinkedinIcon />
        </a>
      </header>

      <div className="linkedin-post-copy">
        <p>{visibleText}</p>
        {needsExpansion && (
          <button type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? (language === "en" ? "Show less" : "Mostrar menos") : (language === "en" ? "Read full post" : "Ler publicação completa")}
          </button>
        )}
      </div>

      <PostMedia media={post.media} order={post.order} />
    </article>
  );
}

export default function LinkedinPosts() {
  const { language } = useLanguage();
  return (
    <div className="linkedin-posts-layout">
      <aside className="linkedin-profile-card" data-linkedin-profile-target>
        <Image className="linkedin-profile-image" src="/linkedin-profile.png" alt="Luan Ibanhez de Almeida" width={400} height={400} />
        <p className="linkedin-profile-network">LinkedIn</p>
        <h3>Luan Ibanhez de Almeida</h3>
        <p>{language === "en" ? "PHP Full Stack Developer | Laravel | Web Interfaces with Tailwind and JavaScript" : "Desenvolvedor PHP Full Stack | Laravel | Interfaces Web com Tailwind e JavaScript"}</p>
        <a className="btn btn-ghost" href={profileUrl} target="_blank" rel="noreferrer">
          {language === "en" ? "View LinkedIn profile" : "Ver perfil no LinkedIn"} <span aria-hidden="true">↗</span>
        </a>
      </aside>

      <div className="linkedin-feed" aria-label={language === "en" ? "LinkedIn posts" : "Publicações no LinkedIn"}>
        {posts.filter((post) => featuredPostOrders.has(post.order)).map((post) => <PostCard key={post.order} post={post} />)}
        <a className="btn btn-primary linkedin-view-all" href={profileUrl} target="_blank" rel="noreferrer">
          {language === "en" ? "View all on LinkedIn" : "Ver todos no LinkedIn"} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
