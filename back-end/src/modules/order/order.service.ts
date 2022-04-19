import { OrdersRepository } from "./order.repository";
import { OrderInput, OrderOutput } from "./order.dto";
import { Order } from "./order.model";
import jwt from "jsonwebtoken";
import { ProductsService } from "../products/products.service";
import { UsersService } from "../user/user.service";

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
    productId: number,
    token: string
  ): Promise<OrderOutput | string> {
    const userId = jwt.decode(token).id;
    const { points } = await UsersService.getUserById(userId);

    const { price } = await ProductsService.getProductById(productId);

    if (points < price) {
      return "Você não tem pontos suficientes para fazer o resgate";
    }

    const order = {
      date: new Date(),
      user: { id: userId },
      product: { id: productId },
      orderPrice: price,
    };
    const {
      raw: [{ id }],
    } = await OrdersRepository.createOrder(order);

    await UsersService.updateUser(userId, { points: points - price });

    return await this.getOrderById(id);
  }

  public static async updateOrder(
    id: number,
    order: OrderInput
  ): Promise<OrderOutput> {
    const orderResult = {
      product: { id: order.productId },
      user: { id: order.userId },
      orderPrice: order.orderPrice,
      date: order.date
    }
    const response = await OrdersRepository.updateOrder(id, orderResult);

    if (response.affected === 0) {
      return null;
    }

    return await this.getOrderById(id);
  }

  public static async deleteOrder(id: number) {
    return await OrdersRepository.deleteOrder(id);
  }
}
