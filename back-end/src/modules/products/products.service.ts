import { ProductsRepository } from "./products.repository";
import { ProductInput, ProductOutput } from "./products.dto";

export class ProductsService {
  public static async getProducts(): Promise<ProductOutput[]> {
    return await ProductsRepository.getProducts();
  }

  public static async getProductById(id: number): Promise<ProductOutput> {
    return await ProductsRepository.getProductById(id);
  }

  public static async createProduct(
    product: ProductInput
  ): Promise<ProductOutput> {
    const {
      raw: [{ id }],
    } = await ProductsRepository.createProduct(product);

    return await this.getProductById(id);
  }

  public static async updateProduct(
    id: number,
    product: ProductInput
  ): Promise<ProductOutput> {
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
