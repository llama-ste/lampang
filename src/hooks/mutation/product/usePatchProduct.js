import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchProduct } from "../../../api/product";
import useToastMessage from "../../common/useToastMessage";

const usePatchProduct = (offEditHandler) => {
  const queryClient = useQueryClient();
  const showToast = useToastMessage();

  return useMutation((params) => patchProduct(params), {
    onError: (err) => showToast("error", "수정에 실패했습니다.", err),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetProducts"]);
      offEditHandler();
      showToast("success", "수정되었습니다.");
    },
  });
};

export default usePatchProduct;
