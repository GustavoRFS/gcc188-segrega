import Api from "../api";
import { User, UserRequest } from "./dto";

export async function GetUsers() {
  return await Api().get<User[]>("/users");
}

export async function GetTopUsers() {
  return await Api().get<User[]>("/users/top");
}

export async function InviteUser(user: UserRequest) {
  return await Api().post<User>("/users/register", user);
}

export async function EditUser(id: string, user: UserRequest) {
  return await Api().put<User>(`/users/${id}`, user);
}
