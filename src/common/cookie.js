import { Cookies } from "react-cookie";

const cookies = new Cookies();

const defaultOptions = {
  path: "/",
  sameSite: "strict",
};

export const getCookie = (name) => {
  return cookies.get(name, defaultOptions);
};

export const setCookie = (name, value, option = {}) => {
  return cookies.set(name, value, {
    ...option,
    ...defaultOptions,
  });
};

export const deleteCookie = (name) => {
  return cookies.remove(name, defaultOptions);
};
