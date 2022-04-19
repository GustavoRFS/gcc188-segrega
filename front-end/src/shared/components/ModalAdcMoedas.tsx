import { ModalPadrao } from "./ModalPadrao";
import { Button, TextField } from ".";
import { MouseEventHandler } from "react";
import api from "../../services/api";
import { EditUser } from "../../services/Users";

type ModalAdcMoedasProps = {
  onClose: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  open: boolean;
  usuario: any;
};

export function ModalAdcMoedas(props: ModalAdcMoedasProps) {
  const { onClose, open } = props;

  let moedas: number = 0;

  const addMoedas = async () => {
    props.usuario.recivedCoins += moedas;
    props.usuario.acumulatedCoins += moedas;
    const user = {
      name: props.usuario.name,
      email: props.usuario.email,
      points: props.usuario.recivedCoins,
      totalPoints: props.usuario.acumulatedCoins,
    };
    await EditUser(props.usuario.id, user);
    alert("Moedas inseridas com sucesso!");
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
            onChange={(m) => {
              moedas = Number(m.target.value);
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
