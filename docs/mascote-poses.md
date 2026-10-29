# Poses intermediárias da queda

## Padronização da saída do giro

A etapa lógica `05b-saindo-do-giro` agora reutiliza diretamente o arquivo
`06-estabilizando.png`, inclinado em 120 graus e retornando à posição normal
pela animação. Não há redesenho, edição de rosto ou nova geração de imagem:
os pixels são os mesmos da arte original. A sequência conserva doze etapas
visuais, sendo a saída do giro e a estabilização duas orientações dessa arte.
As versões redesenhadas de 05b foram preservadas no repositório como histórico,
mas não são mais usadas pelo site. O tamanho segue a calibração comum.

## Normalização de tamanho durante a queda

As doze poses usam agora escala externa fixa de 1,08, preservando o tamanho
inicial. Cada PNG tem um zoom individual calculado pela área média das duas
pupilas, dividida pela largura da imagem, em relação à pose 01. Essa medida é
independente da rotação e das margens transparentes. O zoom compensatório não
é interpolado entre poses e a escala externa não cresce durante a rolagem.
Os ajustes antigos de escala descritos nas revisões abaixo foram substituídos
por essa calibração comum. O pouso mantém seu ajuste próprio para caber no campo.
As imagens existentes foram preservadas; nenhuma pose foi redesenhada.

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

### Correção anatômica da cabeça na pose 05b

O desenho foi revisto com a ferramenta integrada de geração de imagens para
alinhar queixo, pescoço e gola com o eixo do tronco, preservando a direção do
giro. O tamanho do rosto foi novamente comparado à pose canônica. O teste
visual agora verifica também a orientação da linha entre as pupilas em relação
ao eixo do corpo, além do tamanho aparente.

Prompt de alinhamento:

> Precise anatomy correction, edit target supplied sprite05b. KEEP the entire torso, shoulders, shirt, shorts, arms, hands, legs and feet unchanged. Correct ONLY the head/neck orientation. CURRENT ERROR: the head is rotated about90 degrees relative to the torso and the neck seems to join beside the ear instead of under the chin. Rotate the WHOLE HEAD (hair, ears, eyes, nose, moustache, chin TOGETHER) approximately90 degrees CLOCKWISE relative to its current orientation, so the crown/hair points toward LOWER RIGHT and the CHIN points toward UPPER LEFT, naturally connecting to the shirt collar. The neck must emerge from underneath the chin, NOT the side of the face/ear. Align pelvis -> chest -> neck -> chin -> forehead -> crown along the same falling body axis from upper-left to lower-right, with no sideways neck bend. Since his body is inverted, his FACE must also look inverted in the canvas: do NOT try to keep the face upright. Keep exact head size, facial identity, curls, eye shapes, tiny moustache, colors and chibi proportions. Keep fullbody framing on1024x1536 portrait canvas with transparent margins so NOTHING is cropped. Transparent background, no text, no scenery, no glow.

Prompt de proporções:

> Edit target supplied falling chibi sprite. Its head/neck orientation is NOW CORRECT: keep that exact direction, chin attached to collar at upper-left and crown/curls pointing lower-right. DO NOT rotate the head back upright. Only correct proportions: ENLARGE THE ENTIRE HEAD AND ALL FACIAL FEATURES (including both black pupils) by20 percent, while making torso and legs15 percent shorter and slimmer, to restore an oversized-head small-body chibi silhouette. The two black pupil diameters must each be approximately100px on this1024x1536 canvas (not80px). Preserve exact face, hair style, moustache, expression, navy blazer, white shirt, teal tropical floral shorts and flipflops. Keep body pose and coherent head-to-neck connection. Center the whole character in the canvas with safe transparent margins at least30px on every edge; no hair fingers toes clipped. You may slightly reposition the whole figure to fit, but DO NOT shrink the head again for framing. Single fullbody sprite, same outlined illustration style and palette, truly transparent background without glow, no text, no scenery.

### Comportamento e acessibilidade

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
