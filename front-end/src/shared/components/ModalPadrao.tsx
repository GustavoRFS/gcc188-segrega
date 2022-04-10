import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode, MouseEventHandler } from "react";

type ModalPadraoProps = {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
};

export function ModalPadrao(props: ModalPadraoProps) {
  const { children, onClose, open } = props;

  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            background: "#1793A6",
            borderEndStartRadius: 10,
            borderBlockColor: "#1793A6",
            height: 20,
            width: 20,
            color: "#fff",
            ":hover": {
              color: "#1793A6",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <DialogContent style={{ background: "#fff" }}>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
