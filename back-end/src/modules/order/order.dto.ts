import { Product } from "../products/products.model";
import { User } from "../user/user.model";

export type OrderInput = {
  userId?: number;
  productId?: number;
  orderPrice?: number;
  date?: Date;
};

export type OrderRequest = {
  productId: number;
};

export type OrderOutput = {
  user: User;
  product: Product;
  orderPrice: number;
  date: Date;
};
