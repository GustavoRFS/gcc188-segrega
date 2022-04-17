import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import AddIcon from "@mui/icons-material/Add";
import { ModalUsuario } from "../../../shared/components/ModalUsuario";
import api from "../../../services/api";
import React from "react";

export function TabelaMembros() {
  const addItem = () => {

  }
  const [modalOpened, setModalOpened] = useState(false);
  const [membro, setMembro] = React.useState({});
  const [rows, setRows] = React.useState([]);

  let currentUser: any = {}

  const handleClose = () => {
    setMembro({})
    setModalOpened(false);
  };

  const handleOpen = () => {
    setMembro(currentUser)
    setModalOpened(true);
  };
  
  if (rows.length === 0) {
    api.get("/users").then((users:any) => {      
      setRows(users.data.map((u:any) => {
        return {
          id: u.id,
          nome: u.name,
          email: u.email,
          moedasRecebidas: u.points,
          moedasTotais: u.totalPoints,
          moedasGastas: u.totalPoints - u.points
        }
      })) 
    });
  }

  const columns: GridColDef[] = [
    {
      field: "nome",
      headerName: "Membro",
      width: 442,
      sortable: true,
      renderCell: ({ row }) => (
        <ImagemENomeTabela
          imagem={row.imagem}
          nome={row.nome}
          imagemPadrao="Usuário"
          onClick={() => {
            currentUser = {
              id: row.id,
              name: row.nome,
              email: row.email,
              recivedCoins: row.moedasRecebidas,
              acumulatedCoins: row.moedasTotais,
              spendedCoins: row.moedasGastas,
            }            
            handleOpen();
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
            handleOpen();
          }}
          style={{ cursor: "pointer" }}
          />
      ),
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
      <ModalUsuario
        onClose={handleClose}
        open={modalOpened}
        usuario={membro}
      />
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
