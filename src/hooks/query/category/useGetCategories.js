import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { getCategories } from "../../../api/category";
import {
  adminCategoriesState,
  categoriesState,
} from "../../../state/categories";

const useGetCategories = () => {
  const setCategories = useSetRecoilState(categoriesState);
  const setAdminCategories = useSetRecoilState(adminCategoriesState);

  return useQuery(["useGetCategories"], getCategories, {
    onError: () => toast.error("카테고리 가져오기에 실패했습니다."),
    onSuccess: (data) => {
      const res = Object.fromEntries(
        data.map((category) => [category.id, category.name])
      );

      setAdminCategories(data);
      setCategories(res);
    },
    select: (data) => {
      return data?.data?.categories;
    },
  });
};

export default useGetCategories;
