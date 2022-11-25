import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import usePostSignIn from "../hooks/mutation/admin/usePostSignIn";
import { Button, TextField } from "@mui/material";

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate: signInMutate } = usePostSignIn(navigate);

  const {
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({ mode: "onChange" });

  const submitHandler = ({ email, password }) => {
    signInMutate({ email, password });
  };

  return (
    <FormContainer onSubmit={handleSubmit(submitHandler)}>
      <Title>관리자 로그인</Title>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "이메일은 필수입니다.",
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/,
            message: "올바르지 않은 형식의 이메일입니다.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            sx={{ width: "300px" }}
            label="Email"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: "비밀번호는 필수입니다.",
          // pattern: {
          //   value:
          //     /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
          //   message: "올바르지 않은 형식의 비밀번호입니다.",
          // },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            sx={{ width: "300px" }}
            label="Password"
            type="password"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ fontWeight: "bold" }}
        disabled={!(dirtyFields?.email && dirtyFields?.password)}
      >
        로그인
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  minHeight: "100vh",
  width: "100%",
}));

const Title = styled("h1")(() => ({
  fontSize: "24px",
  fontWeight: "bold",
}));

export default SignIn;
