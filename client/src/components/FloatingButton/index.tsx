import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FloatingButton = () => {
  return (
    <Fab
      sx={{
        position: "fixed",
        right: "10rem",
        bottom: "5rem",
      }}
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;
