import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEnterModalStore } from "@/store/useEnterModalStore";

const FloatingButton = () => {
  const openModal = useEnterModalStore((state) => state.openModal);
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
