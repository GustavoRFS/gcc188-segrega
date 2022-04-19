import { Paper, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { Button, TextField } from ".";
import { MouseEventHandler, useState } from "react";
import { ModalAdcMoedas } from "./ModalAdcMoedas";
import api from "../../services/api";
import { useAppContext } from "../store/index";

type UserProps = {
  usuario: {
    name: string;
    email: string;
    id: number;
    position?: number;
    receivedCoins: number;
    acumulatedCoins: number;
    spendedCoins: number;
  };
  elevation?: 0 | 5;
  onClose?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

const Item = styled(Paper)(() => ({
  textAlign: "center",
  minHeight: 480,
  maxWidth: "90vw",
  lineHeight: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const Box = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const Titulo = styled("h4")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: 18,
  margin: 0,
  textAlign: "center",
});
const Pontos = styled("h3")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  width: 166,
  height: 48,
  fontWeight: 400,
  fontSize: 28,
  lineHeight: "30px",
  margin: 0,
});

export function PerfilComponent({
  usuario,
  elevation = 5,
  onClose,
}: UserProps) {
  const [modalOpened, setModalOpened] = useState(false);

  const { state } = useAppContext();

  const isAdm = state.currentUser.nivel === "admin";

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleOpen = () => {
    setModalOpened(true);
  };

  const deleteUser = async () => {
    await api().delete(`/users/${usuario.id}`);
    alert("Usuário excluído com sucesso!");
  };

  return (
    <div>
      <ModalAdcMoedas
        onClose={handleClose}
        open={modalOpened}
        usuario={usuario}
      />
      <Item elevation={elevation}>
        <Avatar
          alt="Remy Sharp"
          src={require("../../assets/Logo.svg")}
          sx={{ width: 150, height: 150 }}
        />
        {isAdm && onClose ? (
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
              defaultValue={usuario.name}
            />
            <TextField
              label="Email do Usuário"
              type="email"
              defaultValue={usuario.email}
            ></TextField>
          </div>
        ) : (
          <h3
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 300,
              fontSize: 24,
            }}
          >
            {usuario?.position && (
              <span style={{ color: "rgba(43, 45, 66, 0.7)" }}>
                {usuario.position}º{" "}
              </span>
            )}

            {usuario.name}
          </h3>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Titulo>Moedas Recebidas</Titulo>
            <Pontos>{usuario.receivedCoins} CPS</Pontos>
          </Box>
          <Box>
            <Titulo>Moedas acumuladas</Titulo>
            <Pontos>{usuario.acumulatedCoins} CPS</Pontos>
          </Box>
          <Box>
            <Titulo>Moedas Gastas</Titulo>
            <Pontos>{usuario.spendedCoins} CPS</Pontos>
          </Box>
          {isAdm && onClose && (
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
                onClick={deleteUser}
              >
                Excluir Usuario
              </Button>
              <Button
                variant="contained"
                style={{ width: 165 }}
                onClick={handleOpen}
              >
                Adicionar moedas
              </Button>
            </div>
          )}
        </div>
      </Item>
    </div>
  );
}
