import { TabelaPedidos } from "./components/TabelaPedidos";
import { PerfilComponent } from "../../shared/components/PerfilComponent";

import { Grid } from "@mui/material";

export function Perfil() {
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
            name: "gustavin",
            recivedCoins: 600,
            acumlatedCoins: 800,
            spendedCoins: 200,
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
