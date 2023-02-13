import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchReorderCategories } from "../../../api/category";
import useToastMessage from "../../common/useToastMessage";

const usePatchReorderCategories = () => {
  const queryClient = useQueryClient();
  const showToast = useToastMessage();

  return useMutation((ids) => patchReorderCategories(ids), {
    onError: (err) => showToast("error", "변경에 실패했습니다.", err),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["useGetCategories"]);
      showToast("success", "변경 되었습니다.");
    },
  });
};

export default usePatchReorderCategories;
