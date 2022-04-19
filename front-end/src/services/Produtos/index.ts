import Api from "../api";
import { Product, CreateProductType } from "./dto";

export async function GetProducts() {
  return await Api().get<Product[]>("/products");
}
export async function DeleteProduct(id: number) {
  return await Api().delete<string>(`/products/${id}`);
}

export async function CreateProduct(produto: CreateProductType) {
  return await Api().post<any>("/products", produto, {
  });
}
