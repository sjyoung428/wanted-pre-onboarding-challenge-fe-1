import useDate from "@/hooks/common/useDate";
import { Typography } from "@mui/material";
import React from "react";
import { UpdatedAtProps } from "./types";

const UpdatedAt = ({ updatedAt }: UpdatedAtProps) => {
  const time = useDate(updatedAt);
  return (
    <Typography
      sx={{
        fontSize: "0.8rem",
        color: "gray",
      }}
    >
      {time}
    </Typography>
  );
};

export default React.memo(UpdatedAt);
