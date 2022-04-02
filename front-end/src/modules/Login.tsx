import { Button, TextField } from "../shared/components";
import { useHistory } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { setToken } from "../services/tokens";
import { useAppContext } from "../shared/store";

export default function Login() {
  const history = useHistory();
  const { dispatch } = useAppContext();
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={Logo} style={{ marginBottom: 50 }} alt="Logo" />

      <TextField
        label="Email"
        style={{ marginBottom: 20, width: 300 }}
        type="email"
      />
      <TextField
        label="Senha"
        style={{ marginBottom: 50, width: 300 }}
        type="password"
      />
      <Button
        onClick={() => {
          dispatch({
            type: "CURRENT_USER",
            payload: {
              name: "Gustavo",
              profilePicture: "kkkk",
              accumulatedCoins: 10,
              currentCoins: 9,
              isAdmin: false,
            },
          });
          history.push("/inicio");
        }}
        style={{ marginBottom: 20, width: 120 }}
        variant="contained"
      >
        Login
      </Button>
    </div>
  );
}
