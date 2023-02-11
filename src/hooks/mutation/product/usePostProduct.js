import { useMutation } from "@tanstack/react-query";

import { postProduct } from "../../../api/product";
import useToastMessage from "../../common/useToastMessage";

const usePostProduct = (navigate) => {
  const showToast = useToastMessage();

  return useMutation((data) => postProduct(data), {
    onError: () => showToast("error", "등록에 실패했습니다."),
    onSuccess: () => {
      showToast("success", "등록되었습니다.");
      navigate("/admin", { replace: true });
    },
  });
};

export default usePostProduct;
