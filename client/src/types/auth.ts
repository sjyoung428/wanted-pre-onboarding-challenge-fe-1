export interface AuthResponse {
  message: string;
  token: string;
}

export interface IdAndToken {
  id: string;
  authToken: string;
}

export interface EnterFormState {
  email: string;
  password: string;
}
