"""Monta a arte da montanha a partir das peças 1024x1536 geradas em grade.

As peças que faltam são preenchidas com a arte antiga, reescalada. Em cada
emenda vertical o tom é casado linha a linha: o degrau entre duas peças muda
conforme o conteúdo (céu, rocha, madeira), então uma correção única deixa marca.
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter1d

PECAS = os.path.expanduser("~/Downloads/partes-refeitas-v2")
ANTIGA = "public/montanha-fundo.png"
SAIDA = sys.argv[1] if len(sys.argv) > 1 else "public/montanha-v3.png"
LARGURA, ALTURA_LINHA, LINHAS = 2048, 1536, 4


def casar_tom(esquerda: np.ndarray, direita: np.ndarray) -> np.ndarray:
    """Alinha a peça da direita à da esquerda, linha a linha, com queda suave."""
    faixa = 10
    dif = esquerda[:, -faixa:].mean(axis=1) - direita[:, :faixa].mean(axis=1)
    dif = gaussian_filter1d(dif, sigma=12, axis=0)

    largura = direita.shape[1]
    queda = np.clip(1 - np.arange(largura) / (largura * 0.6), 0, 1)
    queda = (np.cos(np.pi * (1 - queda)) + 1) / 2
    return np.clip(direita + dif[:, None, :] * queda[None, :, None], 0, 255)


def carregar_linha(n: int) -> np.ndarray | None:
    c1 = os.path.join(PECAS, f"l{n}c1.png")
    c2 = os.path.join(PECAS, f"l{n}c2.png")
    if not (os.path.exists(c1) and os.path.exists(c2)):
        return None

    a = np.asarray(Image.open(c1).convert("RGB")).astype(float)
    b = np.asarray(Image.open(c2).convert("RGB")).astype(float)
    return np.concatenate([a, casar_tom(a, b)], axis=1)


antiga = Image.open(ANTIGA).convert("RGB")
final = Image.new("RGB", (LARGURA, ALTURA_LINHA * LINHAS))
novas = []

for n in range(1, LINHAS + 1):
    linha = carregar_linha(n)
    if linha is not None:
        novas.append(n)
        img = Image.fromarray(linha.astype(np.uint8)).resize((LARGURA, ALTURA_LINHA), Image.LANCZOS)
    else:
        topo = antiga.size[1] * (n - 1) // LINHAS
        base = antiga.size[1] * n // LINHAS
        img = antiga.crop((0, topo, antiga.size[0], base)).resize((LARGURA, ALTURA_LINHA), Image.LANCZOS)
    final.paste(img, (0, ALTURA_LINHA * (n - 1)))

final.save(SAIDA)
print(f"{SAIDA}: {final.size[0]}x{final.size[1]} | linhas novas: {novas or 'nenhuma'}")
