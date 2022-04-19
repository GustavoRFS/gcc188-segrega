import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { OrderResponse } from "../../../services/Orders/dto";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { useAppContext } from "../../../shared/store";

export function TabelaPedidos() {
  const [rows, setRows] = useState<any>([]);
  const { state } = useAppContext();

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
  ];

  useEffect(() => {
    setRows(
      state.currentUser.orders.map((o: OrderResponse, index: number) => {
        return {
          id: index,
          name: o.product.name,
          orderPrice: o.orderPrice,
          image: o.product.image,
          userId: state.currentUser.id,
          date: moment(o.date).utc().format("DD/MM/YYYY"),
        };
      })
    );
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
