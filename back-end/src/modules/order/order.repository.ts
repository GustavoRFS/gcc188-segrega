import { Order } from "./order.model";
import { getRepository, Repository } from "typeorm";
import { OrderInput, OrderOutput } from "./order.dto";

export class OrdersRepository {
  public static async getOrders(): Promise<OrderOutput[]> {
    const repository: Repository<Order> = getRepository(Order);
    return await repository.find({ relations: ["product"] });
  }

  public static async getOrderById(id: number): Promise<OrderOutput> {
    const repository: Repository<Order> = getRepository(Order);
    return await repository.findOne({ where: { id }, relations: ["product"] });
  }

  public static async getOrderByUserId(userId: number): Promise<OrderOutput[]> {
    const repository: Repository<Order> = getRepository(Order);
    return await repository.find({
      relations: ["product"],
      where: { user: { id: userId } },
      order: { date: "DESC" },
    });
  }

  public static async createOrder(order: OrderInput) {
    const repository: Repository<Order> = getRepository(Order);

    return await repository.insert(order);
  }

  public static async updateOrder(id: number, order: OrderInput) {
    const repository: Repository<Order> = getRepository(Order);
    return await repository.update({ id }, order);
  }

  public static async deleteOrder(id: number) {
    const repository: Repository<Order> = getRepository(Order);
    return await repository.delete({ id });
  }
}
