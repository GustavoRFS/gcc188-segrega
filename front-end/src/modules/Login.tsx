import { Button, TextField } from "../shared/components";
import { useHistory } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { setToken } from "../services/tokens";
import { useAppContext } from "../shared/store";
import { Login as LoginService } from "../services/Auth";

export default function Login() {
  const history = useHistory();
  const { dispatch } = useAppContext();

  let email: string;
  let password: string;

  const login = async () => {
    try {
      const { data } = await LoginService(email, password);

      if (data.token) {
        setToken(data.token, data.tokenExpiration);
        const { id, email, nivel } = data;

        dispatch({ type: "CURRENT_USER", payload: { id, email, nivel } });

        if (data.id) {
          history.push("/inicio");
        }
      }

      history.push("/inicio");
    } catch (error) {
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

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
        onChange={(a) => {
          email = a.target.value;
        }}
      />
      <TextField
        label="Senha"
        style={{ marginBottom: 50, width: 300 }}
        type="password"
        onChange={(a) => {
          password = a.target.value;
        }}
      />
      <Button
        onClick={async () => {
          await login();
        }}
        style={{ marginBottom: 20, width: 120 }}
        variant="contained"
      >
        Login
      </Button>
    </div>
  );
}
