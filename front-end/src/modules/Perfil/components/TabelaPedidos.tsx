import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { OrderResponse } from "../../../services/Orders/dto";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { useAppContext } from "../../../shared/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteOrder, EditOrder, GetUserOrders } from "../../../services/Orders";
import { Tooltip } from "@mui/material";

export function TabelaPedidos() {
  const [rows, setRows] = useState<any>([]);
  const { state } = useAppContext();  

  function deleteItem(row: { id: number }): void {    
    DeleteOrder(row.id).then(({ data }) => {
      GetUserOrders(state.currentUser.id)
        .then(({ data }) => {
          alert("Pedido deletado com sucesso!")
        })
        .catch(() => {
          alert("Erro!");
        });
    });
  }

  function editItem(row: any): void {            
    EditOrder(row.id, { userId: state.currentUser.id, orderPrice: row.orderPrice, date: new Date(), productId: row.product.id }).then(({ data }) => {
      alert("Data do pedido editada com sucesso!")
      window.location.reload();
    })
    .catch(() => {
      alert("Erro!");
    });
  }
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Produto",
      width: 260,

      renderCell: ({ row }) => (
        <ImagemENomeTabela
          imagem={row.image}
          nome={row.name}
          imagemPadrao="Foto"
          onClick={() => {}}
        />
      ),
    },
    {
      field: "orderPrice",
      headerName: "Valor da Compra",
      width: 160,
      headerAlign: "center",
      align: "center",

      renderCell: ({ row }) => <>{row.orderPrice} CPs</>,
    },
    {
      field: "date",
      headerName: "Data da Compra",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "buttons",
      headerName: " ",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <Tooltip title="Atualizar data do pedido para hoje">
            <EditIcon
              onClick={() => {
                editItem(params.row);
              }}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
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

  useEffect(() => {
    if (state.currentUser.orders) {
      setRows(
        state.currentUser.orders.map((o: OrderResponse) => {          
          return {
            id: o.id,
            name: o.product.name,
            orderPrice: o.orderPrice,
            image: o.product.image,
            userId: state.currentUser.id,
            date: moment(o.date).utc().format("DD/MM/YYYY"),
            product: o.product
          };
        })
        );
      }
  }, []);

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
