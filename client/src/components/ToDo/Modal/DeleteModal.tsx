import { useDeleteModalStore } from "@/store/useDeleteModalStore";
import { useToDoStore } from "@/store/useToDoStore";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import shallow from "zustand/shallow";

const DeleteModal = () => {
  const { open, closeModal } = useDeleteModalStore(
    (state) => ({ open: state.open, closeModal: state.closeModal }),
    shallow
  );
  const { setClickedDelete } = useToDoStore(
    (state) => ({
      setClickedDelete: state.setClickedDelete,
    }),
    shallow
  );

  const setDelete = () => {
    closeModal();
    setClickedDelete(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">경고창</DialogTitle>
        <DialogContent id="alert-dialog-description">
          정말 삭제하시겠습니까?
        </DialogContent>
        <Button onClick={setDelete} variant="text">
          삭제
        </Button>
        <Button onClick={closeModal} variant="text">
          취소
        </Button>
      </Dialog>
    </>
  );
};

export default DeleteModal;
