import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { GetUserOrders } from "../../../services/Orders";
import { Order } from "../../../services/Orders/dto";
import { getUser } from "../../../services/tokens";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { useAppContext } from "../../../shared/store";

let requested = false;
export function TabelaPedidos() {
  const [rows, setRows] = useState<Order[]>([] as Order[]);
  const { state } = useAppContext();

  const columns: GridColDef[] = [
    {
      field: "name",
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
      field: "orderPrice",
      headerName: "Valor da Compra",
      width: 160,
      headerAlign: "center",
      align: "center",

      renderCell: ({ row }) => <>{row.preco} CPs</>,
    },
    {
      field: "date",
      headerName: "Data da Compra",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
  ];
  const user: any = getUser();

  useEffect(() => {
    GetUserOrders(state.currentUser.id).then(({ data }) => {
      setRows(
        data.map((o: Order) => {
          return {
            orderPrice: o.orderPrice,
            productId: o.productId,
            userId: o.userId,
            date: moment(o.date).utc().calendar(),
          };
        })
      );
    });
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
