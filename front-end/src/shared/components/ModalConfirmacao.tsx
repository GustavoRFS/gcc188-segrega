import { MouseEventHandler } from "react";
import { Typography } from "@mui/material";
import { ModalPadrao } from "./ModalPadrao";
import { Button } from ".";

type ModalConfirmacaoProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
  textoAcao: string;
  textoConfirmacao: string;
  acao: Function;
};

export function ModalConfirmacao({
  onClose,
  open,
  textoAcao,
  acao,
}: ModalConfirmacaoProps) {
  return (
    <ModalPadrao onClose={onClose} open={open}>
      <Typography variant="body1">{textoAcao}</Typography>
      <Button variant="contained" color="secondary">
        Cancelar
      </Button>
    </ModalPadrao>
  );
}
