import React, { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { StatusPosicao } from "./StatusPosicao";
import { ModalUsuario } from "../../../shared/components/ModalUsuario";
import api from "../../../services/api";

export function TabelaRanking() {
  const [rows, setRows] = React.useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [membro, setMembro] = React.useState({});

  let currentUser: any = {}

  const handleClose = () => {
    setMembro({})
    setModalOpened(false);
  };

  const handleOpen = () => {
    setMembro(currentUser)
    setModalOpened(true);
  };

  api.get("/users").then((users:any) => {
    setRows(users.data.map((user:any, index: number) => {
      return {
        id: user.id,
        nome: user.name,
        email: user.email,
        moedasRecebidas: user.points,
        moedasTotais: user.totalPoints,
        moedasGastas: user.totalPoints - user.points,
        posicaoAtual: index + 1,
        posicaoAntiga: index + 1,
      }
    }))
  })

  const columns: GridColDef[] = [
    {
      field: "posicao",
      headerName: "Posição",
      width: 80,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <StatusPosicao
          posicaoAtual={row.posicaoAtual}
          posicaoAntiga={row.posicaoAntiga}
        />
      ),
    },
    {
      field: "nome",
      headerName: "Membro",
      width: 280,
      sortable: false,
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
      field: "moedasRecebidas",
      headerName: "Moedas Recebidas",
      width: 150,
      headerAlign: "center",
      align: "center",
      sortable: false,
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
