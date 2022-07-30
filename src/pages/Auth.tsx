import { Box, Button, TextField } from "@mui/material";
import React from "react";

const Auth = () => {
  return (
    <Box component="form">
      <TextField type="email" />
      <TextField type="password" />
      <Button variant="contained">로그인</Button>
    </Box>
  );
};

export default Auth;
