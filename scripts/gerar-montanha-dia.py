"""Gera a versão de dia da montanha a partir da arte de noite.

A arte é desenhada de noite; o tema claro do site (o sol no cabeçalho) usa
esta versão. Não é um filtro por cima da imagem: cada parte é recolorida do
seu jeito, porque a noite pinta tudo de azul e o dia não é só "mais claro".

- o céu (a cor da noite que cresce a partir das bordas) vira um degradê azul
  claro, e as estrelas somem;
- as nuvens (blocos do azul puro que encostam sobretudo no céu) ficam brancas;
- a pedra azul vira cinza, a grama e as árvores ganham luz, e o resto (a
  escada, as placas, os nichos) só clareia um pouco;
- a sombra das árvores, que de noite é do azul da pedra, vira verde-escuro.

Rodar de novo sempre que a arte de noite mudar:

    python3 scripts/gerar-montanha-dia.py public/montanha-noite-site-v4.png public/montanha-dia-site-v5.png
"""
import sys
import numpy as np
import cv2
from PIL import Image
from scipy import ndimage

origem, destino = sys.argv[1], sys.argv[2]
rgb = np.array(Image.open(origem).convert('RGB'))
im = rgb.astype(np.float32)
H, W = im.shape[:2]

# --- céu: cresce a partir das bordas enquanto a cor muda pouco de um pixel
#     para o vizinho; para no contorno da montanha e das nuvens ---
mascara = np.zeros((H + 2, W + 2), np.uint8)
bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
sementes = [(x, 0) for x in range(0, W, 32)] + [(0, y) for y in range(0, 2700, 16)] + [(W - 1, y) for y in range(0, 1500, 16)]
for x, y in sementes:
    b, g, r = bgr[y, x]
    # a família do azul-marinho do céu, que clareia perto do horizonte
    if r < 20 and g < 60 and 50 < b < 185 and b > 2.4 * g and mascara[y + 1, x + 1] == 0:
        cv2.floodFill(bgr, mascara, (x, y), 0, (4, 4, 4), (4, 4, 4), 4 | cv2.FLOODFILL_MASK_ONLY | (255 << 8))
ceu = mascara[1:-1, 1:-1] > 0

# perto do horizonte o céu tem ruído maior que a tolerância, e o preenchimento
# deixa vãos. Aumentar a tolerância vaza para a sombra da rocha, que é quase da
# mesma cor; em vez disso, entra no céu o pixel da cor do céu cercado por ele.
familia = (im[..., 0] < 20) & (im[..., 1] < 60) & (im[..., 2] > 50) & (im[..., 2] < 185) & (im[..., 2] > 2.4 * im[..., 1])
# O preenchimento pode atravessar uma sequência de cores próximas e chegar
# à superfície. A família cromática limita o resultado, não só as sementes.
lateral_cavernas = np.zeros((H, W), dtype=bool)
lateral_cavernas[1500:3000, :500] = True
# O bosque acima das cavernas também contém coníferas pequenas inteiras
# que o removedor de estrelas confundia com ilhas isoladas no céu.
bosque_projetos = np.zeros((H, W), dtype=np.uint8)
# Contorno medido das copas e do chão do bosque, sem incluir o paredão.
cv2.fillPoly(bosque_projetos, [np.array([
    [460, 1520], [495, 1440], [520, 1480], [550, 1365],
    [575, 1420], [610, 1325], [655, 1380], [715, 1235],
    [770, 1340], [810, 1370], [825, 1305], [870, 1340],
    [910, 1285], [955, 1355], [1000, 1245], [1040, 1300],
    [1085, 1285], [1110, 1160], [1150, 1260], [1180, 1155],
    [1220, 1260], [1250, 1280], [1250, 1420], [1170, 1450],
    [1000, 1460], [800, 1460], [650, 1510],
], dtype=np.int32)], 1)
bosque_projetos = bosque_projetos.astype(bool)
lateral_cavernas |= bosque_projetos
# Aqui o céu ainda é escuro: não usar os limites de brilho do horizonte.
# A proporção dos canais, descontado o vermelho, separa céu de folhagem.
familia_bosque = (im[..., 2] > im[..., 1]) & (
    im[..., 2] - im[..., 0] > 2.6 * (im[..., 1] - im[..., 0])
)
ceu &= familia | ~lateral_cavernas | (bosque_projetos & familia_bosque)
ceu |= ndimage.binary_closing(ceu, structure=np.ones((3, 3)), iterations=4) & familia

# estrelas: buracos pequenos dentro do céu
buracos = ndimage.binary_fill_holes(ceu) & ~ceu
b_rot, nb = ndimage.label(buracos)
b_tam = ndimage.sum(np.ones_like(buracos), b_rot, range(1, nb + 1))
brilho_estrela = (im[..., 0] > 80) & (im[..., 1] > 80)
rotulos_brilhantes = np.unique(b_rot[brilho_estrela | ~lateral_cavernas])
estrelas = np.isin(b_rot, [i + 1 for i, t in enumerate(b_tam) if t < 2500 and (t < 80 or i + 1 in rotulos_brilhantes)])

# e as estrelas que não chegam a ser buraco (encostam num vão do céu): ilha
# pequena com quase todo o contorno no céu também é estrela
ilhas, ni = ndimage.label(~ceu & ~estrelas)
for i, fatia in enumerate(ndimage.find_objects(ilhas), start=1):
    bloco = ilhas[fatia] == i
    if bloco.sum() >= 600 or fatia[0].start > 2900:
        continue
    if bloco.sum() >= 80 and (bloco & lateral_cavernas[fatia]).any() and not (bloco & brilho_estrela[fatia]).any():
        continue
    y0, y1 = max(fatia[0].start - 3, 0), min(fatia[0].stop + 3, H)
    x0, x1 = max(fatia[1].start - 3, 0), min(fatia[1].stop + 3, W)
    local = ilhas[y0:y1, x0:x1] == i
    anel = ndimage.binary_dilation(local, iterations=2) & ~local
    if anel.sum() and ceu[y0:y1, x0:x1][anel].mean() >= 0.7:
        estrelas[y0:y1, x0:x1] |= local

# nuvens: blocos do azul puro das nuvens que encostam sobretudo no céu
cor_nuvem = (im[..., 0] <= 30) & (im[..., 2] >= 150) & (im[..., 1] >= 40) & (im[..., 1] <= 120) & ~ceu
n_rot, nn = ndimage.label(ndimage.binary_dilation(cor_nuvem, iterations=2) & ~ceu)
nuvens = np.zeros_like(ceu)
ceu_perto = ndimage.binary_dilation(ceu, iterations=2)
for i, fatia in enumerate(ndimage.find_objects(n_rot), start=1):
    bloco = n_rot[fatia] == i
    borda = bloco & ~ndimage.binary_erosion(bloco)
    # o miolo de algumas estrelas tem o mesmo azul da nuvem: nuvem é bloco grande
    if bloco.sum() >= 1500 and borda.sum() and (borda & ceu_perto[fatia]).sum() / borda.sum() >= 0.45:
        nuvens[fatia] |= ndimage.binary_fill_holes(bloco)
nuvens &= ~estrelas
# Pequenos vãos internos na superfície não são céu. Fechamos apenas canais
# estreitos para recuperar as sombras contínuas entre os galhos.
superficie = ~(ceu | estrelas | nuvens)
superficie_fechada = ndimage.binary_closing(superficie, structure=np.ones((3, 3)), iterations=2)
interior = ndimage.binary_fill_holes(superficie_fechada)
ceu &= ~(interior & lateral_cavernas)
estrelas &= ~(interior & lateral_cavernas)
print(f'ceu {ceu.mean():.1%}  estrelas {estrelas.sum()} px  nuvens {nuvens.sum()} px')
# Os rótulos de segmentação não são usados na recoloração. Liberá-los aqui
# reduz o pico de memória ao processar a arte inteira (2048 × 8860).
del mascara, bgr, buracos, b_rot, b_tam, ilhas, n_rot, cor_nuvem, ceu_perto
del superficie, superficie_fechada, interior

# --- céu de dia: degradê contínuo do azul do alto até o horizonte ---
ys = np.arange(H, dtype=np.float32)[:, None, None]
t = np.clip(ys / 2600.0, 0, 1)
alto = np.array([74, 163, 232], np.float32)
baixo = np.array([176, 224, 250], np.float32)
gradiente = alto * (1 - t) + baixo * t
saida = im.copy()
area_ceu = ceu | estrelas
saida[area_ceu] = np.broadcast_to(gradiente, (H, W, 3))[area_ceu]

# --- nuvens brancas, a sombra levemente azulada ---
tn = np.clip((im[..., 2] - 120) / 120, 0, 1)[..., None]
cor = np.array([188, 212, 236], np.float32) * (1 - tn) + np.array([255, 255, 255], np.float32) * tn
saida[nuvens] = cor[nuvens]

# --- o resto: luz de dia. A rocha azul vira cinza de pedra; o verde clareia ---
hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV).astype(np.float32)
h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
azul = (h >= 95) & (h <= 135)
verde = (h >= 30) & (h < 95)
s2 = np.where(azul, s * 0.22, np.where(verde, s * 0.95, s))
v2 = np.where(azul, v * 0.98 + 32, np.where(verde, v * 1.12 + 8, v * 1.08))
h2 = np.where(verde, h - 2, h)
dia = cv2.cvtColor(np.stack([h2, s2, v2], -1).clip(0, 255).astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32)
# a pedra puxa um pouco para o quente, como sob o sol
dia[azul] *= np.array([1.04, 1.01, 0.95], np.float32)

# --- a sombra das árvores: de noite ela é do mesmo azul-escuro da rocha, e
#     pela cor sozinha virava pedra cinza. O que separa é a vizinhança: azul
#     escuro no meio das folhas verde-azuladas é copa, e vira verde-escuro.
#     As árvores só em silhueta, sem folha acesa nenhuma, são mancha grande
#     de um azul-escuro um pouco mais esverdeado que o da rocha ---
# os nichos das placas são retângulos escuros do mesmo tom: ficam de fora
escuros, ne = ndimage.label((v > 25) & (v < 80))
nichos = np.zeros_like(ceu)
for i, fatia in enumerate(ndimage.find_objects(escuros), start=1):
    bloco = escuros[fatia] == i
    area = bloco.sum()
    if 60000 < area < 200000 and area / bloco.size > 0.85:
        nichos[fatia] |= ndimage.binary_fill_holes(bloco)
fora_nicho = 1 - cv2.GaussianBlur(ndimage.binary_dilation(nichos, iterations=6).astype(np.float32), (0, 0), 3)

folhas = (h >= 55) & (h <= 97) & (s > 120) & (v > 55) & ~nichos & ~area_ceu
silhueta = (h >= 99) & (h <= 106) & (s > 200) & (v > 25) & (v < 75) & ~nichos & ~area_ceu
perto_de_folha = cv2.GaussianBlur(folhas.astype(np.float32), (0, 0), 18)
na_mata = np.maximum(
    np.clip((perto_de_folha - 0.03) / 0.05, 0, 1),
    np.clip((cv2.GaussianBlur(silhueta.astype(np.float32), (0, 0), 12) - 0.15) / 0.15, 0, 1),
)
# dentro da mata, o que separa copa de pedra é o matiz: a rocha fica em 110-112,
# a sombra das árvores (e as árvores de fundo, de azul médio) em 104-108. Mas
# perto do topo a luz puxa a rocha para o mesmo matiz das árvores, então na
# beira da mata só vira copa o que é escuro; o azul médio só vira copa no miolo,
# cercado de folhas. As pedrinhas e a face acesa do paredão têm o matiz de
# copa, mas são claras demais para ser uma.
matiz_de_copa = np.clip((110 - h) / 3, 0, 1)
na_beira = np.maximum(np.clip((70 - v) / 30, 0, 1), matiz_de_copa * np.clip((95 - v) / 25, 0, 1))
miolo = np.clip((perto_de_folha - 0.12) / 0.08, 0, 1)
de_copa = np.maximum(na_mata * na_beira, miolo * matiz_de_copa)
de_copa *= np.clip((175 - v) / 35, 0, 1) * np.clip((s - 170) / 40, 0, 1)
peso = (de_copa * azul * fora_nicho)[..., None]
# a árvore de fundo, mais clara, fica verde mais apagado, como longe
s_copa = np.minimum(s * 0.8, 200) * np.clip(1.3 - v / 200, 0.5, 1)
# a copa na sombra precisa clarear mais que a copa no sol: escura demais, ela
# lê como cinza ao lado da pedra clara. O reforço vai sumindo conforme a copa
# já é clara, para a árvore no sol não estourar.
v_copa = v * 1.2 + 15
v_copa = v_copa * (1 + 0.35 * np.clip((120 - v_copa) / 60, 0, 1)) + 22 * np.clip((120 - v_copa) / 60, 0, 1)
copa = cv2.cvtColor(np.stack([np.full_like(h, 78), s_copa, v_copa], -1).clip(0, 255).astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32)
dia = dia * (1 - peso) + copa * peso
fixo = ~(area_ceu | nuvens)
saida[fixo] = dia[fixo]

# --- repasse: o que sobrou cinza dentro da mata vira folha na sombra. São os
#     vãos entre os galhos que a regra da copa não alcança; cercados de verde,
#     eles só podem ser árvore. ---
hsv_dia = cv2.cvtColor(np.clip(saida, 0, 255).astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
hd, sd, vd = hsv_dia[..., 0], hsv_dia[..., 1], hsv_dia[..., 2]
verde_dia = ((hd >= 30) & (hd <= 100) & (sd > 60)).astype(np.float32)
vizinhanca = cv2.GaussianBlur(verde_dia, (0, 0), 10)
sobrou = (sd < 55) & (vd > 20) & ~area_ceu & ~nuvens & ~nichos
peso_sobra = (np.clip((vizinhanca - 0.35) / 0.25, 0, 1) * sobrou)[..., None]
s_sobra = np.maximum(sd, 90 + 60 * np.clip((vizinhanca - 0.35) / 0.3, 0, 1))
folha = cv2.cvtColor(np.stack([np.full_like(hd, 80), s_sobra, vd * 0.96], -1).clip(0, 255).astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32)
saida = saida * (1 - peso_sobra) + folha * peso_sobra

# As copas da borda têm a mesma cor das faces sombreadas da rocha.
# Uma máscara contínua acompanha a crista na arte canônica. A transição
# suave evita os cortes em linhas retas dos antigos retângulos/componentes.
crista = np.zeros((H, W), np.float32)
cv2.fillPoly(crista, [np.array([
    [0, 1350], [490, 1350], [470, 1500], [455, 1600],
    [430, 1720], [410, 1800], [375, 1900], [325, 2000],
    [285, 2100], [205, 2300], [155, 2500],
    [110, 2740], [105, 2870], [60, 2960], [0, 3000],
], dtype=np.int32)], 1)
crista = cv2.GaussianBlur(crista, (0, 0), 16)
# O matiz da rocha é mais azulado (110–112); o da copa fica em 104–108.
# Somente as sombras mais escuras admitem tons intermediários.
matiz_crista = np.clip((111 - h) / 3, 0, 1)
matiz_crista = np.maximum(matiz_crista, np.clip((100 - v) / 30, 0, 1))
peso_crista = (
    crista * matiz_crista * azul * (s > 170)
    * np.clip((205 - v) / 30, 0, 1)
    * ~area_ceu * ~nuvens
)
peso_bosque = (
    cv2.GaussianBlur(bosque_projetos.astype(np.float32), (0, 0), 8)
    * (h >= 99) * (h <= 110) * azul * (s > 170) * (v > 25)
    * np.clip((205 - v) / 30, 0, 1) * ~area_ceu * ~nuvens
)
peso_crista = np.maximum(peso_crista, peso_bosque)
s_copa_isolada = np.maximum(s_copa, 160)
v_copa_isolada = np.clip(v + 25, 60, 190)
copa_isolada = cv2.cvtColor(
    np.stack([np.full_like(h, 78), s_copa_isolada, v_copa_isolada], -1).clip(0, 255).astype(np.uint8),
    cv2.COLOR_HSV2RGB,
).astype(np.float32)
saida = saida * (1 - peso_crista[..., None]) + copa_isolada * peso_crista[..., None]
print(
    f'copa na sombra reforçada; repasse em {int((peso_sobra > 0.5).sum())} px '
    f'e {int((peso_crista > 0.5).sum())} px de copa na crista'
)

Image.fromarray(np.clip(saida, 0, 255).astype(np.uint8)).save(destino)
print('salvo', destino)
