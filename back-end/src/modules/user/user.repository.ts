import { User } from "./user.model";
import { getRepository, Repository } from "typeorm";
import { UserEmailOutput, UserInput, UserLoginOutput, UserOutput } from "./user.dto";

export class UsersRepository {
  public static async getUsers(): Promise<UserOutput[]> {
    const repository: Repository<User> = getRepository(User);
    return await repository.find();
  }

  public static async getUserById(id: number): Promise<UserOutput> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ id });
  }

  public static async getUserByEmail(email: string): Promise<UserEmailOutput> {
    const repository: Repository<User> = getRepository(User);
    return await repository.findOne({ email }, { select: ['id', 'password', 'email', 'nivel'] });
  }

  public static async createUser(user: any) { //todo
    const repository: Repository<User> = getRepository(User);
    return await repository.insert(user);
  }

  public static async updateUser(id: number, User: any) { //todo
    const repository: Repository<User> = getRepository(User);
    return await repository.update({ id }, User);
  }

  public static async deleteUser(id: number) {
    const repository: Repository<User> = getRepository(User);
    return await repository.delete({ id });
  }
}
