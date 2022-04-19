import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Path,
  Route,
  Response,
  SuccessResponse,
  Delete,
  Security,
  Header,
} from "tsoa";
import { OrdersService } from "./order.service";
import { OrderInput, OrderOutput, OrderRequest } from "./order.dto";

@Route("orders")
export class OrdersController extends Controller {
  @Get()
  @SuccessResponse("200", "Sucesso")
  @Route("/")
  public async getOrders(): Promise<OrderOutput[]> {
    const response = await OrdersService.getOrders();
    this.setStatus(200);
    return response;
  }

  @Get("/{userId}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  @Route("/")
  public async getOrderById(@Path() userId: number): Promise<OrderOutput[]> {
    const orders = await OrdersService.getOrderByUserId(userId);
    let result: any = [];
    if (!orders) {
      this.setStatus(404);
    } else {
      this.setStatus(200);
    }
    return result;
  }

  @Post("/")
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["user"])
  public async createOrder(
    @Body() order: OrderRequest,
    @Header() Authorization: string
  ): Promise<OrderOutput | string> {
    const token = Authorization.split(" ")[1];

    const response = await OrdersService.createOrder(order.productId, token);

    if (typeof response === "string") {
      this.setStatus(400);
      return response;
    }

    this.setStatus(200);

    return response;
  }

  @Put("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  @Security("jwt", ["admin"])
  public async updateOrder(
    @Path() id: number,
    @Body() order: OrderInput
  ): Promise<OrderOutput> {
    const response = await OrdersService.updateOrder(id, order);

    if (!response) {
      this.setStatus(404);
    } else {
      this.setStatus(200);
    }

    return response;
  }

  @Delete("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["admin"])
  @Response("404", "Não encontrado")
  public async deleteOrder(@Path() id: number): Promise<string> {
    const response = await OrdersService.deleteOrder(id);

    if (response.affected === 0) {
      this.setStatus(404);
      return "Pedido não encontrado";
    }

    this.setStatus(200);

    return "Pedido removido com sucesso";
  }
}
