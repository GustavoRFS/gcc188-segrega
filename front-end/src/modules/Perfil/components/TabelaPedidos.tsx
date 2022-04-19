import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";

export function TabelaPedidos() {
  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Produto",
      width: 260,

      renderCell: ({ row }) => (
        <ImagemENomeTabela
          imagem={row.imagem}
          nome={row.nome}
          imagemPadrao="Foto"
          onClick={() => {}}
        />
      ),
    },
    {
      field: "preco",
      headerName: "Valor da Compra",
      width: 160,
      headerAlign: "center",
      align: "center",

      renderCell: ({ row }) => <>{row.preco} CPs</>,
    },
    {
      field: "data",
      headerName: "Data da Compra",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
  ];
  const rows = [
    { id: 1, nome: "Amazon Kindle", preco: 900, data: "03/04/2022" },
    { id: 2, nome: "Amazon Alexa", preco: 1000, data: "07/04/2022" },
    { id: 3, nome: "Mouse Logitech", preco: 400, data: "01/04/2023" },
  ];
  return (
    <div style={{ flex: 1, alignSelf: "flex-start" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        disableColumnMenu
        autoHeight
      />
    </div>
  );
}
