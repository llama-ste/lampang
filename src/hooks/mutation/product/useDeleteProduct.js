import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "../../../api/product";
import useToastMessage from "../../common/useToastMessage";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const showToast = useToastMessage();

  return useMutation((id) => deleteProduct(id), {
    onError: (err) => showToast("error", "삭제에 실패했습니다.", err),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetProducts"]);
      showToast("success", "삭제되었습니다.");
    },
  });
};

export default useDeleteProduct;
