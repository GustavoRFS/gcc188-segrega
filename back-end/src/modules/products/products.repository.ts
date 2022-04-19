import { Product } from "./products.model";
import { getRepository, Repository } from "typeorm";
import { ProductInput, ProductOutput } from "./products.dto";

export class ProductsRepository {
  public static async getProducts(): Promise<ProductOutput[]> {
    const repository: Repository<Product> = getRepository(Product);
    return await repository.find({
      where: { isActive: true },
      order: { price: "ASC" },
    });
  }

  public static async getProductById(id: number): Promise<ProductOutput> {
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
    return await repository.update({ id }, { isActive: false });
  }
}
