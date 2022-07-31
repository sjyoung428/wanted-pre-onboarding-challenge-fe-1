import { Box, Fab } from "@mui/material";
import FloatingButton from "../FloatingButton";

const ToDoList = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "50vh",
        }}
      >
        <FloatingButton />
      </Box>
    </>
  );
};

export default ToDoList;
