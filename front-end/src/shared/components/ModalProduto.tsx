import ModalPadrao from './ModalPadrao';
import CategoryIcon from '@mui/icons-material/Category';
import { Button, TextField } from '.';

export default function ModalProduto(props: any) {
  const { onClose,  open, produto } = props;
  
  const isAdd = !produto;
  const isAdmin = false; //TODO: Aqui vai ter a verificação

  let nome = (produto || {}).nome;
  let preco = (produto || {}).preco;

  function addNewItem() {
    alert(JSON.stringify({ nome, preco}));
  }

  function editItem() {
    alert(JSON.stringify({ nome, preco}));
  }

  function resgatarItem() {
    alert(JSON.stringify({ nome, preco}));
  }

  return (
    <div>
      <ModalPadrao onClose={() => { onClose() } } open={open}>
        <div style={{
            width: 520,
            height: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            { isAdmin ?
                <>
                    <CategoryIcon style={{
                        fontSize: 175,
                        marginBottom: 35
                    }}/>
                    <TextField
                        label="Nome do produto"
                        style={{ marginBottom: 20, width: 300 }}
                        onChange={(a) => { nome = a.target.value }}
                        defaultValue={nome}
                        />
                    <TextField
                        label="Preço do produto"
                        style={{ marginBottom: 20, width: 300 }}
                        type="number"
                        onChange={(a) => { preco = a.target.value }}
                        defaultValue={preco}
                    />
                    <div>
                        <Button variant='contained' 
                            style={{ backgroundColor: '#2B2D42' }}
                            onClick={() => { onClose() }}
                        >Cancelar</Button>
                        <Button
                            variant='contained'
                            style={{marginLeft: 8}}
                            onClick={() => { 
                                if (isAdd) {
                                    addNewItem();
                                } else {
                                    editItem();
                                }
                            }}
                        >Salvar Produto</Button>
                    </div>
                </>
                : 
                <>
                    <CategoryIcon style={{
                        fontSize: 175,
                        marginBottom: 35
                    }}/>
                    <h1 style={{marginBottom: 0}}>{nome}</h1>
                    <h2>{preco} CPs</h2>
                    <div>
                        <Button
                            variant='contained'
                            onClick={() => { resgatarItem() } }
                        >Resgatar Produto</Button>
                    </div>
                </>
            }
        </div>
      </ModalPadrao>
    </div>
  );
}