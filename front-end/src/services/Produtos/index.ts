import Api from "../api";
import { Product } from "./dto";

export async function GetProducts() {
  return await Api().get<Product[]>("/products");
}
export async function DeleteProduct(id: number) {
  return await Api().delete<string>(`/products/${id}`);
}
export async function CreateProduct(product: Product | FormData) {
  return await Api().post("/products", product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export async function EditProduct(id?: number, product?: Product | FormData) {
  return await Api().put(`/products/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
