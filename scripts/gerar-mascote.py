"""Gera as versões web das poses do mascote que cai pela montanha.

Pelo otimizador do Next as poses saíam com compressão 75 e na largura do
quadro (184 px), mas o mascote aparece maior: escala de até 1,08 e, deitado na
grama, zoom de 1,55. Em telas 2x a imagem era esticada e ficava embaçada. Aqui a
redução é feita de uma vez, com Lanczos sobre o alfa pré-multiplicado (para o
contorno não escurecer), e uma nitidez leve devolve o traço que a redução
amacia. Três larguras cobrem 1x e 2x, inclusive a pose deitada com zoom.

Rodar de novo sempre que trocar uma imagem em public/mascote-poses-caindo.
"""
import glob
import os

from PIL import Image, ImageFilter

ORIGEM = "public/mascote-poses-caindo"
DESTINO = "public/mascote-poses-caindo/web"
LARGURAS = (240, 400, 640)

os.makedirs(DESTINO, exist_ok=True)

for caminho in sorted(glob.glob(os.path.join(ORIGEM, "*.png"))):
    nome = os.path.splitext(os.path.basename(caminho))[0]
    original = Image.open(caminho).convert("RGBA").convert("RGBa")

    for largura in LARGURAS:
        altura = round(original.height * largura / original.width)
        img = original.resize((largura, altura), Image.LANCZOS).convert("RGBA")
        r, g, b, alfa = img.split()
        cor = Image.merge("RGB", (r, g, b)).filter(
            ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=2)
        )
        img = Image.merge("RGBA", (*cor.split(), alfa))
        saida = os.path.join(DESTINO, f"{nome}-{largura}.webp")
        img.save(saida, "WEBP", quality=92, alpha_quality=100, method=6)
        print(f"{saida}: {largura}x{altura}, {os.path.getsize(saida) / 1024:.0f} KB")
