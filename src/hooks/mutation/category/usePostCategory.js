import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { postCategory } from "../../../api/category";

const usePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => postCategory(data), {
    onError: (err) => toast.error("추가에 실패했습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.success("추가되었습니다.");
    },
  });
};

export default usePostCategory;
