import Api from "../api";
import { Order, OrderResponse } from "./dto";

export async function GetUserOrders(id: number) {
  return await Api().get<OrderResponse[]>(`/orders/${id}`);
}

export async function OrderProduct(productId?: number) {
  return await Api().post<Order>(`/orders`, { productId });
}
