import { useEffect, useState } from "react";
import { getToken } from "../services/tokens";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "../modules/Login";
import Inicio from "../modules/Inicio";
import NavBar from "../shared/components/NavBar";
import api from "../services/api";
import { useAppContext } from "../shared/store";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
    </Switch>
  );
};

const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/inicio" component={Inicio} />
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