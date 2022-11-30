import axios from "axios";
import { deleteCookie } from "../common/cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const client = axios.create();
client.defaults.baseURL = API_BASE_URL;
client.defaults.headers = {
  "Content-Type": "application/json",
};

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      deleteCookie("token");
      deleteCookie("refreshToken");
      deleteCookie("username");
    }
  }
);

export default client;
