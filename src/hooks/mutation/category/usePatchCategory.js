import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchCategory } from "../../../api/category";
import useToastMessage from "../../common/useToastMessage";

const usePatchCategory = () => {
  const queryClient = useQueryClient();
  const showToast = useToastMessage();

  return useMutation((params) => patchCategory(params), {
    onError: () => showToast("error", "수정에 실패했습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      showToast("success", "수정되었습니다.");
    },
  });
};

export default usePatchCategory;
