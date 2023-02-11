import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { patchProduct } from "../../../api/product";

const usePatchProduct = (offEditHandler) => {
  const queryClient = useQueryClient();

  return useMutation((params) => patchProduct(params), {
    onError: () => toast.error("수정에 실패했습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetProducts"]);
      offEditHandler();
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.success("수정되었습니다.");
    },
  });
};

export default usePatchProduct;
