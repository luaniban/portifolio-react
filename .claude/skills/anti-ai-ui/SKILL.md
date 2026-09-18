---

name: anti-ai-ui
description: Revisa e refatora interfaces que estejam com aparência genérica, artificial, excessivamente moderna ou semelhante a designs produzidos por IA. Use ao criar ou modificar páginas, dashboards, formulários, cards, tabelas, modais, autenticação, navegação ou qualquer componente visual.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Anti-AI UI Review

Atue como um diretor de produto e designer de interface extremamente crítico.

Sua função é identificar padrões que fazem uma interface parecer gerada automaticamente e substituí-los por decisões de design intencionais.

Sempre que modificar uma interface, faça silenciosamente esta auditoria antes de finalizar.

# Sinais de "AI UI"

Considere suspeito quando encontrar vários dos seguintes padrões:

* praticamente tudo dentro de cards;
* cards dentro de cards;
* `rounded-xl`, `rounded-2xl` ou `rounded-3xl` em excesso;
* sombras grandes e suaves sem função;
* gradientes decorativos;
* blobs;
* glow;
* roxo + azul;
* fundo branco com inúmeros cards cinza muito claros;
* badges em excesso;
* ícone colorido dentro de círculo em todo card;
* títulos gigantes;
* textos explicativos desnecessários;
* muito espaço vazio;
* dashboards formados apenas por grids de cards;
* quatro cards de estatísticas idênticos no topo de toda página;
* botões pill sem necessidade;
* excesso de glassmorphism;
* linhas extremamente arredondadas;
* componentes flutuando sem estrutura;
* sidebar genérica copiada de SaaS;
* todas as seções seguindo exatamente a mesma composição;
* uso excessivo de cores suaves;
* centenas de tons intermediários sem identidade;
* animações gratuitas;
* microcopy artificial;
* excesso de ícones;
* fonte genérica escolhida apenas porque é popular em interfaces modernas.

Nenhum item individual é proibido.

O problema é a utilização automática e repetitiva desses padrões.

# Regra principal

Não pergunte:

"Como posso deixar isso mais moderno?"

Pergunte:

"Como um designer resolveria especificamente este problema dentro deste produto?"

A função da interface vem antes da decoração.

# Contexto primeiro

Antes de redesenhar, identifique:

* quem usa a tela;
* qual é a tarefa principal;
* quais informações são mais importantes;
* quais ações são frequentes;
* quais ações são excepcionais;
* qual conteúdo pode ser secundário;
* onde existe densidade desnecessária;
* onde existe espaço desperdiçado.

A composição deve nascer dessas respostas.

# Não redesenhe tudo

Quando receber uma interface existente:

1. preserve o que funciona;
2. identifique os 3 a 5 problemas visuais mais importantes;
3. corrija primeiro hierarquia, espaçamento, tipografia e proporção;
4. somente depois considere decoração.

Não substitua automaticamente todo layout por outro completamente diferente.

# Hierarquia antes de containers

Antes de criar um card, tente resolver a hierarquia utilizando:

* alinhamento;
* spacing;
* typography;
* dividers;
* background;
* grouping.

Cards devem representar entidades ou agrupamentos reais.

# Assimetria controlada

Não transforme automaticamente todas as páginas em grids perfeitamente simétricos.

Permita que a importância do conteúdo determine a dimensão dos elementos.

Um conteúdo importante pode ocupar mais espaço.

Informações auxiliares podem ser compactas.

# Densidade

Interfaces operacionais são ferramentas de trabalho.

Não trate um sistema administrativo como página publicitária.

Evite padding excessivo.

A informação deve respirar, mas também deve ser rapidamente escaneável.

# Tipografia

Tipografia deve produzir personalidade sem prejudicar a leitura.

Questione fontes excessivamente associadas a templates e produtos gerados automaticamente.

Escolha uma fonte adequada ao contexto do sistema.

Utilize uma escala tipográfica pequena e consistente.

Não crie diferenças exageradas entre níveis de título.

# Cor

Use cor principalmente para:

* identidade;
* estados;
* hierarquia;
* interação;
* destaque realmente importante.

Não utilize cor simplesmente para preencher espaço.

Uma boa tela pode ser predominantemente neutra e ainda possuir identidade forte.

# Componentes

## Cards

Questione cada card:

"Este conteúdo realmente precisa de uma superfície própria?"

Se não, remova o card.

## Tabelas

Tabelas devem privilegiar leitura.

Evite:

* ações ocupando grandes colunas;
* chips para todos os valores;
* células desnecessariamente altas;
* muitas colunas com prioridade igual;
* repetição de informação.

Utilize hierarquia dentro da própria célula quando isso reduzir largura.

Informação primária pode ficar na primeira linha e informação secundária menor abaixo.

## Formulários

Não coloque cada campo em uma caixa visual separada.

Agrupe campos por significado.

Use largura proporcional ao conteúdo esperado.

Nem todo input precisa ocupar 100% da largura.

## Modais

Modais devem ser compactos e focados.

Não crie um modal gigantesco apenas porque existe espaço disponível.

## Dashboards

Não comece automaticamente com quatro KPI cards.

Use KPIs apenas quando eles realmente ajudam na decisão do usuário.

# Detalhes humanos

Procure pequenas decisões específicas do domínio.

Exemplos:

* nomenclatura que os usuários reais utilizam;
* agrupamentos baseados no fluxo de trabalho;
* informação secundária posicionada perto da informação à qual pertence;
* status apresentados de maneira proporcional à importância;
* ações frequentes mais acessíveis;
* ações raras mais discretas.

Essas decisões dão personalidade ao produto muito mais do que efeitos decorativos.

# Teste final

Antes de considerar uma interface pronta, avalie:

### Identidade

Poderia esta tela pertencer a qualquer SaaS aleatório?

Se sim, falta identidade.

### Necessidade

Há algum elemento presente apenas porque "fica bonito"?

Se sim, considere removê-lo.

### Cards

Alguma informação está dentro de um card sem precisar?

Se sim, simplifique.

### Radius

Existem elementos excessivamente arredondados?

Se sim, normalize.

### Cor

Existem muitas cores sem significado?

Se sim, reduza.

### Tipografia

A fonte e a hierarquia parecem escolhas conscientes?

Se não, ajuste.

### Densidade

A tela desperdiça espaço?

Se sim, compacte.

### Consistência

A nova solução conversa com o restante do sistema?

Se não, adapte.

### Originalidade

A tela parece uma resposta típica de "crie um dashboard moderno"?

Se sim, reavalie a composição.

# Comportamento ao implementar

Quando o usuário pedir alteração de uma tela, implemente a solução.

Não responda apenas com sugestões.

Inspecione o código existente, encontre os componentes responsáveis e faça as modificações respeitando a arquitetura atual.

Não altere regras de negócio durante uma refatoração visual.

Não introduza novas bibliotecas sem necessidade.

Prefira corrigir o design system existente.



## Copy, slogans e textos decorativos

Não invente frases de efeito, slogans, subtítulos, chamadas publicitárias ou microcopy apenas para preencher espaço visual.

Especialmente evite frases genéricas como:

* "Código todo dia, de verdade."
* "Transformando ideias em experiências."
* "Criando soluções que fazem a diferença."
* "Tecnologia com propósito."
* "Onde ideias ganham vida."
* "Construindo o futuro, uma linha de código por vez."
* "Mais que código."
* "Experiências que conectam."
* "Feito com paixão."
* "Soluções simples para problemas complexos."

Esse tipo de texto é um forte sinal de conteúdo gerado por IA quando não existe uma necessidade real de comunicação.

### Regra principal

Todo texto adicionado à interface deve responder a pelo menos uma destas perguntas:

1. Ajuda o usuário a entender onde está?
2. Explica o que ele pode fazer?
3. Explica alguma informação importante?
4. Ajuda na tomada de decisão?
5. Representa informação real sobre o produto, pessoa ou organização?

Se a resposta for "não" para todas, não adicione o texto.

### Não preencher espaço com texto

Espaço vazio não precisa obrigatoriamente ser preenchido.

Quando um layout parecer vazio, resolva primeiro através de:

* composição;
* espaçamento;
* proporção;
* tipografia;
* imagens;
* hierarquia;
* alinhamento.

Não resolva espaço vazio inventando um slogan.

### Portfólio pessoal

Em páginas pessoais ou portfólios, priorize informações concretas.

Prefira:

"Desenvolvedor Full Stack"

ou:

"Desenvolvedor Full Stack focado em aplicações web"

em vez de:

"Criando experiências digitais que transformam ideias em realidade."

Informações específicas sobre tecnologias, projetos, experiência e trabalho têm prioridade sobre frases aspiracionais genéricas.

### Preservação de voz

Não invente personalidade, posicionamento, slogans ou tom de marca em nome do usuário.

Quando um novo texto institucional ou pessoal for realmente necessário:

* reutilize informações existentes no projeto;
* escreva de forma direta;
* evite marketing exagerado;
* evite clichês;
* evite redundância;
* não crie slogans sem solicitação explícita.

Se houver dúvida entre adicionar um texto decorativo ou deixar o espaço sem texto, prefira não adicionar.
