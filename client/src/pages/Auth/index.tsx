import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { EnterFormState, FormType } from "./types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [formType, setFormType] = useState<FormType>("login");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnterFormState>();
  const navigate = useNavigate();
  const { token: authToken, setToken } = useAuthStore();

  // valid
  const onValid = async ({ email, password }: EnterFormState) => {
    // 로그인
    if (formType === "login") {
      try {
        const loginResponse = await AuthAPI.login({ email, password });
        if (authToken === loginResponse.token) {
          navigate("/");
        }
        setToken("token", loginResponse.token);
        navigate("/");
      } catch (error: unknown) {
        console.log(error);
        alert("로그인 정보가 올바르지 않습니다");
      }
    }

    // 회원가입
    if (formType === "register") {
      const signUpResponse = await AuthAPI.signUp({ email, password });
      setFormType("login");
      console.log(signUpResponse);
    }
  };
  // invalid
  const onInValid = () => {
    const { email, password } = errors;
    // email 에러 메세지
    if (email) {
      toast.error(email.message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: true,
      });
    }
    // password 에러 메세지
    if (password) {
      toast.error(password.message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        draggable: true,
      });
    }
  };

  const onToggleType = () => {
    reset();
    if (formType === "login") setFormType("register");
    if (formType === "register") setFormType("login");
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <TextField
          {...register("email", {
            required: true,
            validate: (email) =>
              (email.includes("@") && email.includes(".")) ||
              "이메일 형식은 @ 과 .를 포함해야 합니다.", // 이메일 최소 조건
          })}
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "비밀번호는 8자리 이상 입력해야 합니다.",
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
      <ToastContainer />
    </>
  );
};

export default Auth;
