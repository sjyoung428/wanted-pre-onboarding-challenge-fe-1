import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useSignUp from "@/hooks/query/useSignUp";
import useLogin from "@/hooks/query/useLogin";
import { EnterFormState } from "@/types/auth";
import loginOption from "@/utils/options/query/loginOption";
import signUpOption from "@/utils/options/query/signUpOption";

const Authorization = () => {
  const { authToken, authFormType, setAuthFormType } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnterFormState>();

  // 로그인
  const { mutate: login } = useLogin(loginOption());

  // 회원가입
  const { mutate: signUp, isError } = useSignUp(signUpOption());

  // valid
  const onValid = async ({ email, password }: EnterFormState) => {
    // 로그인
    if (authFormType === "login") {
      login({ email, password });
    }

    // 회원가입
    if (authFormType === "register") {
      signUp({ email, password });
      if (isError) return;
    }
  };
  // invalid
  const onInValid = () => {
    const { email, password } = errors;

    // email 에러 메세지
    if (email && email.message) {
      useToastMessage(email.message, "error");
    }
    // password 에러 메세지
    if (password && password.message) {
      useToastMessage(password.message, "error");
    }
  };

  const onToggleType = () => {
    reset();
    if (authFormType === "login") setAuthFormType("register");
    if (authFormType === "register") setAuthFormType("login");
  };

  return (
    <>
      {authToken && <Navigate to="/" replace />}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <TextField
          sx={{
            marginBottom: "0.5rem",
          }}
          {...register("email", {
            required: TOAST_MESSAGE.AUTH.EMAIL_REQUIRED,
            validate: (email) =>
              (email.includes("@") && email.includes(".")) ||
              TOAST_MESSAGE.AUTH.INVALID_EMAIL, // 이메일 최소 조건
          })}
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          sx={{
            marginBottom: "0.5rem",
          }}
          {...register("password", {
            required: TOAST_MESSAGE.AUTH.PASSWORD_REQUIRED,
            minLength: {
              value: 8,
              message: TOAST_MESSAGE.AUTH.INVALID_PASSWORD,
            }, // 비밀번호 조건
          })}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained">
          {authFormType === "login" ? "로그인" : "회원가입"}
        </Button>
        <Button onClick={onToggleType} variant="text">
          {authFormType === "login" ? "회원가입하러 가기" : "로그인하러 가기"}
        </Button>
      </Box>
    </>
  );
};

export default Authorization;
