import { UsersRepository } from "./user.repository";
import { UserInput, UserLogin, UserLoginOutput, UserOutput } from "./user.dto";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../utils/auth'
export class UsersService {
  public static async getUsers(): Promise<UserOutput[]> {
    return await UsersRepository.getUsers();
  }

  public static generateToken(params) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
  };

  public static async getUserById(id: number): Promise<UserOutput> {
    return await UsersRepository.getUserById(id);
  }

  public static async getUserByEmail(email: string): Promise<UserOutput> {
    return await UsersRepository.getUserByEmail(email);
  }

  public static async createUser(
    user: UserInput
  ): Promise<UserOutput> {
    user.password = bcrypt.hashSync(user.password, 10)
    const {
      raw: [{ id }],
    } = await UsersRepository.createUser(user);

    return await this.getUserById(id);
  }

  public static async login(
    user: UserLogin
  ): Promise<UserLoginOutput> {

    const userResponse = await UsersRepository.getUserByEmail(user.email);

    const verifyPassword = await bcrypt.compare(user.password, userResponse.password);

    if (verifyPassword) {
      const token = this.generateToken({
        uid: userResponse.id,
        email: userResponse.email,
        nivel: userResponse.nivel,
      });
      return { token, tokenExpiration: '1d' };
    }
    return null;
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
