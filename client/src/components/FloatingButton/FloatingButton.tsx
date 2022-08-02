import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormModalStore } from "@/store/useFormModalStore";
import { useUpdateToDoStore } from "@/store/useUpdateToDoStore";

const FloatingButton = () => {
  const openModal = useFormModalStore((state) => state.openModal);
  const { setUpdateMode } = useUpdateToDoStore();
  return (
    <Fab
      onClick={() => {
        setUpdateMode(false), openModal();
      }}
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
