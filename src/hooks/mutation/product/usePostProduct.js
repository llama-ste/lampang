import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { postProduct } from "../../../api/product";

const usePostProduct = (navigate) => {
  return useMutation((data) => postProduct(data), {
    onError: () => toast.error("등록에 실패했습니다."),
    onSuccess: () => {
      toast.success("등록되었습니다.");
      navigate("/admin", { replace: true });
    },
  });
};

export default usePostProduct;
