import { Product } from "../Produtos/dto";

export type Order = {
  date: string;
  orderPrice: number;
  productId: number;
  userId: number;
};

export type OrderResponse = {
  id: number;
  date: string;
  orderPrice: number;
  product: Product;
  userId: number;
};
