import client from "./client";
import { getCookie } from "../common/cookie";

export const postSignIn = (data) => {
  return client.post("auth/sign_in", data);
};

export const getCoupangItem = (url) => {
  const token = getCookie("token");

  return client.get(`/products/info/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
