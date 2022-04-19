import { ImageList, Typography, Paper } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
// @ts-ignore
import useDimensions from "react-use-dimensions";
import ModalProduto from "../../../shared/components/ModalProduto";
import { GetProducts } from "../../../services/Produtos";
import { Product } from "../../../services/Produtos/dto";

export function ListaProdutos() {
  const [ref, { width }] = useDimensions();
  const [modalOpened, setModalOpened] = useState(false);
  const [produtoModal, setProdutoModal] = useState<Product>({} as Product);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const cardWidth = 150;
  const imgSize = 136;

  const colsAmount = useMemo(() => {
    let value = Math.floor(width / (cardWidth + 2));

    if (value === 0) value = 1;

    return value;
  }, [width]);

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleOpen = (produto: Product) => {
    setProdutoModal(produto);
    setModalOpened(true);
  };

  useEffect(() => {
    GetProducts()
      .then(({ data }) => {
        setProdutos(data);
      })
      .catch(() => {
        alert("Erro!");
      });
  }, []);

  return (
    <>
      <ModalProduto
        onClose={handleClose}
        open={modalOpened}
        isEditing={false}
        produto={produtoModal}
      />
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
                width: cardWidth,
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                cursor: "pointer",
                marginBottom: 6,
              }}
              key={produto.id}
              onClick={() => handleOpen(produto)}
            >
              <img
                style={{ width: imgSize, height: imgSize, marginBottom: 14 }}
                src={`${process.env.REACT_APP_API_URL}/uploads/${produto.image}`}
                alt={produto.name}
                loading="lazy"
              />
              <Typography variant="body1" style={{ textAlign: "center" }}>
                {produto.name}
                <br />
                {produto.price} CPs
              </Typography>
            </Paper>
          ))}
        </ImageList>
      </Paper>
    </>
  );
}
