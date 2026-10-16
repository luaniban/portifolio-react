"""Cria as placas da trajetória com uma base fina e previsível de grama.

As artes originais continuam intactas. A ilha de pedra e o gramado volumoso
originais são removidos; os postes são preservados e recebem uma única faixa
estreita de grama. O recorte comum mantém as quatro placas na mesma escala.
"""

import glob
import os

from PIL import Image, ImageFilter


ORIGEM = "public/trajetoria"
DESTINO = "public/trajetoria-grama-v2"
DESTINO_WEB = os.path.join(DESTINO, "web")
GRAMA = "public/trajetoria-sem-pedra/grama-base-v1.png"
LARGURAS = (540, 1063)

# Mantém o mesmo enquadramento da versão anterior para que somente a grama
# suba em direção aos postes. Assim as tábuas, os textos e o alinhamento na
# montanha não mudam quando o novo arquivo substitui o antigo.
CAIXA_SAIDA = (33, 106, 1088, 1121)


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
    topo_grama = round(altura * 0.65)
    resultado = imagem.copy()
    pixels = resultado.load()

    # A limpeza começa abaixo da madeira e dos postes. Toda a vegetação e toda
    # a pedra originais saem para não criar uma segunda ilha sob a faixa nova.
    for y in range(inicio_base, altura):
        for x in range(largura):
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
    caixa = CAIXA_SAIDA
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
