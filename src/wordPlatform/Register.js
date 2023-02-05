import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { useHistory } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FADA6F"),
  backgroundColor: "#FADA6F",
  "&:hover": {
    backgroundColor: "#FADA6F",
  },
}));

const Register = () => {
  let history = useHistory();
  // 彈窗
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("success");
  const [snackText, setSnackText] = React.useState("");
  const [checkEmailStats, setCheckEmailStats] = React.useState(false);
  const handleSnackbaeClick = () => {
    setOpen(true);
  };
  const handleSnackbaeClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //輸入區
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    birthday: new Date().toLocaleDateString("zh-Hans-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    password: "",
    checkPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    if(name == "email"){
      setCheckEmailStats(false);
      checkEmail(value);
    }
  };
  const handleBirthChange = (newValue) => {
    setNewUser({
      ...newUser,
      birthday: newValue.toLocaleDateString("zh-Hans-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  };
  const emailRef = useRef(null);

  const handleBlur = (e) => {
    emailRef.current.validate(e.target.value);
  };

  const handleSubmit = () => {
    if (newUser.password === newUser.checkPassword) {
      fetch("http://htdocs.vhost/project/public/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);

          switch (result.status) {
            case 200:
              alert(result.message);
              // setState("success");
              // setSnackText(result.message);
              // handleSnackbaeClick();
              history.push("/");
              break;
            default:
              setState("warning");
              setSnackText(result.message);
              handleSnackbaeClick();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("密碼不相符");
    }
  };

  const checkEmail = async (value) => {
    await fetch("http://htdocs.vhost/project/public/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value }),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.message);
          if (result.message === "信箱可註冊") {
            setCheckEmailStats(true);
          }else{
            setCheckEmailStats(false);
          }
        })
  }

  useEffect(() => {
    // console.log(checkEmailStats);
    ValidatorForm.addValidationRule("isEmailsafe", () => {
      return checkEmailStats;
    });

    return () => {
      ValidatorForm.removeValidationRule("isEmailsafe");
    };
  }, [checkEmailStats]);

  // 密碼顯示或隱藏區
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
      <CustomizedSnackbars
        open={open}
        state={state}
        snackText={snackText}
        onClick={handleSnackbaeClick}
        onClose={handleSnackbaeClose}
      />
      <div className="register">
        <div className="login-item-title">Create New Account</div>
        <hr style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }} />
        <div style={{ marginTop: 30, marginLeft: 40, marginRight: 30 }}>
          <TextValidator
            required
            ref={emailRef}
            label="電子郵件地址"
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            value={newUser.email}
            validators={["required", "isEmail", "isEmailsafe"]}
            errorMessages={["此項目為必填", "email 格式錯誤", "Email已被註冊過"]}
            style={{ width: 400 }}
          />
        </div>
        <div style={{ marginTop: 10, marginLeft: 40, marginRight: 30 }}>
          <TextValidator
            required
            label="使用者名稱"
            onChange={handleChange}
            name="name"
            value={newUser.name}
            style={{ width: 400 }}
          />
        </div>

        <div style={{ marginTop: 20, marginLeft: 40, marginRight: 30 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              required
              label="請選擇生日"
              value={newUser.birthday}
              onChange={handleBirthChange}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: 400 }} />
              )}
            />
          </LocalizationProvider>
        </div>

        <div
          style={{
            marginTop: 10,
            marginLeft: 40,
            marginRight: 30,
          }}
        >
          <TextValidator
            required
            label="輸入您的密碼"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="password"
            value={newUser.password}
            style={{ width: 400 }}
          />
        </div>

        <div
          style={{
            marginTop: 10,
            marginLeft: 40,
            marginRight: 30,
          }}
        >
          <TextValidator
            required
            label="確認您的密碼"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="checkPassword"
            value={newUser.checkPassword}
            style={{ width: 400 }}
          />
        </div>
        <div
          style={{
            marginLeft: 40,
            marginRight: 30,
          }}
        >
          <FormControlLabel
            control={<Checkbox value={showPassword} />}
            label={<Typography sx={{ fontSize: 18 }}>顯示密碼</Typography>}
            onChange={handleClickShowPassword}
          />
        </div>

        <ColorButton
          variant="contained"
          type="submit"
          style={{
            width: 150,
            height: 50,
            borderRadius: 10,
            marginTop: 20,
            marginLeft: 65,
            display: "inline-block",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            註冊
          </Typography>
        </ColorButton>
        <Link to="/">
          <ColorButton
            variant="contained"
            style={{
              width: 150,
              height: 50,
              borderRadius: 10,
              marginTop: 20,
              marginLeft: 65,
              backgroundColor: "#E0E0DC",
              display: "inline-block",
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              取消
            </Typography>
          </ColorButton>
        </Link>
      </div>
    </ValidatorForm>
  );
};
export default Register;
