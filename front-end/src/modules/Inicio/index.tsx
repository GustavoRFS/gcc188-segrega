import { Grid } from "@mui/material";
import { TabelaRanking } from "./components/TabelaRanking";
import { ListaProdutos } from "./components/ListaProdutos";

export function Inicio() {
  return (
    <Grid
      container
      rowSpacing={5}
      style={{ padding: "0px 60px", marginTop: 5 }}
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
        <TabelaRanking />
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
        <ListaProdutos />
      </Grid>
    </Grid>
  );
}
