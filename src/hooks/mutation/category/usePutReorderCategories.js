import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { putReorderCategories } from "../../../api/category";

const usePutReorderCategories = () => {
  const queryClient = useQueryClient();

  return useMutation((ids) => putReorderCategories(ids), {
    onError: () => toast.error("변경에 실패했습니다."),
    onSuccess: () => {
      toast.success("변경 되었습니다.");
      queryClient.invalidateQueries(["useGetCategories"]);
    },
  });
};

export default usePutReorderCategories;
