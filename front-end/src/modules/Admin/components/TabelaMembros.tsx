import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import AddIcon from "@mui/icons-material/Add";
import { ModalUsuario } from "../../../shared/components/ModalUsuario";

export function TabelaMembros() {
  const addItem = () => {

  }
  const [modalOpened, setModalOpened] = useState(false);

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleOpen = () => {
    setModalOpened(true);
  };
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

  const rows = [
    {
      id: 1,
      nome: "Gustavo Ribeiro",
      moedasRecebidas: "1000 CPs",
    },
    {
      id: 2,
      nome: "Vitor André",
      moedasRecebidas: "800 CPs",
    },
    {
      id: 3,
      nome: "Vinicius Caputo",
      moedasRecebidas: "590 CPs",
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
