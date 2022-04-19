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
  FormField,
  UploadedFile,
} from "tsoa";
import { Product } from "./products.model";
import { ValidateErrorJSON } from "../../utils/types";
import { ProductsService } from "./products.service";
import { ProductInput, ProductOutput } from "./products.dto";
import { saveFile } from "../../utils/files";

@Route("products")
export class ProductsController extends Controller {
  @Get()
  @SuccessResponse("200", "Sucesso")
  @Route("/")
  public async getProducts(): Promise<ProductOutput[]> {
    const response = await ProductsService.getProducts();
    this.setStatus(200);
    return response;
  }

  @Get("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  @Route("/")
  public async getProductById(@Path() id: number): Promise<ProductOutput> {
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
  public async createProduct(
    @FormField() name: string,
    @FormField() price: number,
    @UploadedFile() file?: any
  ): Promise<ProductOutput> {
    if (file) {
      await saveFile(file.buffer, file.originalname);
    }

    const response = await ProductsService.createProduct({
      name,
      price,
      image: file?.originalname,
    });

    this.setStatus(200);

    return response;
  }

  @Put("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  public async updateProduct(
    @Path() id: number,
    @FormField() name?: string,
    @FormField() price?: number,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<ProductOutput> {
    const response = await ProductsService.updateProduct(id, {
      name,
      price,
      image: file?.originalname,
    });

    if (!response) {
      this.setStatus(404);
    } else {
      this.setStatus(200);
    }

    return response;
  }

  @Delete("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  public async deleteProduct(@Path() id: number): Promise<string> {
    const response = await ProductsService.deleteProduct(id);

    if (response.affected === 0) {
      this.setStatus(404);
      return "Produto não encontrado";
    }

    this.setStatus(200);

    return "Produto removido com sucesso";
  }
}
