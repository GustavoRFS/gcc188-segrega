import { Product } from "./products.model";
import { ProductsRepository } from "./products.repository";
import { ProductInput } from "./products.dto";

export class ProductsService {
  public static async getProducts() {
    return await ProductsRepository.getProducts();
  }

  public static async getProductById(id: number) {
    return await ProductsRepository.getProductById(id);
  }

  public static async createProduct(product: ProductInput) {
    const {
      raw: [{ id }],
    } = await ProductsRepository.createProduct(product);

    return await this.getProductById(id);
  }

  public static async updateProduct(id: number, product: ProductInput) {
    const response = await ProductsRepository.updateProduct(id, product);

    if (response.affected === 0) {
      return null;
    }

    return await this.getProductById(id);
  }

  public static async deleteProduct(id: number) {
    return await ProductsRepository.deleteProduct(id);
  }
}
