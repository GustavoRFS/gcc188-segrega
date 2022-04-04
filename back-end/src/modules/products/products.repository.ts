import { Product } from "./products.model";
import { getRepository, Repository } from "typeorm";
import { ProductInput } from "./products.dto";

export class ProductsRepository {
  public static async getProducts() {
    const repository: Repository<Product> = getRepository(Product);
    return await repository.find();
  }

  public static async getProductById(id: number) {
    const repository: Repository<Product> = getRepository(Product);
    return await repository.findOne({ id });
  }

  public static async createProduct(product: ProductInput) {
    const repository: Repository<Product> = getRepository(Product);

    return await repository.insert(product);
  }

  public static async updateProduct(id: number, product: ProductInput) {
    const repository: Repository<Product> = getRepository(Product);
    return await repository.update({ id }, product);
  }

  public static async deleteProduct(id: number) {
    const repository: Repository<Product> = getRepository(Product);
    return await repository.delete({ id });
  }
}
