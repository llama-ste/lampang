import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteProduct } from "../../../api/product";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteProduct(id), {
    onError: () => toast.error("삭제에 실패했습니다."),
    onSuccess: () => {
      toast.success("삭제되었습니다.");
      queryClient.invalidateQueries(["useGetProducts"]);
    },
  });
};

export default useDeleteProduct;
