import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FADA6F"),
  backgroundColor: "#FADA6F",
  "&:hover": {
    backgroundColor: "#FADA6F",
  },
}));

const AddMemberDialog = (props) => {
  const { openAddMember, handleTypeModal, handleAddNumbered } = props;
  const [AddMember, setAddMember] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setAddMember(value);
  };

  const handleSubmit = () => {
    if (AddMember.length !== 0) {
      // console.log(AddMember);
      handleAddNumbered(AddMember);
      setAddMember("");
      handleTypeModal();
    }
  };

  //輸入驗證
  const emailRef = useRef(null);
  const handleBlur = (e) => {
    emailRef.current.validate(e.target.value);
  };

  return (
    <Dialog open={openAddMember} onClose={handleTypeModal} fullWidth={true}>
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <DialogTitle>新增成員</DialogTitle>
        <DialogContent>
          <TextValidator
            required
            ref={emailRef}
            value={AddMember}
            onBlur={handleBlur}
            margin="dense"
            name="Member"
            label="請輸入成員電子郵件"
            fullWidth
            variant="standard"
            validators={["required", "isEmail"]}
            errorMessages={["此項目為必填", "email 格式錯誤"]}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <ColorButton style={{ marginRight: "25%", width: 300 }} type="submit">
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", color: "#858585" }}
            >
              送出
            </Typography>
          </ColorButton>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};
export default AddMemberDialog;
