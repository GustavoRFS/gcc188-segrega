import Cookie from "universal-cookie";

const cookie = new Cookie();

export const getToken = () => cookie.get("token");

export const removeToken = () => cookie.remove("token", { path: "/" });

export const setToken = (newToken?: string, expiresIn?: number) =>
  cookie.set("token", newToken, { maxAge: expiresIn });
