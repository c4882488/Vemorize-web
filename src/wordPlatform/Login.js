import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
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

const Login = () => {
  let history = useHistory();
  // 彈窗
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("success");
  const [snackText, setSnackText] = React.useState("");
  const handleSnackbaeClick = () => {
    setOpen(true);
  };
  const handleSnackbaeClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // 輸入區
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const emailRef = useRef(null);
  const handleBlur = (e) => {
    emailRef.current.validate(e.target.value);
  };

  const handleSubmit = () => {
    if (login.email.length !== 0 || login.password.length !== 0) {
      // console.log(login);

      fetch("http://htdocs.vhost/project/public/doLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          switch (result.status) {
            case 200:
              console.log(result);
              localStorage.setItem("token", result.token);
              // setState("success");
              history.push("/UserIndex");
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
      console.log("請輸入帳號或密碼");
    }
  };
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
      <div className="login-item">
        <div className="login-item-title">Login</div>
        <hr style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }} />
        <div style={{ marginTop: 50, marginLeft: 40, marginRight: 30 }}>
          <TextValidator
            required
            ref={emailRef}
            label="電子郵件地址"
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            value={login.email}
            validators={["required", "isEmail"]}
            errorMessages={["此項目為必填", "email 格式錯誤"]}
            style={{ width: 400 }}
          />
        </div>
        <div
          style={{
            marginTop: 50,
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
            value={login.password}
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
          type="submit"
          variant="contained"
          style={{
            width: 150,
            height: 50,
            borderRadius: 10,
            marginTop: 100,
            marginLeft: 65,
            display: "inline-block",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            登入
          </Typography>
        </ColorButton>

        <Link to="/Register">
          <ColorButton
            variant="contained"
            style={{
              width: 150,
              height: 50,
              borderRadius: 10,
              marginTop: 100,
              marginLeft: 65,
              display: "inline-block",
              backgroundColor: "#E0E0DC",
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              註冊
            </Typography>
          </ColorButton>
        </Link>
      </div>
    </ValidatorForm>
  );
};
export default Login;
