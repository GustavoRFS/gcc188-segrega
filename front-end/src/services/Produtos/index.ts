import Api from "../api";
import { Product } from "./dto";

export async function GetProducts() {
  return await Api().get<Product[]>('/products');
}
