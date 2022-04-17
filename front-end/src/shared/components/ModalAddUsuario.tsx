import { ModalPadrao } from "./ModalPadrao";
import { MouseEventHandler } from "react";
import { AddPerfilComponent } from "./AddPerfilComponent";

type ModalUsuarioProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
};

export function ModalAddUsuario({onClose, open}: ModalUsuarioProps) {
  return (
    <div>
      <ModalPadrao onClose={onClose} open={open}>
          <AddPerfilComponent elevation={0} onClose={onClose}  />
      </ModalPadrao>
    </div>
  );
}