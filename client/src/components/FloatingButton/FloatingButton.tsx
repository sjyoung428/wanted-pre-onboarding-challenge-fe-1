import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormModalStore } from "@/store/useFormModalStore";
import { useToDoStore } from "@/store/useToDoStore";
import shallow from "zustand/shallow";

const FloatingButton = () => {
  const openModal = useFormModalStore((state) => state.openModal, shallow);
  const { setUpdateMode } = useToDoStore(
    (state) => ({ setUpdateMode: state.setUpdateMode }),
    shallow
  );
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
