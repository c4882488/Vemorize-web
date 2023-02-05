import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const { open, state, snackText, onClose } = props;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={3500} onClose={onClose}>
        <Alert onClose={onClose} severity={state} sx={{ width: "100%" }}>
          {snackText}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
