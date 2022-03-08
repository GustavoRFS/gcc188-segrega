import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Response,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./user.model";
import { getUsers, createUser } from "./user.service";
import { ValidateErrorJSON } from "../../utils/types";

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(@Query() firstName?: string): Promise<User[]> {
    this.setStatus(200);
    return await getUsers(firstName);
  }

  @Response<ValidateErrorJSON>(422, "Erro de validação")
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(@Body() user: User): Promise<string> {
    this.setStatus(201); // set return status 201
    createUser(user);
    return "Usuário criado com sucesso";
  }
}
