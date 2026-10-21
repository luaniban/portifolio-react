"""Recorta o cume da montanha para a tela de carregamento, nos dois temas.

A tela de carregamento mostra o mascote se equilibrando no mesmo pico de onde
ele cai quando o site abre. O recorte sai das próprias artes, com o céu
removido (fica transparente, e o fundo da tela é a cor do céu do tema) e a base
se dissolvendo, porque a montanha continua para baixo.

O céu é separado comparando cada linha com a cor do céu na borda direita da
arte, nessa mesma altura (no dia o céu é um degradê). As estrelas da noite
também passam do limite; fica só a mancha ligada ao pico.

Rodar de novo sempre que trocar a arte da montanha ou mudar o pico de lugar.
"""
import os

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ARTES = {
    "noite": "public/montanha-noite-site-v4.png",
    "dia": "public/montanha-dia-site-v1.png",
}
DESTINO = "public/carregamento"

# ponta do pico, em pixels da arte (a mesma de .mapa-pico em globals.css)
PICO_X, PICO_Y = 1672, 432
LARGURA, ALTURA = 640, 560
ACIMA_DO_PICO = 20
LIMIAR = 28
# a base se dissolve a partir desta fração da altura
INICIO_DA_BASE = 0.45

os.makedirs(DESTINO, exist_ok=True)

esquerda = PICO_X - LARGURA // 2
topo = PICO_Y - ACIMA_DO_PICO
caixa = (esquerda, topo, esquerda + LARGURA, topo + ALTURA)

for tema, caminho in ARTES.items():
    arte = Image.open(caminho).convert("RGB")
    recorte = np.asarray(arte.crop(caixa), dtype=np.int16)

    # cor do céu por linha: mediana de uma faixa na borda direita, sem estrelas
    borda = np.asarray(arte.crop((arte.width - 60, topo, arte.width - 4, topo + ALTURA)), dtype=np.int16)
    ceu = np.median(borda, axis=1)[:, None, :]
    montanha = np.abs(recorte - ceu).max(axis=2) > LIMIAR

    # só a mancha que contém o pico; a base conta como fechada para preencher
    # as sombras do lado de dentro que têm a cor do céu
    rotulos, _ = ndimage.label(montanha)
    montanha = rotulos == rotulos[ACIMA_DO_PICO + 40, LARGURA // 2]
    montanha = ndimage.binary_fill_holes(np.vstack([montanha, np.ones((1, LARGURA), bool)]))[:-1]

    alfa = Image.fromarray((montanha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    alfa = np.asarray(alfa, dtype=np.float32) / 255

    t = np.clip((np.arange(ALTURA) / ALTURA - INICIO_DA_BASE) / (1 - INICIO_DA_BASE), 0, 1)
    alfa *= (1 - t * t * (3 - 2 * t))[:, None]

    rgba = np.dstack([recorte.astype(np.uint8), (alfa * 255).round().astype(np.uint8)])
    saida = f"{DESTINO}/pico-{tema}.webp"
    Image.fromarray(rgba, "RGBA").save(saida, "WEBP", quality=90, method=6)
    print(saida, (LARGURA, ALTURA), f"{os.path.getsize(saida) // 1024} KB")
