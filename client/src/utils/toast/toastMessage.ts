export const TOAST_MESSAGE = {
  AUTH: {
    LOGIN_SUCCESS: "로그인 되었습니다.",
    LOGOUT_SUCCESS: "로그아웃 되었습니다.",
    ONLY_LOGIN: "로그인하고 이용해 주세요.",
    INVALID_LOGIN: "로그인 정보가 올바르지 않습니다",
    INVALID_EMAIL: "이메일 형식은 @ 과 .를 포함해야 합니다.",
    INVALID_PASSWORD: "비밀번호는 8자리 이상 입력해야 합니다.",
    REGISTER_SUCCESS: "회원가입에 성공하였습니다.",
    EXIST_USER: "이미 존재하는 유저입니다",
    EMAIL_REQUIRED: "이메일 입력은 필수입니다.",
    PASSWORD_REQUIRED: "비밀번호 입력은 필수입니다.",
  },
  TODO: {
    NOT_ALLOW_EMPTY_STRING: "제목과 내용을 입력해야 합니다.",
    DELETE_SUCCESS: "성공적으로 삭제했습니다.",
    UPDATE_SUCCESS: "성공적으로 수정했습니다.",
    CREATE_SUCCESS: "새로운 할 일을 추가했습니다.",
  },
} as const;
