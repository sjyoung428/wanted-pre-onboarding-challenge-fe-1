import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
