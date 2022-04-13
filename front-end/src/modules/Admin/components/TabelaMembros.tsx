import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import AddIcon from "@mui/icons-material/Add";

export function TabelaMembros() {
  const addItem = () => {

  }
    
  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Membro",
      width: 442,
      sortable: false,
      renderCell: ({ row }) => (
        <ImagemENomeTabela
          imagem={row.imagem}
          nome={row.nome}
          imagemPadrao="Usuário"
          onClick={() => {
            console.log(row);
          }}
        />
      ),
    },
    {
      field: "buttons",
      headerName: "+",
      headerAlign: "center",
      disableColumnMenu: true,
      width: 30,
      sortable: false,
      renderHeader: () => (
          <AddIcon
          onClick={() => {
            addItem();
          }}
          style={{ cursor: "pointer" }}
          />
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      nome: "Gustavo Ribeiro",
      moedasRecebidas: "1000 CPs",
    },
    {
      id: 2,
      nome: "Vitor André",
      moedasRecebidas: "800 CPs",
    },
    {
      id: 3,
      nome: "Vinicius Caputo",
      moedasRecebidas: "590 CPs",
    },
  ];
  return (
    <div
      style={{
        height: "100%",
        width: 512,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        autoHeight
        disableColumnMenu
        sx={{ overflow: "none" }}
      />
    </div>
  );
}
