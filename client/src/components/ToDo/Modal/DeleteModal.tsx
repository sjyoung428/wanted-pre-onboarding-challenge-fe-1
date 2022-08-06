import { useDeleteModalStore } from "@/store/useDeleteModalStore";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

interface DeleteModalProps {
  setDeleteState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({ setDeleteState }: DeleteModalProps) => {
  const { open, closeModal } = useDeleteModalStore();

  const setDelete = () => {
    closeModal();
    setDeleteState(true);
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
