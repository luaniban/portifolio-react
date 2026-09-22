import type { CSSProperties } from "react";

export type PlacaTrajetoria = {
  imagem: string;
  texto: string;
  // Emendas das tábuas que separam data, cargo, instituição e descrição,
  // em % da altura da placa: do topo da madeira até onde começam as pernas.
  cortes: number[];
};

// Uma placa da trajetória. A arte inteira fica por baixo e, por cima, cada
// faixa de texto é recortada da mesma imagem: ao passar o mouse só aquela
// faixa aparece ampliada. O texto completo vai no alt da arte.
export default function Placa({ placa, posicao }: { placa: PlacaTrajetoria; posicao: CSSProperties }) {
  const base = `/trajetoria/web/${placa.imagem}`;
  const arte = {
    src: `${base}-540.webp`,
    srcSet: `${base}-540.webp 540w, ${base}-1063.webp 1063w`,
    sizes: "17vw",
    loading: "lazy",
    decoding: "async",
  } as const;

  return (
    <li className="placa" style={posicao}>
      {/* eslint-disable-next-line @next/next/no-img-element -- srcset das placas próprias */}
      <img className="placa-arte" {...arte} alt={placa.texto} />

      {placa.cortes.slice(0, -1).map((de, indice) => {
        const altura = placa.cortes[indice + 1] - de;
        return (
          <span key={de} className="placa-faixa" style={{ top: `${de}%`, height: `${altura}%` }} aria-hidden="true">
            <span className="placa-recorte">
              {/* eslint-disable-next-line @next/next/no-img-element -- mesmo arquivo da arte, já em cache */}
              <img
                {...arte}
                alt=""
                style={{ top: `${(-de / altura) * 100}%`, height: `${(100 / altura) * 100}%` }}
              />
            </span>
          </span>
        );
      })}
    </li>
  );
}
