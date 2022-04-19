import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Path,
  Route,
  Response,
  SuccessResponse,
  Delete,
  Request,
  Security,
} from "tsoa";
import { UsersService } from "./user.service";
import {
  UserInput,
  UserOutput,
  UserLogin,
  UserLoginOutput,
  UserConfirm,
  UserConfirmOutput,
} from "./user.dto";

@Route("users")
export class UsersController extends Controller {
  @Get()
  @SuccessResponse("200", "Sucesso")
  // @Security("jwt", ["user"])
  @Route("/")
  public async getUsers(): Promise<UserOutput[]> {
    const response = await UsersService.getUsers();
    this.setStatus(200);
    return response;
  }

  @Get("/top")
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["user"])
  @Route("/")
  public async getTopUsers(): Promise<UserOutput[]> {
    const response = await UsersService.getTopUsers();
    this.setStatus(200);
    return response;
  }

  @Get("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  @Security("jwt", ["admin"])
  @Route("/")
  public async getUserById(@Path() id: number): Promise<UserOutput> {
    const response = await UsersService.getUserById(id);
    if (!response) {
      this.setStatus(404);
    } else {
      this.setStatus(200);
    }
    return response;
  }

  @Post("/login")
  @SuccessResponse("200", "Sucesso")
  @Response("400", "Não encontrado")
  public async login(
    @Body() user: UserLogin
  ): Promise<UserLoginOutput | string> {
    const response = await UsersService.login(user);

    if (response) {
      this.setStatus(200);
      return response;
    } else {
      this.setStatus(403);
      return "Token de autenticação inválido";
    }
  }

  @Post("/register")
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["admin"])
  public async createUserAndSendMail(
    @Body() user: UserInput
  ): Promise<UserOutput> {
    const response = await UsersService.createUser(user);

    this.setStatus(200);

    return response;
  }

  @Post("/confirm-user/{registerToken}")
  @SuccessResponse("200", "Sucesso")
  public async confirmUser(
    @Path() registerToken: string,
    @Body() password: UserConfirm
  ): Promise<UserConfirmOutput> {
    const response = await UsersService.confirmUser(
      registerToken,
      password.password
    );

    this.setStatus(200);

    return { id: response.id };
  }

  @Put("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
  @Security("jwt", ["admin"])
  public async updateUser(
    @Path() id: number,
    @Body() user: UserInput
  ): Promise<UserOutput> {
    const response = await UsersService.updateUser(id, user);

    if (!response) {
      this.setStatus(404);
    } else {
      this.setStatus(200);
    }

    return response;
  }

  @Delete("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["admin"])
  @Response("404", "Não encontrado")
  public async deleteUser(@Path() id: number): Promise<string> {
    const response = await UsersService.deleteUser(id);

    if (response.affected === 0) {
      this.setStatus(404);
      return "Usuário não encontrado";
    }

    this.setStatus(200);

    return "Usuário removido com sucesso";
  }
}
