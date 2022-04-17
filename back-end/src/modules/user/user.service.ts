import { UsersRepository } from "./user.repository";
import { User, UserInput, UserLogin, UserLoginOutput, UserOutput } from "./user.dto";
import authConfig from '../../config/auth'
import urls from '../../config/urls'
import Mailer from '../../utils/Mailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class UsersService {
  public static async getUsers(): Promise<UserOutput[]> {
    return await UsersRepository.getUsers();
  }

  public static async getTopUsers(): Promise<UserOutput[]> {
    return await UsersRepository.getUsers({ order: { totalPoints: 'DESC' }, take: 10 });
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

  public static async getUserByToken(registerToken: string): Promise<User> {
    return await UsersRepository.getUserByToken(registerToken);
  }

  public static async createUser(
    user: UserInput
  ): Promise<UserOutput> {
    const registerToken = crypto.randomBytes(20).toString('hex');
    const {
      raw: [{ id }],
    } = await UsersRepository.createUser(Object.assign(user, { registerToken }));
    const link = `${urls.frontUrl}/confirm-register/${registerToken}`
    Mailer.sendMail(
      {
        to: user.email,
        from: 'CompGame',
        template: 'confirmEmail',
        context: { link },
        subject: 'Confirme seu cadastro',
      },
      (error) => {
        if (error) {
          console.error('Erro ao enviar email', error);
        } else {
          console.log('Email enviado com sucesso: ', user.email)
        }
      },
    );
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
      const u = await this.getUserById(userResponse.id)

      return Object.assign(u, { token, tokenExpiration: 86400 });
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

  public static async confirmUser(registerToken: string, password: string): Promise<UserOutput> {
    const response = await this.getUserByToken(registerToken)
    if (!response) {
      throw new Error("Token inválido");
    }
    password = bcrypt.hashSync(password, 10)
    response.registerToken = null
    const u = await UsersRepository.updateUser(response.id, Object.assign(response, { password }));

    return response
  }
}
