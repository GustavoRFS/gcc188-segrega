import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  { field: 'nome', headerName: 'Produto', width: 200 },
  { field: 'preco', headerName: 'Preço', width: 100 },
  { field: 'buttons', 
    headerName: '+',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 70, 
    sortable: false,
    renderHeader: () => <AddIcon onClick={() => { addItem() }}  style={{ cursor: 'pointer'}}/>,
    renderCell: (params: GridValueGetterParams) =>
        <div>
            <EditIcon onClick={() => { editItem(params.row)}} style={{ cursor: 'pointer'}}/>
            <DeleteIcon onClick={() => { deleteItem(params.row)}} style={{ cursor: 'pointer'}}/>
        </div>
  },
];

function addItem(): void {
    alert('add')
}

function editItem(row: { nome: String }): void {
    alert(row.nome)
}

function deleteItem(row: { nome: String}): void {
    alert(row.nome)
}

const rows = [
  { id: 1, nome: 'Amazon Kindle', preco: 900 },
  { id: 2, nome: 'Amazon Alexa', preco: 1000 },
  { id: 3, nome: 'Mouse Logitech', preco: 400 }
];

export default function DataTable() {
  return (
    <div style={{ height: 213.2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
      />
    </div>
  );
}