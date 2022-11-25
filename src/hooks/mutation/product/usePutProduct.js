import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { putProduct } from "../../../api/product";

const usePutProduct = (offEditHandler) => {
  const queryClient = useQueryClient();

  return useMutation((params) => putProduct(params), {
    onError: () => toast.error("수정에 실패했습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetProducts"]);

      offEditHandler();
      toast.success("수정되었습니다.");
    },
  });
};

export default usePutProduct;
