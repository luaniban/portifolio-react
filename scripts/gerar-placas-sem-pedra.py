"""Cria as placas da trajetória com uma base fina e previsível de grama.

As artes originais continuam intactas. A ilha de pedra e o gramado volumoso
originais são removidos; os postes são preservados e recebem uma única faixa
estreita de grama. O recorte comum mantém as quatro placas na mesma escala.
"""

import glob
import os

from PIL import Image, ImageFilter


ORIGEM = "public/trajetoria"
DESTINO = "public/trajetoria-sem-pedra"
DESTINO_WEB = os.path.join(DESTINO, "web")
GRAMA = os.path.join(DESTINO, "grama-base-v1.png")
LARGURAS = (540, 1063)


def caixa_comum(imagens):
    caixas = [
        imagem.getchannel("A").point(lambda alpha: 255 if alpha > 16 else 0).getbbox()
        for imagem in imagens
    ]
    return (
        min(caixa[0] for caixa in caixas),
        min(caixa[1] for caixa in caixas),
        max(caixa[2] for caixa in caixas),
        max(caixa[3] for caixa in caixas),
    )


def limpar_rgb_transparente(imagem):
    pixels = imagem.load()
    largura, altura = imagem.size
    for y in range(altura):
        for x in range(largura):
            vermelho, verde, azul, alpha = pixels[x, y]
            if alpha == 0 and (vermelho or verde or azul):
                pixels[x, y] = (0, 0, 0, 0)
    return imagem


def preparar_grama():
    grama = Image.open(GRAMA).convert("RGBA")
    caixa = grama.getchannel("A").point(lambda alpha: 255 if alpha > 16 else 0).getbbox()
    return grama.crop(caixa)


def substituir_base(imagem, grama):
    largura, altura = imagem.size
    inicio_base = round(altura * 0.67)
    topo_grama = round(altura * 0.705)
    resultado = imagem.copy()
    pixels = resultado.load()

    # Depois da madeira, conserva somente os dois postes marrons. Toda a
    # vegetação e toda a pedra originais saem para não criar uma segunda ilha.
    for y in range(inicio_base, altura):
        for x in range(largura):
            vermelho, verde, azul, alpha = pixels[x, y]
            posicao_x = x / largura
            dentro_dos_postes = 0.1 <= posicao_x <= 0.29 or 0.71 <= posicao_x <= 0.9
            eh_poste = (
                y < topo_grama
                and alpha > 0
                and dentro_dos_postes
                and vermelho > 28
                and vermelho > verde * 1.02
                and vermelho > azul * 1.05
            )
            if not eh_poste:
                pixels[x, y] = (0, 0, 0, 0)

    largura_grama = round(largura * 0.94)
    altura_grama = round(grama.height * largura_grama / grama.width)
    faixa = grama.resize((largura_grama, altura_grama), Image.Resampling.LANCZOS)
    esquerda = (largura - largura_grama) // 2
    resultado.alpha_composite(faixa, (esquerda, topo_grama))
    return limpar_rgb_transparente(resultado)


def main():
    os.makedirs(DESTINO, exist_ok=True)
    os.makedirs(DESTINO_WEB, exist_ok=True)

    caminhos = sorted(glob.glob(os.path.join(ORIGEM, "*.png")))
    grama = preparar_grama()
    imagens = [substituir_base(Image.open(caminho).convert("RGBA"), grama) for caminho in caminhos]
    caixa = caixa_comum(imagens)
    largura_comum = caixa[2] - caixa[0]
    altura_comum = caixa[3] - caixa[1]
    print(f"recorte comum sem pedras: {caixa}, {largura_comum}x{altura_comum}")

    for caminho, imagem in zip(caminhos, imagens):
        nome = os.path.splitext(os.path.basename(caminho))[0]
        placa = imagem.crop(caixa)
        placa.putalpha(placa.getchannel("A").point(lambda alpha: 255 if alpha >= 240 else alpha))
        placa.save(os.path.join(DESTINO, f"{nome}.png"), "PNG", optimize=True)

        for largura in LARGURAS:
            largura = largura or placa.width
            altura = round(placa.height * largura / placa.width)
            web = placa.resize((largura, altura), Image.Resampling.LANCZOS)
            if largura < placa.width:
                web = web.filter(ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=2))
            saida = os.path.join(DESTINO_WEB, f"{nome}-{largura}.webp")
            web.save(saida, "WEBP", quality=90, method=6)
            print(f"{saida}: {largura}x{altura}, {os.path.getsize(saida) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
