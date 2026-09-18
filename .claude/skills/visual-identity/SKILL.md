---

name: visual-identity
description: Define, refatora e mantém a identidade visual de interfaces web. Use sempre que o usuário pedir mudanças de cores, tipografia, tema, aparência geral, componentes visuais ou quando uma interface estiver genérica, artificial ou com aparência de template.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Visual Identity

Você é responsável pela direção visual deste projeto.

Seu objetivo não é simplesmente deixar a interface "bonita". O objetivo é criar uma identidade visual coerente, profissional, reconhecível e com aparência de produto projetado por uma equipe humana.

## Antes de alterar qualquer coisa

Analise primeiro:

1. estrutura atual do projeto;
2. framework CSS utilizado;
3. arquivos de tema, tokens ou variáveis CSS;
4. componentes compartilhados;
5. tipografia atual;
6. cores atuais;
7. layouts principais;
8. padrões repetidos de cards, tabelas, modais, formulários e navegação.

Não faça mudanças isoladas em dezenas de componentes quando a mesma alteração puder ser feita através de tokens, variáveis CSS ou componentes base.

Preserve toda funcionalidade existente.

## Direção visual

A interface deve transmitir:

* profissionalismo;
* clareza;
* confiança;
* organização;
* leveza;
* personalidade;
* aparência institucional contemporânea;
* sensação de software real usado diariamente.

Evite transformar o sistema em uma landing page de startup.

O projeto deve parecer um produto desenvolvido especificamente para seu contexto e não um template genérico.

## Tipografia

A tipografia é parte fundamental da identidade.

Evite automaticamente:

* Inter;
* Roboto;
* Arial;
* Poppins;
* Montserrat;
* Space Grotesk;
* fontes genéricas `system-ui`;

quando forem usadas apenas por conveniência e não houver justificativa visual.

Para este projeto, prefira inicialmente avaliar:

* IBM Plex Sans;
* Geist;
* Source Sans 3;
* Instrument Sans;
* Archivo;
* Newsreader ou Source Serif 4 apenas quando uma combinação editorial fizer sentido.

Não misture muitas famílias.

Preferencialmente use uma família principal e, se necessário, uma segunda família apenas para uma finalidade claramente definida.

### Hierarquia

Crie diferença clara entre:

* títulos de página;
* títulos de seção;
* títulos de cards;
* conteúdo;
* labels;
* metadados;
* textos auxiliares.

Não dependa apenas de tamanho.

Utilize de maneira intencional:

* peso;
* espaçamento;
* contraste;
* line-height;
* letter-spacing.

Evite títulos excessivamente grandes.

Interfaces administrativas precisam priorizar densidade de informação e legibilidade.

## Cores

Não crie uma paleta baseada em clichês de interfaces geradas por IA.

Evite:

* roxo como cor principal sem justificativa;
* gradiente roxo/azul;
* azul neon;
* cyan;
* glow;
* excesso de cores pastel;
* fundos coloridos em todos os cards;
* muitas cores competindo simultaneamente;
* cinza azulado em absolutamente toda a interface.

Escolha:

1. uma cor institucional principal;
2. uma escala neutra consistente;
3. uma cor de destaque, se necessária;
4. cores semânticas para sucesso, atenção, erro e informação.

A cor principal deve aparecer com intenção, não em todos os elementos.

Elementos estruturais devem utilizar predominantemente neutros.

Priorize contraste, leitura e sobriedade.

## Tokens

Sempre que possível, centralize a identidade em tokens.

Exemplo conceitual:

```css
:root {
    --font-sans: "...";

    --background: ...;
    --surface: ...;
    --surface-subtle: ...;

    --text-primary: ...;
    --text-secondary: ...;
    --text-muted: ...;

    --border: ...;
    --border-strong: ...;

    --brand: ...;
    --brand-hover: ...;
    --brand-subtle: ...;

    --success: ...;
    --warning: ...;
    --danger: ...;
}
```

Se o projeto utiliza Tailwind, adapte os tokens à arquitetura existente em vez de criar um sistema paralelo.

## Superfícies

Não coloque tudo dentro de cards.

Cards devem existir quando representam agrupamentos reais de informação.

Prefira:

* divisores;
* seções;
* espaços em branco;
* hierarquia tipográfica;
* agrupamento visual;

antes de adicionar outra caixa com fundo, border e border-radius.

Quando cards forem necessários:

* bordas discretas;
* sombras mínimas ou inexistentes;
* radius moderado;
* padding proporcional à quantidade de conteúdo.

## Bordas e radius

Evite `rounded-2xl` e `rounded-3xl` indiscriminadamente.

Elementos administrativos normalmente devem utilizar radius entre aproximadamente 6px e 12px, dependendo do componente.

Botões, inputs, cards e modais não precisam possuir exatamente o mesmo radius.

Crie uma escala coerente.

## Sombras

Sombras devem indicar elevação ou sobreposição.

Não use sombras apenas para "deixar bonito".

Cards comuns geralmente não precisam de sombra forte.

Modais, dropdowns e elementos flutuantes podem receber elevação um pouco maior.

## Espaçamento

Evite interfaces excessivamente infladas.

Analise a densidade apropriada ao contexto.

Tabelas, filtros e formulários de sistemas administrativos precisam mostrar informação suficiente sem parecer apertados.

Use uma escala consistente de espaçamento.

## Botões

Evite transformar toda ação em botão preenchido.

Crie níveis:

* ação primária;
* ação secundária;
* ação terciária;
* ação destrutiva.

Uma tela normalmente deve ter apenas uma ação visualmente dominante.

## Iconografia

Use ícones para melhorar reconhecimento, não como decoração.

Evite:

* ícone dentro de todo título;
* círculos coloridos atrás de todo ícone;
* ícones enormes em cards;
* misturar bibliotecas diferentes.

Mantenha tamanho e stroke consistentes.

## Resultado esperado

Depois da refatoração, a interface deve parecer:

* consistente;
* intencional;
* mais madura;
* menos genérica;
* menos "gerada por IA";
* confortável para uso prolongado;
* claramente pertencente ao mesmo produto.

Antes de finalizar, percorra as principais telas e confirme que tipografia, cores, bordas, estados e espaçamentos seguem a mesma linguagem visual.
