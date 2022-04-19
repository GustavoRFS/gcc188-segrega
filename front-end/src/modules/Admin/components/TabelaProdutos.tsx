import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ModalProduto from "../../../shared/components/ModalProduto";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";

import { GetProducts } from "../../../services/Produtos";
import { Product } from "../../../services/Produtos/dto";

export function TabelaProdutos() {
  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState({});
  const [produtos, setProdutos] = useState<Product[]>([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setProduto({});
    setOpen(false);
  };

  useEffect(() => {
    GetProducts()
      .then(({ data }) => {
        setProdutos(data);
      })
      .catch(() => {
        alert("Erro!");
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Produto",
      width: 300,
      renderCell: ({ row }) => (
        <ImagemENomeTabela
          imagem={`${process.env.REACT_APP_API_URL}/uploads/${row.image}`}
          nome={row.name}
          imagemPadrao="Foto"
          onClick={() => {
            console.log(row);
          }}
        />
      ),
    },
    {
      field: "preco",
      headerName: "Preço",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => <>{row.price} CPs</>,
    },
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

  function deleteItem(row: { name: String }): void {
    alert(row.name);
  }

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
        rows={produtos}
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
