import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import { StatusPosicao } from "./StatusPosicao";

export function TabelaRanking() {
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
            console.log(row);
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

  const rows = [
    {
      id: 1,
      nome: "Gustavo Ribeiro",
      moedasRecebidas: "1000 CPs",
      posicaoAtual: 1,
      posicaoAntiga: 3,
    },
    {
      id: 2,
      nome: "Vitor André",
      moedasRecebidas: "800 CPs",
      posicaoAtual: 2,
      posicaoAntiga: 2,
    },
    {
      id: 3,
      nome: "Vinicius Caputo",
      moedasRecebidas: "590 CPs",
      posicaoAtual: 3,
      posicaoAntiga: 1,
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
