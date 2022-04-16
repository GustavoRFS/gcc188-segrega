import { ModalPadrao } from "./ModalPadrao";
import { Button, TextField } from ".";
import { MouseEventHandler } from "react";

type ModalAdcMoedasProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
};

export function ModalAdcMoedas(props: ModalAdcMoedasProps) {
  const { onClose, open } = props;

  return (
    <div>
      <ModalPadrao onClose={onClose} open={open}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 18,
              marginTop: 30,
              marginBottom: 20,
              width: "80%",
              textAlign: "center",
            }}
          >
            Digite quantas moedas deseja adicionar para Gustavo Ribeiro
          </h1>
          <TextField type="number" label="Número de Moedas"></TextField>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#2B2D42",
                marginRight: 20,
                width: 165,
              }}
              onClick={onClose}
            >
              {" "}
              Cancelar{" "}
            </Button>
            <Button
              variant="contained"
              style={{ width: 165 }}
              onClick={onClose}
            >
              {" "}
              Adicionar moedas{" "}
            </Button>
          </div>
        </div>
      </ModalPadrao>
    </div>
  );
}
