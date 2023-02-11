import client from "./client";

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
  return client.post("/products", data);
};

export const patchProduct = (params) => {
  return client.patch(`/products/${params.id}`, {
    description: params.description,
  });
};

export const deleteProduct = (params) => {
  return client.delete(`/products/${params}`);
};
