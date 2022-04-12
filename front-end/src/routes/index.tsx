import { useEffect, useState } from "react";
import { getToken } from "../services/tokens";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "../modules/Login";
import { Inicio } from "../modules/Inicio";
import NavBar from "../shared/components/NavBar";
import api from "../services/api";
import { useAppContext } from "../shared/store";
import { Perfil } from "../modules/Perfil";
import { Admin } from "../modules/Admin";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      {/* <Route path="/inicio" component={Inicio} /> */}
    </Switch>
  );
};

const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/inicio" component={Inicio} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </>
  );
};

export default function Routes() {
  const history = useHistory();
  const {
    state: { currentUser },
  } = useAppContext();

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    console.log({ token });
    //TODO: Get pra rota para tentar pegar dados do usuário. Caso dê erro, limpar o token e voltar para tela de login
  }, [history.location.pathname]);

  return currentUser ? <AppRoutes /> : <AuthRoutes />;
}
