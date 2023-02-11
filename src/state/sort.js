import { atom } from "recoil";

export const sortState = atom({
  default: "idDesc",
  key: `sortState`,
});
