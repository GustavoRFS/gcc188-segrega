import Cookie from "universal-cookie";
import jwt_decode from "jwt-decode";

const cookie = new Cookie();

export const getToken = () => cookie.get("token");

export const getUser = () => jwt_decode(cookie.get("token"));

export const removeToken = () => cookie.remove("token", { path: "/" });

export const setToken = (newToken?: string, expiresIn?: number) =>
  cookie.set("token", newToken, { maxAge: expiresIn });
