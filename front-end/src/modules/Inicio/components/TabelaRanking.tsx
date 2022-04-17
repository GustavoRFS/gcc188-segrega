import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { StatusPosicao } from "./StatusPosicao";
import { ModalUsuario } from "../../../shared/components/ModalUsuario";
import api from "../../../services/api";

let users:any;

const get = async () => {
  users = (await api.get("/users/top")).data;
}

get()

export function TabelaRanking() {
  let rows = users.map((user:any, index: number) => {
    return {
      id: user.id,
      nome: user.name,
      moedasRecebidas: user.totalPoints,
      posicaoAtual: index + 1,
      posicaoAntiga: index + 1,
    }
  })
  const [modalOpened, setModalOpened] = useState(false);

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleOpen = () => {
    setModalOpened(true);
  };

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
        usuario={{
          name: "gustavin",
          recivedCoins: 600,
          acumlatedCoins: 800,
          spendedCoins: 200,
        }}
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
