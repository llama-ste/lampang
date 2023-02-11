import { useMutation } from "@tanstack/react-query";

import { postSignIn } from "../../../api/admin";
import { setCookie } from "../../../common/cookie";
import useToastMessage from "../../common/useToastMessage";

const usePostSignIn = (navigate) => {
  const showToast = useToastMessage();

  return useMutation((data) => postSignIn(data), {
    onError: () => showToast("error", "로그인에 실패했습니다."),
    onSuccess: (data) => {
      const {
        data: { token, name },
      } = data;

      setCookie("token", token);
      setCookie("username", name);

      navigate("/admin", { replace: true });
    },
  });
};

export default usePostSignIn;
