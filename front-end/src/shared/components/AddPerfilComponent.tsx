import { Paper, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { Button, TextField } from ".";
import { MouseEventHandler, useEffect } from "react";
import api from "../../services/api";
import { InviteUser } from "../../services/Users";
import { UserRequest } from "../../services/Users/dto";

type UserProps = {
  elevation?: 0 | 5;
  onClose?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: 480,
  maxWidth: "90vw",
  lineHeight: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export function AddPerfilComponent({ elevation = 5 }: UserProps) {
  let usuario: UserRequest = {} as UserRequest;
  const inviteUser = () => {
    if (usuario.name && usuario.email && usuario.points) {
      usuario.totalPoints = usuario.points;
      InviteUser(usuario)
        .then(() => {
          alert("Convite enviado com sucesso!");
        })
        .catch(() => {
          alert("Ocorreu um erro. Verifique os dados e tente novamente");
        });
    } else {
      alert("Verifique os campos");
    }
  };

  return (
    <div>
      <Item elevation={elevation}>
        <Avatar
          alt="Remy Sharp"
          src={require("../../assets/Logo.svg")}
          sx={{ width: 150, height: 150 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TextField
            style={{ marginBottom: 20 }}
            label="Nome do Usuário"
            onChange={(data) => {
              usuario.name = data.target.value;
            }}
          />
          <TextField
            style={{ marginBottom: 20 }}
            label="Email do Usuário"
            type="email"
            onChange={(data) => {
              usuario.email = data.target.value;
            }}
          ></TextField>
          <TextField
            style={{ marginBottom: 20 }}
            label="Pontos do Usuário"
            onChange={(data) => {
              usuario.points = Number(data.target.value);
            }}
          />
          <Button variant="contained" onClick={inviteUser}>
            Cadastrar Usuário
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            flexWrap: "wrap",
          }}
        ></div>
      </Item>
    </div>
  );
}
