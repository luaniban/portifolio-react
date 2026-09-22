"""Mede e corrige o desalinhamento das peças redesenhadas pelo gerador.

O gerador às vezes devolve a peça com a cena um pouco encolhida ou deslocada,
deixando uma faixa sobrando numa borda. Cada peça é comparada com a sua
referência (os recortes de montanha-partes-v2): pontos em comum achados nas
duas (SIFT) dão a escala e o deslocamento, e a peça é reposicionada no quadro
da referência. O que ficar descoberto é preenchido com a própria referência.

Uso: python3 scripts/alinhar-pecas.py [pasta das peças] [pasta de saída]
"""
import glob
import os
import sys

import cv2
import numpy as np

PECAS = os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~/Downloads/partes-refeitas-v4")
SAIDA = os.path.expanduser(sys.argv[2] if len(sys.argv) > 2 else "~/Downloads/partes-refeitas-v4/alinhadas")
REFERENCIA = os.path.expanduser("~/Downloads/montanha-partes-v2")

os.makedirs(SAIDA, exist_ok=True)
sift = cv2.SIFT_create(nfeatures=6000)


def preencher(alinhada: np.ndarray, ref: np.ndarray, buraco: np.ndarray) -> np.ndarray:
    """Cobre o que a peça não alcança, disfarçando a costura.

    Faixas finas (até 4 px, a beirada descartada da própria peça) são
    reconstruídas a partir dos pixels vizinhos da peça. Faixas largas (a cena
    que o gerador empurrou para fora) usam a referência, com nitidez realçada,
    tom igualado ao da peça na divisa e 12 px de passagem suave.
    """
    distancia = cv2.distanceTransform(buraco.astype(np.uint8), cv2.DIST_L2, 5)
    largo = buraco & (cv2.dilate((distancia > 4).astype(np.uint8), np.ones((9, 9), np.uint8)) > 0)
    fino = buraco & ~largo

    saida = alinhada.copy()
    if fino.any():
        saida = cv2.inpaint(saida, fino.astype(np.uint8) * 255, 3, cv2.INPAINT_TELEA)

    if largo.any():
        refn = ref.astype(np.float32)
        refn = np.clip(refn + (refn - cv2.GaussianBlur(refn, (0, 0), 1.6)) * 1.2, 0, 255)
        dentro = (~buraco).astype(np.uint8)
        perto = cv2.distanceTransform(1 - largo.astype(np.uint8), cv2.DIST_L2, 5)
        divisa = (dentro > 0) & (perto <= 24)
        dif = (saida[divisa].astype(np.float32) - refn[divisa]).mean(axis=0) if divisa.any() else 0
        refn = np.clip(refn + dif, 0, 255)

        final = saida.astype(np.float32)
        final[largo] = refn[largo]
        faixa = (dentro > 0) & (perto <= 12)
        peso = (perto[faixa] / 12.0)[:, None]
        final[faixa] = final[faixa] * peso + refn[faixa] * (1 - peso)
        saida = final.astype(np.uint8)

    return saida


for caminho in sorted(glob.glob(os.path.join(PECAS, "l*c*.png"))):
    nome = os.path.basename(caminho).upper().replace(".PNG", "")
    peca = cv2.imread(caminho)
    ref = cv2.imread(os.path.join(REFERENCIA, f"{nome}.png"))
    h, w = ref.shape[:2]
    if peca.shape[:2] != (h, w):
        peca = cv2.resize(peca, (w, h), interpolation=cv2.INTER_LANCZOS4)

    # a referência é uma ampliação borrada: os dois lados passam por um leve
    # desfoque para os pontos compararem forma, não textura
    cinza = lambda img: cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), (0, 0), 2.0)
    kp1, d1 = sift.detectAndCompute(cinza(peca), None)
    kp2, d2 = sift.detectAndCompute(cinza(ref), None)
    pares = cv2.BFMatcher().knnMatch(d1, d2, k=2)
    bons = [m for m, n in pares if m.distance < 0.72 * n.distance]
    origem = np.float32([kp1[m.queryIdx].pt for m in bons])
    destino = np.float32([kp2[m.trainIdx].pt for m in bons])
    matriz, inliers = cv2.estimateAffinePartial2D(origem, destino, method=cv2.RANSAC, ransacReprojThreshold=3.0)
    ok = int(inliers.sum())

    escala = float(np.hypot(matriz[0, 0], matriz[1, 0]))
    giro = float(np.degrees(np.arctan2(matriz[1, 0], matriz[0, 0])))
    tx, ty = float(matriz[0, 2]), float(matriz[1, 2])

    alinhada = cv2.warpAffine(peca, matriz, (w, h), flags=cv2.INTER_LANCZOS4, borderValue=(0, 0, 0))
    # a beirada da própria peça (2 px) também sai: o gerador às vezes pinta uma
    # linha clara ou escura na última coluna, que vira um risco na emenda
    mascara = np.zeros((h, w), np.uint8)
    mascara[2:-2, 2:-2] = 255
    cobertura = cv2.warpAffine(mascara, matriz, (w, h), flags=cv2.INTER_NEAREST)
    buraco = cobertura < 128
    alinhada = preencher(alinhada, ref, buraco)

    # onde a peça (já alinhada) destoa da referência: erro médio em cinza
    erro = float(np.abs(cinza(alinhada).astype(float) - cinza(ref).astype(float))[~buraco].mean())
    sobra_base = max(0, round(h - (ty + escala * h)))
    print(f"{nome}: {ok:4d} pontos | escala {escala:.4f} giro {giro:+.2f}° desloc ({tx:+6.1f}, {ty:+6.1f}) px"
          f" | descoberto {buraco.mean() * 100:4.1f}% | erro {erro:4.1f}")
    cv2.imwrite(os.path.join(SAIDA, f"{nome.lower()}.png"), alinhada)
