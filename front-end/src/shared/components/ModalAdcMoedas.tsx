import { ModalPadrao } from "./ModalPadrao";
import { Button, TextField } from ".";
import { MouseEventHandler, useState } from "react";
import api from "../../services/api";
import { EditUser } from "../../services/Users";

type ModalAdcMoedasProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
  usuario: any;
};

export function ModalAdcMoedas(props: ModalAdcMoedasProps) {
  const { onClose, open } = props;

  const [moedas, setMoedas] = useState(0);

  const addMoedas = async () => {
    await EditUser(props.usuario.id, {
      name: props.usuario.name,
      email: props.usuario.email,
      points: props.usuario.points + moedas,
      totalPoints: props.usuario.totalPoints + moedas,
    });
    alert("Moedas inseridas com sucesso!");
    window.location.reload();
  };
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
            Digite quantas moedas deseja adicionar para {props.usuario.name}
          </h1>
          <TextField
            type="number"
            label="Número de Moedas"
            defaultValue={`${moedas}`}
            onChange={(m) => {
              setMoedas(Number(m.target.value));
            }}
          ></TextField>
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
              Cancelar
            </Button>
            <Button
              variant="contained"
              style={{ width: 165 }}
              onClick={addMoedas}
            >
              Adicionar moedas
            </Button>
          </div>
        </div>
      </ModalPadrao>
    </div>
  );
}
