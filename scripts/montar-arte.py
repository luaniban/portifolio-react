"""Monta a arte da montanha a partir das peças 1024x1536 geradas em grade.

As peças que faltam são preenchidas com a arte antiga, reescalada. Em cada
emenda vertical o tom é casado linha a linha: o degrau entre duas peças muda
conforme o conteúdo (céu, rocha, madeira), então uma correção única deixa marca.

Uso: python3 scripts/montar-arte.py [saída] [pasta das peças] [arte de reserva]
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter1d

SAIDA = sys.argv[1] if len(sys.argv) > 1 else "public/montanha-v3.png"
PECAS = os.path.expanduser(sys.argv[2] if len(sys.argv) > 2 else "~/Downloads/partes-refeitas-v2")
ANTIGA = os.path.expanduser(sys.argv[3] if len(sys.argv) > 3 else "public/montanha-fundo.png")
LARGURA, ALTURA_LINHA, LINHAS = 2048, 1536, 4


def casar_tom(esquerda: np.ndarray, direita: np.ndarray) -> np.ndarray:
    """Alinha a luz da peça da direita à da esquerda, em duas camadas.

    - Luz geral: diferença mediana na emenda, bem suavizada, aplicada na peça
      inteira. Corrige a peça mais clara ou mais escura sem criar listras.
    - Ajuste fino: o que sobra na emenda (uma placa cortada ao meio, por
      exemplo), aplicado só perto dela e sumindo em 200 px. Aplicado na peça
      inteira, cada detalhe da emenda vira uma listra atravessando a imagem.
    """
    faixa = 24
    dif = np.median(esquerda[:, -faixa:], axis=1) - np.median(direita[:, :faixa], axis=1)

    geral = np.clip(gaussian_filter1d(dif, sigma=150, axis=0, mode="nearest"), -12, 12)
    fino = np.clip(gaussian_filter1d(dif - geral, sigma=10, axis=0, mode="nearest"), -25, 25)

    largura = direita.shape[1]
    peso_geral = np.linspace(1.0, 0.5, largura)
    alcance = 200
    peso_fino = np.zeros(largura)
    rampa = np.clip(1 - np.arange(alcance) / alcance, 0, 1)
    peso_fino[:alcance] = (np.cos(np.pi * (1 - rampa)) + 1) / 2

    correcao = geral[:, None, :] * peso_geral[None, :, None] + fino[:, None, :] * peso_fino[None, :, None]
    return np.clip(direita + correcao, 0, 255)


def casar_tom_horizontal(cima: np.ndarray, baixo: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Fecha o degrau entre duas linhas, metade para cada lado.

    A correção é por coluna (o degrau muda conforme o conteúdo), limitada e com
    queda curta: correção longa escorre para dentro dos nichos e suja a arte.
    """
    faixa = 24
    dif = np.median(cima[-faixa:], axis=0) - np.median(baixo[:faixa], axis=0)
    dif = gaussian_filter1d(dif, sigma=150, axis=0, mode="nearest")
    dif = np.clip(dif, -12, 12)

    alcance = 220
    queda = np.clip(1 - np.arange(alcance) / alcance, 0, 1)
    queda = (np.cos(np.pi * (1 - queda)) + 1) / 2

    cima = cima.copy()
    baixo = baixo.copy()
    cima[-alcance:] = np.clip(cima[-alcance:] - dif[None, :, :] * queda[::-1, None, None] / 2, 0, 255)
    baixo[:alcance] = np.clip(baixo[:alcance] + dif[None, :, :] * queda[:, None, None] / 2, 0, 255)
    return cima, baixo


def carregar_linha(n: int) -> np.ndarray | None:
    c1 = os.path.join(PECAS, f"l{n}c1.png")
    c2 = os.path.join(PECAS, f"l{n}c2.png")
    if not (os.path.exists(c1) and os.path.exists(c2)):
        return None

    a = np.asarray(Image.open(c1).convert("RGB")).astype(float)
    b = np.asarray(Image.open(c2).convert("RGB")).astype(float)
    return np.concatenate([a, casar_tom(a, b)], axis=1)


antiga = Image.open(ANTIGA).convert("RGB")
linhas, novas = [], []

for n in range(1, LINHAS + 1):
    linha = carregar_linha(n)
    if linha is not None:
        novas.append(n)
        img = Image.fromarray(linha.astype(np.uint8)).resize((LARGURA, ALTURA_LINHA), Image.LANCZOS)
    else:
        topo = antiga.size[1] * (n - 1) // LINHAS
        base = antiga.size[1] * n // LINHAS
        img = antiga.crop((0, topo, antiga.size[0], base)).resize((LARGURA, ALTURA_LINHA), Image.LANCZOS)
    linhas.append(np.asarray(img).astype(float))

for i in range(len(linhas) - 1):
    linhas[i], linhas[i + 1] = casar_tom_horizontal(linhas[i], linhas[i + 1])

final = Image.fromarray(np.concatenate(linhas, axis=0).astype(np.uint8))
final.save(SAIDA)
print(f"{SAIDA}: {final.size[0]}x{final.size[1]} | linhas novas: {novas or 'nenhuma'}")
