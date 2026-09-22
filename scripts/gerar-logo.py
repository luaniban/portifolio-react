"""Gera o logo do header (avatar) em vários tamanhos, já recortado.

O header mostra o avatar num círculo de 32 px. Antes, o recorte era feito no
CSS (scale 1.2) em cima de uma versão de 64 ou 128 px: ao ampliar o navegador
(Ctrl + scroll) a partir de ~300%, a imagem era esticada e embaçava. Aqui o
recorte vai para o arquivo e saem versões até 384 px, para o navegador escolher
pela densidade da tela, inclusive com zoom.

Rodar de novo sempre que trocar public/avatar-logo.png.
"""
from PIL import Image, ImageFilter

ORIGEM = "public/avatar-logo.png"
LARGURAS = (64, 128, 256, 384)

# o mesmo recorte do antigo scale(1.2) com origem em 50% x 46%
ESCALA, ORIGEM_X, ORIGEM_Y = 1.2, 0.5, 0.46

avatar = Image.open(ORIGEM).convert("RGBA")
w, h = avatar.size
x0 = (ORIGEM_X - ORIGEM_X / ESCALA) * w
y0 = (ORIGEM_Y - ORIGEM_Y / ESCALA) * h
lado = w / ESCALA
recorte = avatar.crop((round(x0), round(y0), round(x0 + lado), round(y0 + lado)))

for largura in LARGURAS:
    img = recorte.resize((largura, largura), Image.LANCZOS)
    img = img.filter(ImageFilter.UnsharpMask(radius=0.6, percent=60, threshold=2))
    saida = f"public/avatar-logo-{largura}.webp"
    img.save(saida, "WEBP", quality=92, method=6)
    print(saida, img.size)
