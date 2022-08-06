import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "@/api/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { EnterFormState, FormType } from "./types";
import useToastMessage from "@/utils/toast/useToastMessage";
import { TOAST_MESSAGE } from "@/utils/toast/toastMessage";
import useSignUp from "@/hooks/query/useSignUp";

const Auth = () => {
  const [formType, setFormType] = useState<FormType>("login");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnterFormState>();
  const navigate = useNavigate();
  const { authToken, setToken } = useAuthStore();

  const { mutate: signUp, isError } = useSignUp({
    onError: () => {
      useToastMessage(TOAST_MESSAGE.AUTH.EXIST_USER, "error");
    },
  });

  // valid
  const onValid = async ({ email, password }: EnterFormState) => {
    // 로그인
    if (formType === "login") {
      try {
        const loginResponse = await AuthAPI.login({ email, password });
        if (authToken === loginResponse.token) {
          navigate("/");
        }
        setToken("authToken", loginResponse.token);
        useToastMessage(TOAST_MESSAGE.AUTH.LOGIN_SUCCESS, "success");
        navigate("/");
      } catch (error: unknown) {
        useToastMessage(TOAST_MESSAGE.AUTH.INVALID_LOGIN, "error");
      }
    }

    // 회원가입
    if (formType === "register") {
      signUp({ email, password });
      if (isError) return;

      setFormType("login");
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
    if (formType === "login") setFormType("register");
    if (formType === "register") setFormType("login");
  };

  return (
    <>
      {authToken && <Navigate to="/" replace />}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <TextField
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
          {formType === "login" ? "로그인" : "회원가입"}
        </Button>
        <Button onClick={onToggleType} variant="text">
          {formType === "login" ? "회원가입하러 가기" : "로그인하러 가기"}
        </Button>
      </Box>
    </>
  );
};

export default Auth;
