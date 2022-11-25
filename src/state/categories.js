import { atom } from "recoil";

export const categoriesState = atom({
  default: {},
  key: `categoriesState`,
});

export const adminCategoriesState = atom({
  default: [],
  key: `adminCategoriesState`,
});
