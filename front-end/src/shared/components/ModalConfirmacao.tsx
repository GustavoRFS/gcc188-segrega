import { MouseEventHandler, ReactNode } from "react";
import { Typography } from "@mui/material";
import { ModalPadrao } from "./ModalPadrao";
import { Button } from ".";

type ModalConfirmacaoProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
  textoAcao: ReactNode;
  textoConfirmacao: string;
  acao: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export function ModalConfirmacao({
  onClose,
  open,
  textoAcao,
  textoConfirmacao,
  acao,
}: ModalConfirmacaoProps) {
  return (
    <ModalPadrao onClose={onClose} open={open}>
      <div
        style={{
          width: 400,
          flexDirection: "column",
          alignItems: "center",
          display: "flex",
          paddingTop: 7,
        }}
      >
        <Typography variant="body1">{textoAcao}</Typography>
        <div
          style={{
            width: "65%",
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancelar
          </Button>
          <Button onClick={acao} variant="contained">
            {textoConfirmacao}
          </Button>
        </div>
      </div>
    </ModalPadrao>
  );
}
