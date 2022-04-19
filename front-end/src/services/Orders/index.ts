import Api from "../api";
import { Order } from "./dto";

export async function GetUserOrders(id: number) {
  return await Api().get<Order[]>(`/orders/${id}`);
}

export async function OrderProduct(productId?: number) {
  return await Api().post<Order>(`/orders`, { productId });
}
