import { useMemo } from "react";
import Circulo from "../../../assets/circulo.svg";
import SetaPraBaixo from "../../../assets/seta-pra-baixo.svg";
import SetaPraCima from "../../../assets/seta-pra-cima.svg";

type StatusPosicaoProps = {
  posicaoAtual: number;
  posicaoAntiga: number;
};

export function StatusPosicao({
  posicaoAtual,
  posicaoAntiga,
}: StatusPosicaoProps) {
  const imagem = useMemo(() => {
    if (posicaoAtual - posicaoAntiga < 0) {
      return SetaPraCima;
    } else if (posicaoAtual - posicaoAntiga > 0) {
      return SetaPraBaixo;
    } else {
      return Circulo;
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <img
        src={imagem}
        alt="Mudança de posição"
        style={{ marginRight: 5, width: 15, height: 15 }}
      />
      <p>{posicaoAtual}</p>
    </div>
  );
}
