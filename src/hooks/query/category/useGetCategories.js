import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { getCategories } from "../../../api/category";
import {
  adminCategoriesState,
  categoriesState,
} from "../../../state/categories";
import useToastMessage from "../../common/useToastMessage";

const useGetCategories = () => {
  const setCategories = useSetRecoilState(categoriesState);
  const setAdminCategories = useSetRecoilState(adminCategoriesState);
  const showToast = useToastMessage();

  return useQuery(["useGetCategories"], getCategories, {
    onError: (err) =>
      showToast("error", "카테고리 가져오기에 실패했습니다.", err),
    onSuccess: (data) => {
      const res = Object.fromEntries(
        data.map((category) => [category.id, category.name])
      );

      setAdminCategories(data);
      setCategories(res);
    },
    select: (data) => {
      return data.data;
    },
  });
};

export default useGetCategories;
