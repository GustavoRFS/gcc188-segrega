import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ImagemENomeTabela } from "../../../shared/components/ImagemENomeTabela";
import AddIcon from "@mui/icons-material/Add";
import { ModalUsuario } from "../../../shared/components/ModalUsuario";
import { ModalAddUsuario } from "../../../shared/components/ModalAddUsuario";
import { GetUsers } from "../../../services/Users";
import { User } from "../../../services/Users/dto";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalAdcMoedas } from "../../../shared/components/ModalAdcMoedas";

export function TabelaMembros() {
  const addItem = () => {};
  const [modalOpened, setModalOpened] = useState(false);
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [membro, setMembro] = useState<User>({} as User);
  const [rows, setRows] = useState<User[]>([] as User[]);

  let currentUser: any = {};

  const handleClose = () => {
    setMembro({} as User);
    setModalOpened(false);
  };

  const handleOpen = () => {
    setMembro(currentUser);
    setModalOpened(true);
  };

  const handleCloseAddModal = () => {
    setMembro({} as User);
    setAddModalOpened(false);
  };

  const handleOpenAddModal = () => {
    setMembro(currentUser);
    setAddModalOpened(true);
  };

  const editItem = (user: User) => {
    console.log(user);
  };

  const deleteItem = (user: User) => {
    console.log(user);
  };

  useEffect(() => {
    GetUsers()
      .then(({ data }) => {
        setRows(data);
      })
      .catch(() => {
        alert("Erro!");
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Membro",
      width: 442,
      sortable: true,
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
      field: "buttons",
      headerName: "+",
      headerAlign: "center",
      disableColumnMenu: true,
      width: 65,

      sortable: false,
      align: "center",
      renderHeader: () => (
        <AddIcon
          onClick={() => {
            handleOpenAddModal();
          }}
          style={{ cursor: "pointer" }}
        />
      ),
      renderCell: (params: GridValueGetterParams) => (
        <div>
          <EditIcon
            onClick={() => {
              editItem(params.row);
            }}
            style={{ cursor: "pointer" }}
          />
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
      <ModalAddUsuario onClose={handleCloseAddModal} open={addModalOpened} />
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
