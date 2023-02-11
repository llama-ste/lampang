import client from "./client";

export const getCategories = () => {
  return client.get("/categories");
};

export const postCategory = (data) => {
  return client.post("categories", data);
};

export const patchCategory = (params) => {
  return client.patch(`/categories/${params.id}`, {
    name: params.name,
  });
};

export const deleteCategory = (id) => {
  return client.delete(`/categories/${id}`);
};

export const patchReorderCategories = (ids) => {
  return client.patch("categories/order", {
    ids,
  });
};
