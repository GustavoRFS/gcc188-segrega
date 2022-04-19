import axios from "axios";
import { getToken } from "./tokens";

const api = () =>
  axios.create({
    baseURL: "http://localhost:5000/api" || process.env.REACT_APP_API_URL,
    headers: {
      Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
  });

export default api;
