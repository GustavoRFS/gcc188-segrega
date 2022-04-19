import Api from "../api";
import { Order } from "./dto";

export async function GetUserOrders(id: number) {
  return await Api().get<Order[]>(`/orders/${id}`);
}
