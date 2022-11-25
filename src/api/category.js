import client from "./client";
import { getCookie } from "../common/cookie";

export const getCategories = () => {
  return client.get("/categories");
};

export const postCategory = (data) => {
  const token = getCookie("token");

  return client.post("categories", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putCategory = (params) => {
  const token = getCookie("token");

  return client.put(
    `/categories/${params.id}`,
    {
      name: params.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCategory = (id) => {
  const token = getCookie("token");

  return client.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putReorderCategories = (ids) => {
  const token = getCookie("token");

  return client.post(
    "categories/order",
    {
      ids,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
