"use client";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert } from "@mui/material";
import { useSnackBar } from "@/app/utils/contexts/snackebar-context";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const Msg = ({ msg, type }: { msg: string; type: "success" | "error" }) => {
  return (
    <Alert
      severity={type}
      sx={{
        "& .MuiAlert-icon": {
          margin: "0 6px 0 0",
        },
      }}
      style={{ fontFamily: "cairo" }}
    >
      {msg}
    </Alert>
  );
};

export default function CustomSnackbar() {
  const { isOpen, data, openSnackBar, closeSnackBar } = useSnackBar();
  return (
    <Snackbar
      open={isOpen}
      onClose={closeSnackBar}
      slots={{ transition: SlideTransition }}
      message={<Msg msg={data.message} type={data.type ?? "error"} />}
      key={data.message + Date.now()}
      autoHideDuration={3000}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "transparent !important",
          boxShadow: "none !important",
          justifyContent: "start",
        },
      }}
    />
  );
}
