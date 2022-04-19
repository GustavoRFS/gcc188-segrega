import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import api from "../../../services/api";
import { getUser } from "../../../services/tokens";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";

let requested = false;
export function TabelaPedidos() {
  const [rows, setRows] = React.useState([]);

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
          onClick={() => {
            
          }}
        />
      ),
    },
    {
      field: "preco",
      headerName: "Valor da Compra",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "data",
      headerName: "Data da Compra",
      headerAlign: "center",
      align: "center",
      width: 160,
    },
  ];
  const user:any = getUser();
  if (rows.length === 0 && !requested) { 
    api.get(`/orders/${user.uid}`).then((orders: any) => {
      requested = true;
      setRows(orders.data.map((o: any) => {
        return {
          id: o.id,
          nome: o.product.name,
          preco: o.product.price,
          data: moment(o.date).utc().calendar()
        }
      }))
    });
  }

  return (
    <div style={{flex: 1, alignSelf: "flex-start",   }}>
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
