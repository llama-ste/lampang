import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory } from "../../../api/category";
import useToastMessage from "../../common/useToastMessage";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const showToast = useToastMessage();

  return useMutation((id) => deleteCategory(id), {
    onError: (err) => showToast("error", "삭제에 실패했습니다.", err),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      showToast("success", "삭제되었습니다.");
    },
  });
};

export default useDeleteCategory;
