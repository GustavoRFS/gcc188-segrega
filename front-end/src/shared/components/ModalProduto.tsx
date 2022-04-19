import { ModalPadrao } from "./ModalPadrao";
import { Button, TextField } from ".";
import { MouseEventHandler, useEffect, useState, useMemo } from "react";
import { ModalConfirmacao } from "./ModalConfirmacao";
import { useAppContext } from "../store";
import { Product } from "../../services/Produtos/dto";
import { Typography } from "@mui/material";
import { CreateProduct, EditProduct } from "../../services/Produtos";
import { JSONtoFormData } from "../utils/JSONtoFormData";
import { OrderProduct } from "../../services/Orders";
import { GetCurrentUser } from "../../services/Users";

type ModalProdutoProps = {
  onClose: Function;
  open: boolean;
  isEditing: boolean;
  produto?: Product | null;
};

export default function ModalProduto(props: ModalProdutoProps) {
  const { onClose, open, produto, isEditing } = props;
  const [produtoForm, setProdutoForm] = useState<Product | null>({} as Product);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    setProdutoForm(produto ? { ...produto } : null);
  }, [produto]);

  const handleChangeForm = (atributo: string) => (event: any) => {
    setProdutoForm({ ...produtoForm, [atributo]: event.target.value });
  };

  const [modalConfirmacaoOpened, setModalConfirmacaoOpened] = useState(false);

  const isAdd = useMemo(() => !produto, [produto]);
  const isAdmin = state.currentUser.nivel === "admin" && isEditing;

  function addNewItem() {
    const form = JSONtoFormData(produtoForm);

    CreateProduct(form)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        alert("Erro");
      });
  }

  function editItem() {
    const form = JSONtoFormData(produtoForm);
    EditProduct(produtoForm ? produtoForm.id : -1, form)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        alert("Erro");
      });
  }

  function resgatarItem() {
    abrirModalConfirmacao();
  }

  const fecharModalConfirmacao = () => {
    setModalConfirmacaoOpened(false);
  };

  const abrirModalConfirmacao = () => {
    console.log(state);

    setModalConfirmacaoOpened(true);
  };

  return (
    <>
      <ModalConfirmacao
        onClose={fecharModalConfirmacao}
        open={modalConfirmacaoOpened}
        textoAcao={
          <p style={{ textAlign: "center" }}>
            Deseja realmente resgatar o produto {produto?.name}? <br />
            <br /> Seu saldo restante será{" "}
            {produto?.price ? state.currentUser.points - produto?.price : ""}
          </p>
        }
        textoConfirmacao="Resgatar"
        acao={() => {
          OrderProduct(produto?.id).then(() => {
            fecharModalConfirmacao();
            onClose();
            GetCurrentUser().then(({ data }) => {
              const { email, id, name, nivel, points, totalPoints } = data;

              dispatch({
                type: "CURRENT_USER",
                payload: { id, email, nivel, name, points, totalPoints },
              });
            });
          });
        }}
      />
      <ModalPadrao onClose={() => onClose()} open={open}>
        <div
          style={{
            width: 520,
            height: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt={produto?.name}
            src={`${process.env.REACT_APP_API_URL}/uploads/${produto?.image}`}
            style={{
              width: 200,
              height: 200,
              marginBottom: 35,
            }}
          />
          {isAdmin ? (
            <>
              <TextField
                label="Nome do produto"
                style={{ marginBottom: 20, width: 300 }}
                onChange={handleChangeForm("name")}
                defaultValue={produtoForm?.name}
              />
              <TextField
                label="Preço do produto"
                style={{ marginBottom: 20, width: 300 }}
                type="number"
                onChange={handleChangeForm("price")}
                defaultValue={`${produtoForm?.price}`}
              />
              <div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2B2D42" }}
                  onClick={() => onClose()}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    if (isAdd) {
                      addNewItem();
                    } else {
                      editItem();
                    }
                  }}
                >
                  Salvar Produto
                </Button>
              </div>
            </>
          ) : (
            <>
              <Typography
                variant="h1"
                fontSize={30}
                style={{ marginBottom: 10 }}
              >
                {produto?.name}
              </Typography>
              <Typography
                variant="h1"
                fontSize={30}
                style={{ marginBottom: 30 }}
              >
                {produto?.price} CPs
              </Typography>
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    resgatarItem();
                  }}
                >
                  Resgatar Produto
                </Button>
              </div>
            </>
          )}
        </div>
      </ModalPadrao>
    </>
  );
}
