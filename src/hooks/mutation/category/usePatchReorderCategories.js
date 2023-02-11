import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { patchReorderCategories } from "../../../api/category";

const usePatchReorderCategories = () => {
  const queryClient = useQueryClient();

  return useMutation((ids) => patchReorderCategories(ids), {
    onError: () => toast.error("변경에 실패했습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.success("변경 되었습니다.");
    },
  });
};

export default usePatchReorderCategories;
