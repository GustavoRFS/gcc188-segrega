import { User } from "./user.model";
import { getRepository, Repository } from "typeorm";
import { UserEmailOutput, UserInput, UserLoginOutput, UserOutput } from "./user.dto";

export class UsersRepository {
  public static async getUsers(search?: any): Promise<UserOutput[]> {
    const repository: Repository<User> = getRepository(User);
    return await repository.find(search);
  }

  public static async getUserById(id: number): Promise<UserOutput> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ id });
  }

  public static async getUserByEmail(email: string): Promise<UserEmailOutput> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ email }, { select: ['id', 'password', 'email', 'nivel'] });
  }

  public static async getUserByToken(registerToken: string): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ registerToken }, { select: ['id'] });
  }

  public static async createUser(user: any) { //todo
    const repository: Repository<User> = getRepository(User);
    return await repository.insert(user);
  }

  public static async updateUser(id: number, user: any) { //todo
    const repository: Repository<User> = getRepository(User);
    return await repository.update({ id }, user);
  }

  public static async deleteUser(id: number) {
    const repository: Repository<User> = getRepository(User);
    return await repository.delete({ id });
  }
}
