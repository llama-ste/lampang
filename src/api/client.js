import axios from "axios";
import { deleteCookie, getCookie } from "../common/cookie";
import { toast } from "react-toastify";
import customHistory from "../router/customHistory";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const client = axios.create();
client.defaults.baseURL = API_BASE_URL;

client.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    const isGET = config.method === "get";

    if (token && !isGET) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (err) => Promise.reject(err)
);

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      deleteCookie("token");
      deleteCookie("username");
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.error("로그인을 다시 해주세요.");
      customHistory.replace("/admin/sign-in");
    }

    return Promise.reject(err);
  }
);

export default client;
