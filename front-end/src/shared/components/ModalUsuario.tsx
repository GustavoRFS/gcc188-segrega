import { ModalPadrao } from "./ModalPadrao";
import { MouseEventHandler } from "react";
import { PerfilComponent } from "./PerfilComponent";

type ModalUsuarioProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
  usuario: any;
};

export function ModalUsuario({ onClose, open, usuario }: ModalUsuarioProps) {
  return (
    <div>
      <ModalPadrao onClose={onClose} open={open}>
        <PerfilComponent usuario={usuario} elevation={0} onClose={onClose} />
      </ModalPadrao>
    </div>
  );
}
