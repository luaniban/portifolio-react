"""Gera as miniaturas das telas de projeto usadas nos nichos da montanha.

Uma captura de 2880 px vira uma tela de ~265 px no site. Deixando para o
otimizador do Next (compressão 75 e redução em duas etapas, servidor e
navegador), o texto e as linhas finas da interface ficam borrados. Aqui a
redução é feita de uma vez, com Lanczos, e uma nitidez leve devolve o contorno
que a redução amacia. Duas larguras: tela comum e retina (inclui o zoom do hover).

Rodar de novo sempre que trocar uma imagem em public/projects.
"""
import glob
import os

from PIL import Image, ImageFilter

ORIGEM = "public/projects"
DESTINO = "public/projects/miniaturas"
LARGURAS = (360, 720)

os.makedirs(DESTINO, exist_ok=True)

for caminho in sorted(glob.glob(os.path.join(ORIGEM, "*.png"))):
    nome = os.path.splitext(os.path.basename(caminho))[0]
    original = Image.open(caminho).convert("RGB")

    for largura in LARGURAS:
        altura = round(original.height * largura / original.width)
        img = original.resize((largura, altura), Image.LANCZOS)
        img = img.filter(ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=2))
        saida = os.path.join(DESTINO, f"{nome}-{largura}.webp")
        img.save(saida, "WEBP", quality=92, method=6)
        print(f"{saida}: {largura}x{altura}, {os.path.getsize(saida) / 1024:.0f} KB")
