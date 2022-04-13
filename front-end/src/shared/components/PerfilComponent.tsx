import { Paper, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: 480,
  width: 520,
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

export function PerfilComponent() {
  return (
    <div>
      <Item elevation={5}>
        <Avatar
          alt="Remy Sharp"
          src={require("../../assets/gustavin.png")}
          sx={{ width: 150, height: 150 }}
        />
        <h3
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: 24,
          }}
        >
          <span style={{ color: "rgba(43, 45, 66, 0.7)" }}>1º </span>
          Gustavo Ribeiro
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Box>
            <Titulo>Moedas Recebidas</Titulo>
            <Pontos>600 CPS</Pontos>
          </Box>
          <Box>
            <Titulo>Moedas acumuladas</Titulo>
            <Pontos>200 CPS</Pontos>
          </Box>
          <Box>
            <Titulo>Moedas Gastas</Titulo>
            <Pontos>400 CPS</Pontos>
          </Box>
        </div>
      </Item>
    </div>
  );
}
