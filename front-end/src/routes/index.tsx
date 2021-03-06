import { useEffect, useState } from "react";
import { getToken, removeToken } from "../services/tokens";
import {
  Switch,
  Route,
  useHistory,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import Login from "../modules/Login";
import ConfirmRegister from "../modules/ConfirmRegister";
import { Inicio } from "../modules/Inicio";
import NavBar from "../shared/components/NavBar";
import { useAppContext } from "../shared/store";
import { Perfil } from "../modules/Perfil";
import { Admin } from "../modules/Admin";
import jwtDecode from "jwt-decode";
import { GetCurrentUser } from "../services/Users";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route
          path="/confirm-register/:registerToken"
          component={ConfirmRegister}
          exact
        />
        <Route render={() => <Redirect to="/login" />}></Route>
        {/* <Route path="/inicio" component={Inicio} /> */}
      </Switch>
    </BrowserRouter>
  );
};

const AppRoutes = (nivel: any) => {
  return (
    <BrowserRouter>
      <NavBar nivel={nivel.nivel} />
      <Switch>
        <Route exact path="/inicio" component={Inicio} />
        <Route exact path="/perfil" component={Perfil} />
        {nivel.nivel === "admin" ? (
          <Route path="/admin" component={Admin} exact />
        ) : (
          <Route exact />
        )}
        <Route render={() => <Redirect to="/inicio" />}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default function Routes() {
  const history = useHistory();
  const {
    dispatch,
    state: { currentUser },
  } = useAppContext();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const { id } = jwtDecode<{
        id: number;
        email: string;
        nivel: "admin" | "user";
      }>(token);

      GetCurrentUser().then(({ data }) => {
        const { email, id, name, nivel, points, totalPoints, orders } = data;

        dispatch({
          type: "CURRENT_USER",
          payload: { id, email, nivel, name, points, totalPoints, orders },
        });
      });
    }
  }, [history.location.pathname]);

  return currentUser?.id ? (
    <AppRoutes nivel={currentUser.nivel} />
  ) : (
    <AuthRoutes />
  );
}
