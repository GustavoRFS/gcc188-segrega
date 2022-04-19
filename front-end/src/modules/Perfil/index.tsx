import { TabelaPedidos } from "./components/TabelaPedidos";
import { PerfilComponent } from "../../shared/components/PerfilComponent";

import { Grid } from "@mui/material";
import { useAppContext } from "../../shared/store";

export function Perfil() {
  const {
    state: { currentUser: usuario },
  } = useAppContext();

  return (
    <Grid
      container
      rowSpacing={5}
      style={{ padding: "0px 60px", marginTop: 0 }}
    >
      <Grid
        item
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PerfilComponent
          usuario={{
            acumulatedCoins: usuario.points,
            receivedCoins: usuario.totalPoints,
            spendedCoins: usuario.totalPoints - usuario.points,
            name: usuario.name,
            email: usuario.name,
            id: usuario.id,
          }}
        />
      </Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={12}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TabelaPedidos />
      </Grid>
    </Grid>
  );
}
