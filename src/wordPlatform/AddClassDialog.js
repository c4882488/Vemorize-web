import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FADA6F"),
  backgroundColor: "#FADA6F",
  "&:hover": {
    backgroundColor: "#FADA6F",
  },
}));

const AddClassDialog = (props) => {
  const { openAddClass, handleTypeModal, getData } = props;
  const [AddClass, setAddClass] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setAddClass(value);
  };

  const handleSubmit = () => {
    if (AddClass.length !== 0) {
      // console.log(AddClass);
      fetch("http://htdocs.vhost/project/public/newClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.getItem("token"),
        },
        body: JSON.stringify({ class_name: AddClass }),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          // TODO: 後端待處理
          switch (result.status) {
            case 200:
              getData();
              // console.log(result);
              // setState("success");
              // setSnackText(result.message);
              // handleSnackbaeClick();
              // history.push("/UserIndex");
              setAddClass("");
              handleTypeModal();
              break;
            default:
              console.log("error");
              // setState("warning");
              // setSnackText(result.message);
              // handleSnackbaeClick();
          }
          
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Dialog open={openAddClass} onClose={handleTypeModal} fullWidth={true}>
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <DialogTitle>新增班級</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={AddClass}
            margin="dense"
            name="className"
            label="請輸入班級名稱"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <ColorButton style={{ marginRight: "25%", width: 300 }} type="submit">
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", color: "#858585" }}
            >
              建立班級
            </Typography>
          </ColorButton>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};
export default AddClassDialog;
