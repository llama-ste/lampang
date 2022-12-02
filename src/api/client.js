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
    if (err.response.data.error_code === 40101) {
      deleteCookie("token");
      deleteCookie("refreshToken");
      deleteCookie("username");
      alert("로그인을 다시 해주세요.");
      window.location.href = "https://llamaste.site/admin/sign-in";
    }
  }
);

export default client;
