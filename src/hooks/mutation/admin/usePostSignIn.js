import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { postSignIn } from "../../../api/admin";
import { setCookie } from "../../../common/cookie";

const usePostSignIn = (navigate) => {
  return useMutation((data) => postSignIn(data), {
    onError: () => toast.error("로그인에 실패했습니다."),
    onSuccess: (data) => {
      const {
        data: {
          token,
          refresh_token,
          token_expires,
          refresh_token_expires,
          name,
        },
      } = data;

      setCookie("token", token, { expires: new Date(token_expires) });
      setCookie("refreshToken", refresh_token, {
        expires: new Date(refresh_token_expires),
      });
      setCookie("username", name);

      navigate("/admin", { replace: true });
    },
  });
};

export default usePostSignIn;
