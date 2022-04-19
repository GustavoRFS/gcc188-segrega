import Api from "../api";
import { loginResponse } from "./dto";

export async function Login(email: string, password: string) {
  return await Api().post<loginResponse>("/users/login", { email, password });
}

export async function ConfirmRegister(registerToken: string, password: string) {
  return await Api().post(`/users/confirm-user/${registerToken}`, {
    password,
  });
}
