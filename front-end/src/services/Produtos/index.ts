import Api from "../api";
import { Product } from "./dto";

export async function GetProducts() {
  return await Api().get<Product[]>('/products');
}
export async function DeleteProduct(id: number) {
    return await Api().delete<string>(`/products/${id}`);
}
