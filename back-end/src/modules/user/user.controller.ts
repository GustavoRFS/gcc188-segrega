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
} from "tsoa";
import { User } from "./user.model";
import { ValidateErrorJSON } from "../../utils/types";
import { UsersService } from "./user.service";
import { UserInput, UserOutput } from "./user.dto";

@Route("users")
export class UsersController extends Controller {
  @Get()
  @SuccessResponse("200", "Sucesso")
  @Route("/")
  public async getUsers(): Promise<UserOutput[]> {
    const response = await UsersService.getUsers();
    this.setStatus(200);
    return response;
  }

  @Get("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
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

  @Post("/")
  @SuccessResponse("200", "Sucesso")
  public async createUser(
    @Body() user: UserInput
  ): Promise<UserOutput> {
    const response = await UsersService.createUser(user);

    this.setStatus(200);

    return response;
  }

  @Put("/{id}")
  @SuccessResponse("200", "Sucesso")
  @Response("404", "Não encontrado")
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
  @Response("404", "Não encontrado")
  public async deleteUser(@Path() id: number): Promise<string> {
    const response = await UsersService.deleteUser(id);

    if (response.affected === 0) {
      this.setStatus(404);
      return "Produto não encontrado";
    }

    this.setStatus(200);

    return "Produto removido com sucesso";
  }
}
