"""Gera as placas da trajetória usadas na montanha.

As artes vêm com 1122x1402 e bastante área transparente em volta. Todas são
recortadas pela mesma caixa (a união das áreas ocupadas), para aparecerem na
mesma escala no site e o texto ter o mesmo tamanho nas quatro. A madeira e a
pedra vêm com alfa 253, quase opaco: sem isso o mascote aparece em fantasma
atrás delas. Duas larguras: tela comum e retina (inclui o zoom do hover).

Rodar de novo sempre que trocar uma placa em public/trajetoria.
"""
import glob
import os

from PIL import Image, ImageFilter

ORIGEM = "public/trajetoria"
DESTINO = "public/trajetoria/web"
LARGURAS = (540, None)  # None: largura do recorte, sem ampliar

os.makedirs(DESTINO, exist_ok=True)

caminhos = sorted(glob.glob(os.path.join(ORIGEM, "*.png")))
originais = [Image.open(caminho).convert("RGBA") for caminho in caminhos]

caixas = [img.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox() for img in originais]
caixa = (
    min(c[0] for c in caixas),
    min(c[1] for c in caixas),
    max(c[2] for c in caixas),
    max(c[3] for c in caixas),
)
print(f"recorte comum: {caixa}, {caixa[2] - caixa[0]}x{caixa[3] - caixa[1]}")

for caminho, original in zip(caminhos, originais):
    nome = os.path.splitext(os.path.basename(caminho))[0]
    placa = original.crop(caixa)
    placa.putalpha(placa.getchannel("A").point(lambda a: 255 if a >= 240 else a))

    for largura in LARGURAS:
        largura = largura or placa.width
        altura = round(placa.height * largura / placa.width)
        img = placa.resize((largura, altura), Image.LANCZOS)
        if largura < placa.width:
            img = img.filter(ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=2))
        saida = os.path.join(DESTINO, f"{nome}-{largura}.webp")
        img.save(saida, "WEBP", quality=90, method=6)
        print(f"{saida}: {largura}x{altura}, {os.path.getsize(saida) / 1024:.0f} KB")
