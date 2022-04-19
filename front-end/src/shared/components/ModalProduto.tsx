import { ModalPadrao } from "./ModalPadrao";
import { Button, TextField } from ".";
import { MouseEventHandler, useEffect, useState, useMemo } from "react";
import { ModalConfirmacao } from "./ModalConfirmacao";
import { Avatar } from "@mui/material";

import {CreateProduct} from "../../services/Produtos";
import {useAppContext} from "../store"

type ModalProdutoProps = {
  onClose: Function;
  open: boolean;
  produto: any;
  editar?: boolean;
};

export default function ModalProduto( { onClose, open, produto = null, editar = false } : ModalProdutoProps) {
  const [modalConfirmacaoOpened, setModalConfirmacaoOpened] = useState(false);

  const isAdd = Object.keys(produto).length === 0;
  
  const { state } = useAppContext();
  
  var {nome, preco} = produto;
  var imagem = `${process.env.REACT_APP_API_URL}/uploads/${produto.image}`;

  const [image, setimage] = useState(imagem)
  const [file, setFile] = useState<any>();

  function addNewItem() {
    console.log({name : nome, price: preco});
    
    CreateProduct({name : "alo", price: 10}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

  }

  function editItem() {

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
          {(state.currentUser.nivel === "admin" && editar)  ? (
            <>
              <Avatar
                alt="#"
                src={image}
                sx={{ width: 150, height: 150 }}
              />
              <input style={{marginTop: 20, marginBottom: 20}} type={'file'}
              onChange={(a) => {
                if (a.target.files && a.target.files[0]) {
                  setimage(URL.createObjectURL(a.target.files[0]))
                  setFile(a.target.files[0])
                }
              }}
              ></input>
              
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
                  {isAdd ? "Adicionar" : "Editar"} produto
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
