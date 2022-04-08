import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModalProduto from "../../../shared/components/ModalProduto";
import { TableRowWithImageAndName } from "../../../shared/components/TableRowWithImageAndName";

export function TabelaPedidos() {
  const [open, setOpen] = React.useState(false);
  const [produto, setProduto] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setProduto({});
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Produto",
      width: 260,

      renderCell: ({ row }) => (
        <TableRowWithImageAndName
          image={row.imagem}
          name={row.nome}
          onClick={() => {
            handleClickOpen();
          }}
        />
      ),
    },
    { field: "preco", headerName: "Valor da Compra", width: 160 },
    { field: "data", headerName: "Data da Compra", width: 160 },
  ];
  const rows = [
    { id: 1, nome: "Amazon Kindle", preco: 900, data: "03/04/2022" },
    { id: 2, nome: "Amazon Alexa", preco: 1000, data: "07/04/2022" },
    { id: 3, nome: "Mouse Logitech", preco: 400, data: "01/04/2023" },
  ];
  return (
    <div style={{ height: 213.2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        disableColumnMenu
        autoHeight
      />
      <ModalProduto
        onClose={() => {
          handleClickClose();
        }}
        open={open}
        produto={produto}
      />
    </div>
  );
}
