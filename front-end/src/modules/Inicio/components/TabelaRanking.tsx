import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { StatusPosicao } from "./StatusPosicao";
import { ModalUsuario } from "../../../shared/components/ModalUsuario";
import { GetTopUsers } from "../../../services/Users";
import { User } from "../../../services/Users/dto";

export function TabelaRanking() {
  const [rows, setRows] = useState<User[]>([] as User[]);
  const [modalOpened, setModalOpened] = useState(false);
  const [membro, setMembro] = useState<User>({} as User);

  let currentUser: any = {};

  const handleClose = () => {
    setMembro({} as User);
    setModalOpened(false);
  };

  const handleOpen = () => {
    setMembro(currentUser);
    setModalOpened(true);
  };

  useEffect(() => {
    GetTopUsers()
      .then(({ data }) => {
        console.log({ data });
        setRows(data);
      })
      .catch(() => {
        alert("Erro");
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "posicao",
      headerName: "Posição",
      width: 80,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (cellData) => {
        console.log(cellData);
        const { row, id } = cellData;

        return (
          <StatusPosicao
            posicaoAtual={Number(id)}
            posicaoAntiga={row.posicaoAntiga}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Membro",
      width: 280,
      sortable: false,
      renderCell: ({ row }) => (
        <ImagemENomeTabela
          imagem={row.imagem}
          nome={row.name}
          imagemPadrao="Usuário"
          onClick={() => {
            currentUser = row;
            handleOpen();
          }}
        />
      ),
    },
    {
      field: "totalPoints",
      headerName: "Moedas Recebidas",
      width: 150,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: ({ row }) => <>{row.totalPoints} CPs</>,
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
      <ModalUsuario onClose={handleClose} open={modalOpened} usuario={membro} />
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
