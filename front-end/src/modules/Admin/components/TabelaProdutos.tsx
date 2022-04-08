import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ModalProduto from "../../../shared/components/ModalProduto";
import { TableRowWithImageAndName } from "../../../shared/components/TableRowWithImageAndName";

export function TabelaProdutos() {
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
      width: 300,

      renderCell: ({ row }) => (
        <TableRowWithImageAndName
          image={row.imagem}
          name={row.nome}
          onClick={() => {
            console.log(row);
          }}
        />
      ),
    },
    { field: "preco", headerName: "Preço", width: 100 },
    {
      field: "buttons",
      headerName: "+",
      headerAlign: "center",
      disableColumnMenu: true,
      width: 70,
      sortable: false,
      renderHeader: () => (
        <AddIcon
          onClick={() => {
            addItem();
          }}
          style={{ cursor: "pointer" }}
        />
      ),
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <EditIcon
            onClick={() => {
              editItem(params.row);
            }}
            style={{ cursor: "pointer" }}
          />
          <DeleteIcon
            onClick={() => {
              deleteItem(params.row);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  function addItem(): void {
    handleClickOpen();
  }

  function editItem(row: any): void {
    setProduto(row);
    handleClickOpen();
  }

  function deleteItem(row: { nome: String }): void {
    alert(row.nome);
  }

  const rows = [
    { id: 1, nome: "Amazon Kindle", preco: 900 },
    { id: 2, nome: "Amazon Alexa", preco: 1000 },
    { id: 3, nome: "Mouse Logitech", preco: 400 },
  ];
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        autoHeight
        disableColumnMenu
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
