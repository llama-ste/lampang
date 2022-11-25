import client from "./client";
import { getCookie } from "../common/cookie";

export const getProducts = (params) => {
  return client.get("/products", {
    params: {
      ...params,
      page: params.page || 1,
    },
  });
};

export const getCategoryInProducts = (params) => {
  return client.get(`/categories/${params.categoryId}/products`, {
    params: {
      ...params,
      page: params.page || 1,
    },
  });
};

export const postProduct = (data) => {
  const token = getCookie("token");

  return client.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putProduct = (params) => {
  const token = getCookie("token");

  return client.put(
    `/products/${params.id}`,
    { description: params.description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteProduct = (params) => {
  const token = getCookie("token");

  return client.delete(`/products/${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
