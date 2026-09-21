"""Mede o quanto cada emenda da arte destoa da variação natural da imagem.

Na junção, compara o salto entre as duas colunas (ou linhas) vizinhas com o
salto típico logo ao lado. Razão perto de 1 = contínuo; acima de ~2,5 = quebra
visível, que vem das peças e não dá para corrigir com ajuste de tom.
"""
import sys

import numpy as np
from PIL import Image

ARTE = sys.argv[1] if len(sys.argv) > 1 else "public/montanha-v5.png"
LINHAS = 4

a = np.asarray(Image.open(ARTE).convert("RGB")).astype(float)
H, W, _ = a.shape
meio = W // 2
altura = H // LINHAS


def razao(salto: np.ndarray, vizinhanca: np.ndarray) -> float:
    base = max(float(vizinhanca.mean()), 0.5)
    return float(salto.mean()) / base


print(f"{ARTE}: {W}x{H}\n")
print("emendas verticais (entre a peça C1 e a C2 de cada linha)")
for n in range(LINHAS):
    faixa = slice(n * altura, (n + 1) * altura)
    salto = np.abs(a[faixa, meio - 1] - a[faixa, meio])
    vizinhanca = np.concatenate([
        np.abs(a[faixa, meio - 6] - a[faixa, meio - 5]),
        np.abs(a[faixa, meio + 5] - a[faixa, meio + 6]),
    ])
    r = razao(salto, vizinhanca)
    marca = "OK" if r < 2.5 else ("atenção" if r < 5 else "QUEBRADA")
    print(f"  L{n + 1}: salto {salto.mean():5.1f} | vizinhança {vizinhanca.mean():5.1f} | razão {r:4.1f}  {marca}")

    # onde quebra: pior quarto da altura da peça
    quartos = salto.mean(axis=1).reshape(4, -1).mean(axis=1)
    pior = int(quartos.argmax())
    if r >= 2.5:
        print(f"      pior trecho: {pior * 25}–{(pior + 1) * 25}% da altura da peça")

print("\njunções horizontais (entre uma linha e a seguinte)")
for n in range(1, LINHAS):
    y = n * altura
    salto = np.abs(a[y - 1] - a[y])
    vizinhanca = np.concatenate([np.abs(a[y - 6] - a[y - 5]), np.abs(a[y + 5] - a[y + 6])])
    r = razao(salto, vizinhanca)
    marca = "OK" if r < 2.5 else ("atenção" if r < 5 else "QUEBRADA")
    print(f"  L{n} → L{n + 1}: salto {salto.mean():5.1f} | vizinhança {vizinhanca.mean():5.1f} | razão {r:4.1f}  {marca}")
