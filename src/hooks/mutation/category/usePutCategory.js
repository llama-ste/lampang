import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { putCategory } from "../../../api/category";

const usePutCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((params) => putCategory(params), {
    onError: () => toast.error("수정에 실패했습니다."),
    onSuccess: () => {
      toast.success("수정되었습니다.");
      queryClient.invalidateQueries(["useGetCategories"]);
    },
  });
};

export default usePutCategory;
