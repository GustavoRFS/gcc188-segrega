import Api from "../api";
import { getToken } from "../tokens";
import { User, UserRequest } from "./dto";

import jwtDecode from "jwt-decode";

export async function GetUsers() {
  return await Api().get<User[]>("/users");
}

export async function GetTopUsers() {
  return await Api().get<User[]>("/users/top");
}

export async function InviteUser(user: UserRequest) {
  return await Api().post<User>("/users/register", user);
}

export async function EditUser(id: number, user: UserRequest) {
  return await Api().put<User>(`/users/${id}`, user);
}
export async function GetUserById(id: number) {
  return await Api().get<User>(`/users/${id}`);
}
export async function GetCurrentUser() {
  return await GetUserById(jwtDecode<{ id: number }>(getToken()).id);
}
