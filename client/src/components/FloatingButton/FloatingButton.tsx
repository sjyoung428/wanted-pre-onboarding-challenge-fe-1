import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModalStore } from "@/store/useModalStore";

const FloatingButton = () => {
  const openModal = useModalStore((state) => state.openModal);
  return (
    <Fab
      onClick={openModal}
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
