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
import { UserInput, UserOutput, UserLogin, UserLoginOutput } from "./user.dto";

@Route("users")
export class UsersController extends Controller {
  @Get()
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["admin"])
  @Route("/")
  public async getUsers(): Promise<UserOutput[]> {
    const response = await UsersService.getUsers();
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
  ): Promise<UserLoginOutput> {
    const response = await UsersService.login(user);

    this.setStatus(200);

    return response;
  }

  //todo: fazer rota para apos o usuario receber email para receber a senha
  //todo: setar registerToken
  //todo: comparar o register token
  //todo: atualizar dto
  //todo: enviar email
  @Post("/send-mail")
  @SuccessResponse("200", "Sucesso")
  @Security("jwt", ["admin"])
  public async createUserAndSendMail(
    @Body() user: UserInput
  ): Promise<UserOutput> {
    const response = await UsersService.createUser(user);

    this.setStatus(200);

    return response;
  }

  @Post("/confirm/{registerToken}")
  @SuccessResponse("200", "Sucesso")
  public async confirmUser(
    @Path() registerToken: string,
    @Body() password: string
  ): Promise<UserOutput> {
    const response = await UsersService.confirmUser(registerToken, password);

    this.setStatus(200);

    return response;
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
