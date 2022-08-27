import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useSignUp from "@/hooks/query/useSignUp";
import useLogin from "@/hooks/query/useLogin";
import { EnterFormState } from "@/types/auth";
import shallow from "zustand/shallow";
import { ErrorMessage } from "@hookform/error-message";
import AuthErrorMessage from "../Error/AuthErrorMessage";

const AuthForm = () => {
  const { authFormType, setToken, setAuthFormType } = useAuthStore(
    (state) => ({
      authFormType: state.authFormType,
      setToken: state.setToken,
      setAuthFormType: state.setAuthFormType,
    }),
    shallow
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: authErrors },
  } = useForm<EnterFormState>({
    mode: "onChange",
  });

  // 로그인
  const { mutate: login } = useLogin({
    onSuccess: (loginResponse) => {
      setToken(loginResponse.token);
      useToastMessage(TOAST_MESSAGE.AUTH.LOGIN_SUCCESS, "success");
      navigate("/");
    },
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.INVALID_LOGIN, "error");
    },
  });

  // 회원가입
  const { mutate: signUp, isError } = useSignUp({
    onSuccess: () => {
      setAuthFormType("login");
      useToastMessage(TOAST_MESSAGE.AUTH.REGISTER_SUCCESS, "success");
    },
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.EXIST_USER, "error");
    },
  });

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
    const { email, password } = authErrors;

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
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", maxWidth: "223px" }}
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
        <ErrorMessage
          errors={authErrors}
          name="email"
          render={({ message }) => <AuthErrorMessage message={message} />}
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
        <ErrorMessage
          errors={authErrors}
          name="password"
          render={({ message }) => <AuthErrorMessage message={message} />}
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

export default AuthForm;
