import { ImageList, Typography, Paper } from "@mui/material";
import { useMemo, useState } from "react";
// @ts-ignore
import useDimensions from "react-use-dimensions";
import ModalProduto from "../../../shared/components/ModalProduto";

const produtos = [
  {
    id: 1,
    nome: "Amazon Kindle",
    preco: "900 CPs",
    imagem:
      "https://lh3.googleusercontent.com/ogw/ADea4I7CNdH5fJYIg9hNZDJ2OQbh5gVVzlMR6NCE-IABRpU=s32-c-mo",
  },
  {
    id: 2,
    nome: "Amazon Alexa",
    preco: "1000 CPs",
    imagem:
      "https://lh3.googleusercontent.com/ogw/ADea4I7CNdH5fJYIg9hNZDJ2OQbh5gVVzlMR6NCE-IABRpU=s32-c-mo",
  },
  {
    id: 3,
    nome: "Mouse Logitech",
    preco: "400 CPs",
    imagem:
      "https://lh3.googleusercontent.com/ogw/ADea4I7CNdH5fJYIg9hNZDJ2OQbh5gVVzlMR6NCE-IABRpU=s32-c-mo",
  },
];

export function ListaProdutos() {
  const [ref, { width }] = useDimensions();
  const [modalOpened, setModalOpened] = useState(false);

  const cardSize = 160;

  const colsAmount = useMemo(() => {
    let value = Math.floor(width / (cardSize + 2));

    if (value === 0) value = 1;

    return value;
  }, [width]);

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleOpen = () => {
    setModalOpened(true);
  };

  return (
    <>
      <ModalProduto onClose={handleClose} open={modalOpened} produto={{}} />
      <Paper
        style={{
          display: "flex",
          justifyContent: "center",
          width: 512,
          maxWidth: "98vw",
        }}
        elevation={5}
      >
        <ImageList
          ref={ref}
          sx={{ width: "96%", height: 450 }}
          cols={colsAmount}
        >
          {produtos.map((produto) => (
            <Paper
              style={{
                height: 230,
                width: 160,
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                cursor: "pointer",
                marginBottom: 6,
              }}
              key={produto.id}
              onClick={handleOpen}
            >
              <img
                style={{ width: 150, marginBottom: 14 }}
                src={`${produto.imagem}`}
                alt={produto.nome}
                loading="lazy"
              />
              <Typography variant="body1" style={{ textAlign: "center" }}>
                {produto.nome}
                <br />
                {produto.preco}
              </Typography>
            </Paper>
          ))}
        </ImageList>
      </Paper>
    </>
  );
}
