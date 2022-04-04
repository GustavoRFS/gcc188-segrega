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
} from "tsoa";
import { Product } from "./products.model";
import { ValidateErrorJSON } from "../../utils/types";
import { ProductsService } from "./products.service";
import { ProductInput } from "./products.dto";

@Route("products")
export class ProductsController extends Controller {
  @Get()
  @SuccessResponse("200", "Sucesso")
  @Route("/")
  public async getProducts(): Promise<Product[]> {
    const response = await ProductsService.getProducts();
    this.setStatus(200);
    return response;
  }

  @Get("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  @Route("/")
  public async getProductById(@Path() id: number): Promise<Product> {
    const response = await ProductsService.getProductById(id);
    if (!response) {
      this.setStatus(404);
    } else {
      this.setStatus(200);
    }
    return response;
  }

  @Post("/")
  @SuccessResponse("200", "Sucesso")
  public async createProduct(@Body() product: ProductInput): Promise<Product> {
    const response = await ProductsService.createProduct(product);

    this.setStatus(200);

    return response;
  }

  @Put("/{id}")
  @SuccessResponse("200", "Sucesso")
  public async updateProduct(
    @Path() id: number,
    @Body() product: Product
  ): Promise<Product> {
    const response = await ProductsService.updateProduct(id, product);
    this.setStatus(200);
    return response.raw;
  }

  @Delete("/{id}")
  @SuccessResponse("200", "Sucesso")
  public async deleteProduct(@Path() id: number) {
    const response = await ProductsService.deleteProduct(id);
    this.setStatus(200);
    return response.raw;
  }
}
