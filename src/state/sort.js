import { atom } from "recoil";

export const sortState = atom({
  default: "latest",
  key: `sortState`,
});
