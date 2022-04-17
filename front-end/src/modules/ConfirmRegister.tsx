import { Button, TextField } from "../shared/components";
import { useHistory, useParams } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { setToken } from "../services/tokens";
import { useAppContext } from "../shared/store";
import api from "../services/api";

export default function ConfirmRegister() {
  const history = useHistory();

  let registerToken:any = useParams();
  let password: String;
  
  const confirm = async () => {
    try {
      console.log(password, registerToken);
      
      await api.post(`/users/confirm-user/${registerToken.registerToken}`, { password });
      
      history.push("/login");
    } catch (error) {
      alert('Ocorreu um erro. Tente novamente.')
    }
  }

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
        label="Senha"
        style={{ marginBottom: 50, width: 300 }}
        type="password"
        onChange={(a) => {
          password = a.target.value;
        }}
      />
      <Button
        onClick={async () => {
          await confirm();
        }}
        style={{ marginBottom: 20, width: 120 }}
        variant="contained"
      >
        Confirmar
      </Button>
    </div>
  );
}
