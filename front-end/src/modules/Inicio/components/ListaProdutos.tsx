import { ImageList, Typography, Paper } from "@mui/material";
import { useMemo, useState,useEffect } from "react";
// @ts-ignore
import useDimensions from "react-use-dimensions";
import ModalProduto from "../../../shared/components/ModalProduto";
import { GetProducts } from "../../../services/Produtos";
import { Product } from "../../../services/Produtos/dto";

export function ListaProdutos() {
  const [ref, { width }] = useDimensions();
  const [modalOpened, setModalOpened] = useState(false);
  const [produtos, setProdutos] = useState<Product[]>([]);
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
                style={{ width: 120, height:180, marginBottom: 14 }}
                src={`${process.env.REACT_APP_API_URL}/uploads/${produto.image}`}
                alt={produto.name}
                loading="lazy"
              />
              <Typography variant="body1" style={{ textAlign: "center" }}>
                {produto.name}
                <br />
                {produto.price}
              </Typography>
            </Paper>
          ))}
        </ImageList>
      </Paper>
    </>
  );
}
