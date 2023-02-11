import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { patchCategory } from "../../../api/category";

const usePatchCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((params) => patchCategory(params), {
    onError: () => toast.error("수정에 실패했습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.success("수정되었습니다.");
    },
  });
};

export default usePatchCategory;
