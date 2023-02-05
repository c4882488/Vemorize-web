import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Cancel from "./imgs/Cancel.png";
import Confirm from "./imgs/Confirm.png";
import "./App.css";
import { Link } from "react-router-dom";
// import CustomizedSnackbars from "./CustomizedSnackbars";
import { useHistory } from "react-router-dom";

export default function PersonalInfo() {
  let history = useHistory();
  // 彈窗
  // const [open, setOpen] = useState(false);
  // const [state, setState] = useState("success");
  // const [snackText, setSnackText] = useState("");
  // const handleSnackbaeClick = () => {
  //   setOpen(true);
  // };
  // const handleSnackbaeClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };
  //輸入框狀態區
  const [person, setPerson] = useState({
    userName: "",
    birth: new Date().toLocaleDateString("zh-Hans-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    Email: "",
  });
  const handlePersonChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };
  const handleBirthChange = (newValue) => {
    setPerson({
      ...person,
      birth: newValue.toLocaleDateString("zh-Hans-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  };

  //確認、取消按扭區
  const handleConfirmPress = async () => {
    // console.log(person);
    await fetch("http://htdocs.vhost/project/public/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: person.userName,
        email: person.Email,
        birthday: person.birth,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        switch (result.status) {
          case 200:
            console.log(result);
            // history.push("/ShowPersonalInfo");
            break;
          default:
            alert(result.message);
          // history.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleCancelPress = () => {
    // console.log("按下取消");
  };

  //  Api
  const getData = async () => {
    await fetch("http://htdocs.vhost/project/public/getProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            // console.log(result);
            setPerson({
              ...person,
              userName: result.result[0].user_name,
              birth: new Date(result.result[0].user_birthday).toLocaleDateString("zh-Hans-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
              Email: result.result[0].user_email,
            });
            break;
          default:
            alert(result.message);
            history.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div className="PersonalInfo-item">
          <div className="PersonalInfo-item-title">個人資料</div>
          <div className="PersonalInfo-item-text">
            <div
              style={{
                display: "inline-block",
                marginTop: 20,
              }}
            >
              用戶名：
            </div>
            <TextField
              id="userName"
              label="請輸入用戶名"
              type="search"
              name="userName"
              value={person.userName}
              onChange={handlePersonChange}
              variant="standard"
              sx={{ width: 250 }}
            />

            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  marginLeft: 15,
                }}
              >
                生日：
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="請選擇日期"
                  value={person.birth}
                  onChange={handleBirthChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "23ch" }}
                      variant="standard"
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                }}
              >
                Email：
              </div>
              <TextField
                id="Email"
                label="請輸入電子郵件"
                type="search"
                name="Email"
                value={person.Email}
                onChange={handlePersonChange}
                variant="standard"
                sx={{ width: 250 }}
              />
            </div>
          </div>
          <div style={{ marginTop: 120 }}>
            <Link to="/ShowPersonalInfo">
              <Button
                style={{ width: 60, height: 60 }}
                onClick={handleConfirmPress}
              >
                <img src={Confirm} alt="Confirm" />
              </Button>
            </Link>
            <Link to="/ShowPersonalInfo">
              <Button
                style={{ marginLeft: 100, width: 60, height: 60 }}
                onClick={handleCancelPress}
              >
                <img src={Cancel} alt="Cancel" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
