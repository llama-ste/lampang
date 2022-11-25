import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteCategory } from "../../../api/category";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteCategory(id), {
    onError: () => toast.error("삭제에 실패했습니다."),
    onSuccess: () => {
      toast.success("삭제되었습니다.");
      queryClient.invalidateQueries(["useGetCategories"]);
    },
  });
};

export default useDeleteCategory;
