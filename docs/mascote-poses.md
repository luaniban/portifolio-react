# Poses intermediárias da queda

Geradas em 26/10/2026 com a ferramenta integrada de geração de imagens,
usando as poses vizinhas como referências de identidade, proporção e estilo.
Arquivos finais em `public/mascote-poses-caindo/`; derivados responsivos em
`public/mascote-poses-caindo/web/`. Os originais existentes foram preservados.

## Direção dos prompts

Sprite único de corpo inteiro, ilustração chibi com contornos pretos,
cabelo castanho cacheado, bigode pequeno, olhos grandes, blazer azul-marinho,
camisa branca, short floral e chinelos. Fundo transparente, sem cenário ou
texto. Preservar identidade e proporções, com quadril, joelhos e pés coerentes.

| Arquivo | Pose solicitada e referências |
| --- | --- |
| `01b-perdendo-apoio.png` | Entre 01 e 02: mãos subindo à altura dos ombros, um joelho dobrando e outra perna descendo. |
| `02b-abrindo-pernas.png` | Entre 02 e 03: inclinação leve, braços abrindo, uma perna estendendo e outro joelho subindo. |
| `03b-inclinando.png` | Entre 03 e 04: inclinação diagonal maior, pernas subindo à direita e braços equilibrando. |
| `04b-meio-giro.png` | Entre 04 e 05 corrigida: cabeça na diagonal inferior esquerda, pés na superior direita; corpo inteiro girando junto. |
| `05-de-cabeca-para-baixo-v2.png` | Correção da 05: vista frontal coerente do corpo invertido, frente da camisa e do short visíveis, rosto invertido junto ao corpo, pernas sem torção. |
| `05b-saindo-do-giro.png` | Entre 05 corrigida e 06: cabeça na diagonal inferior direita, pés na superior esquerda; braços abrindo para estabilizar. |
| `06b-preparando-impacto.png` | Após 06: joelhos dobrados e mãos à frente para antecipar o impacto, ainda sem tocar o chão. |

## Integração

### Revisão da saída do giro (05b)

A pose `05b-saindo-do-giro.png` foi redesenhada com a ferramenta integrada
de geração de imagens usando a pose 06 como referência principal. Foram
preservados rosto, cabelo, traço e proporções chibi. As margens transparentes
foram corrigidas para evitar cortar os cachos. O zoom individual de 1,3
iguala o tamanho aparente do rosto sem interpolar essa compensação com a
pose vizinha. O ângulo do novo desenho foi ajustado na sequência.

Prompt de desenho:

> Use case: identity-preserve. Edit target: the supplied CANONICAL mascot, pose06. Create one intermediate falling animation sprite, keeping this EXACT character identity and proportions. Rotate the WHOLE character approximately135 degrees CLOCKWISE in the image plane, so his HEAD is toward LOWER RIGHT and his FEET toward UPPER LEFT. This is the exit-from-somersault pose05b, NOT a different character. Face rotates coherently with body. Preserve the enormous round head-to-body ratio, same exact hair curls, peach skin, tiny moustache and mouth, huge round black eyes with white rims, navy blazer, white button shirt, teal tropical floral drawstring shorts, navy flipflops. Keep small compact torso and SHORT SLIM legs as input; no longer torso, no broad muscular thighs/calves. Let arms extend to sides with hands opening for balance, both knees softly bent. One full-body FRONT view, anatomically consistent hands hips knees toes. Maintain same crisp black outlines, painterly shading and colors. Head diameter around650px at this1024x1536 frame scale; fullbody centered with generous transparent margins, not stretched to fill canvas. Truly transparent background with no glow, no halo, no scenery, no text, no added props. Prioritize matching the canonical mascot over inventing extra details.

Prompt de enquadramento:

> Precise sprite framing fix. Edit target: supplied mascot falling sprite. KEEP THIS EXACT DRAWING, face, hair, eyes, moustache, clothing, anatomy and diagonal pose unchanged. The hair is currently cut off along right canvas edge: restore the missing outer curls naturally. Uniformly scale the WHOLE character down about12% and center it within the SAME1024x1536 transparent canvas, leaving at least60px completely transparent margin at LEFT AND RIGHT. All fingers, toes, flipflops, hair curls fully visible with no clipping. Preserve proportional relationships; do NOT change face, limb shapes, pose or colors. Background genuinely transparent. Remove any glow/halo outside the silhouette; no scene, no text, no other characters. This is only a framing/margin correction of the exact supplied sprite.

### Comportamento da sequência

As doze poses de queda ocupam intervalos contínuos da rolagem. A pose de
pouso permanece independente, acionada pela grama. Uma sobreposição de
100 ms conserva a imagem anterior enquanto a próxima aparece, evitando
um intervalo com o mascote apagado. A rotação também compensa o ângulo já
desenhado em cada imagem para continuar o giro sem reiniciá-lo na troca.
O modo de movimento reduzido continua
estático. Regenerar WebP após alterações com `python3 scripts/gerar-mascote.py`.

## Revisão de proporções da pose 05

Substituído o desenho de `05-de-cabeca-para-baixo-v2.png`, mantendo o nome
consumido pela animação. A pose 06 foi usada como referência principal para
recuperar a cabeça grande, tronco compacto e pernas curtas e finas. Não foi
aplicada apenas uma redução global para disfarçar as proporções incorretas:
o desenho foi refeito e a escala final calibrada em 0,95 para igualar a altura
visível à pose 06 (diferença inferior a 1%).
Edição feita com a ferramenta integrada de geração de imagens.

Prompt final:

> Edit target: supplied canonical chibi mascot. Create its upside-down falling animation pose by rotating this EXACT character and his ENTIRE BODY 180 degrees in the image plane. Head below, feet above. Most important requirement: PRESERVE THE EXACT PROPORTIONS AND SIZE OF THIS INPUT, including his enormous head, tiny compact torso, SHORT SLIM legs, small knees/calves and small feet. Do not invent a taller, muscular, fat or adult-proportioned body. Body should be no bigger than head. Keep same head width approximately650px and total full-body height approximately1200px on1024x1536 canvas, centered with transparent margins. Same face upside-down with eyes below nose and moustache, curly hair at bottom. Open navy blazer, white button shirt front, teal floral drawstring shorts front, dark flip-flops. Legs remain SHORT and NARROW like input, bent a little outward with no anatomical twisting. Arms open diagonally toward bottom corners instead of horizontal. Fullbody FRONT view, same huge eyes and moustache, same outlines/shading/palette. Truly transparent background. NO glow or halo, no text, no scenery. Do NOT stretch torso or legs to fill the portrait canvas; leave empty transparent space. This must look like the same small mascot, merely upside down.
