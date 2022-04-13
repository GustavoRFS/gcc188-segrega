import { UsersRepository } from "./user.repository";
import { UserInput, UserOutput } from "./user.dto";

export class UsersService {
  public static async getUsers(): Promise<UserOutput[]> {
    return await UsersRepository.getUsers();
  }

  public static async getUserById(id: number): Promise<UserOutput> {
    return await UsersRepository.getUserById(id);
  }

  public static async createUser(
    User: UserInput
  ): Promise<UserOutput> {
    const {
      raw: [{ id }],
    } = await UsersRepository.createUser(User);

    return await this.getUserById(id);
  }

  public static async updateUser(
    id: number,
    user: UserInput
  ): Promise<UserOutput> {
    const response = await UsersRepository.updateUser(id, user);

    if (response.affected === 0) {
      return null;
    }

    return await this.getUserById(id);
  }

  public static async deleteUser(id: number) {
    return await UsersRepository.deleteUser(id);
  }
}
