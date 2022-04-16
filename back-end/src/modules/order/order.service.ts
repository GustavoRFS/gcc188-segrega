import { OrdersRepository } from "./order.repository";
import { OrderInput, OrderOutput } from "./order.dto";

export class OrdersService {
  public static async getOrders(): Promise<OrderOutput[]> {
    return await OrdersRepository.getOrders();
  }

  public static async getOrderById(id: number): Promise<OrderOutput> {
    return await OrdersRepository.getOrderById(id);
  }

  public static async getOrderByUserId(id: number): Promise<OrderOutput[]> {
    return await OrdersRepository.getOrderByUserId(id);
  }

  public static async createOrder(
    order: OrderInput
  ): Promise<OrderOutput> {
    const {
      raw: [{ id }],
    } = await OrdersRepository.createOrder(order);

    return await this.getOrderById(id);
  }

  public static async updateOrder(
    id: number,
    order: OrderInput
  ): Promise<OrderOutput> {
    const response = await OrdersRepository.updateOrder(id, order);

    if (response.affected === 0) {
      return null;
    }

    return await this.getOrderById(id);
  }

  public static async deleteOrder(id: number) {
    return await OrdersRepository.deleteOrder(id);
  }
}
