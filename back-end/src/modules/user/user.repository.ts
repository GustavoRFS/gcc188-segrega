import { User } from "./user.model";
import { getRepository, Repository } from "typeorm";
import { UserInput, UserOutput } from "./user.dto";

export class UsersRepository {
  public static async getUsers(): Promise<UserOutput[]> {
    const repository: Repository<User> = getRepository(User);
    return await repository.find();
  }

  public static async getUserById(id: number): Promise<UserOutput> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ id });
  }

  public static async createUser(User: UserInput) {
    const repository: Repository<User> = getRepository(User);

    return await repository.insert(User);
  }

  public static async updateUser(id: number, User: UserInput) {
    const repository: Repository<User> = getRepository(User);
    return await repository.update({ id }, User);
  }

  public static async deleteUser(id: number) {
    const repository: Repository<User> = getRepository(User);
    return await repository.delete({ id });
  }
}
