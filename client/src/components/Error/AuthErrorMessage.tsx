import { Typography } from "@mui/material";

interface AuthErrorMessageProps {
  message: string;
}

const AuthErrorMessage = ({ message }: AuthErrorMessageProps) => {
  return (
    <Typography sx={{ maxWidth: "100%", color: "red", marginBottom: "0.5rem" }}>
      {message}
    </Typography>
  );
};

export default AuthErrorMessage;
