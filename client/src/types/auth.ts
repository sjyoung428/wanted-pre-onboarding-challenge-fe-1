export interface AuthResponse {
  message: string;
  token: string;
}

export interface IdAndToken {
  toDoId: string;
  authToken: string;
}

export interface EnterFormState {
  email: string;
  password: string;
}
