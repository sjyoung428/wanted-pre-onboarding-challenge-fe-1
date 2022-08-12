import { Skeleton, Stack } from "@mui/material";

const ToDoSkeleton = () => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack width="70%">
        <Skeleton height={40} variant="text"></Skeleton>
        <Skeleton variant="text"></Skeleton>
      </Stack>
      <Skeleton width={20} height={20} variant="circular"></Skeleton>
    </Stack>
  );
};

export default ToDoSkeleton;
