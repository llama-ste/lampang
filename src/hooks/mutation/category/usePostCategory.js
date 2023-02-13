import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCategory } from "../../../api/category";
import useToastMessage from "../../common/useToastMessage";

const usePostCategory = () => {
  const queryClient = useQueryClient();
  const showToast = useToastMessage();

  return useMutation((data) => postCategory(data), {
    onError: (err) => showToast("error", "추가에 실패했습니다.", err),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      showToast("success", "추가되었습니다.");
    },
  });
};

export default usePostCategory;
