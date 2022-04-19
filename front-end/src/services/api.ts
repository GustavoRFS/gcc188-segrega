import axios from "axios";
import { getToken } from "./tokens";

const api = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
  });

export default api;
