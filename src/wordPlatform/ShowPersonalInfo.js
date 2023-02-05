import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "./App.css";
import { Link } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FADA6F"),
  backgroundColor: "#FADA6F",
  "&:hover": {
    backgroundColor: "#FADA6F",
  },
}));

export default function ShowPersonalInfo() {
  //輸入框狀態區
  const [person, setPerson] = useState({
    userName: "",
    birth: new Date().toLocaleDateString("zh-Hans-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    Email: "",
    Identity:"",
  });

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
              Identity:result.result[0].name,
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
            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                }}
              >
                用戶名：
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  marginLeft: 15,
                }}
              >
                {person.userName !== "" && person.userName}
              </div>
            </div>

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
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  marginLeft: 15,
                }}
              >
                {person.birth !== "" && person.birth}
              </div>
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
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                }}
              >
                {person.Email !== "" && person.Email}
              </div>
            </div>
            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                }}
              >
                身份：
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 20,
                }}
              >
                {person.Identity !== "" && person.Identity == "teacher"?"老師":"學生"}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 80 }}>
            <Link to="/PersonalInfo">
              <ColorButton
                variant="contained"
                style={{ width: 150, height: 50 }}
              >
                <Typography
                  sx={{ fontSize: 18, fontWeight: "bold", color: "#858585" }}
                >
                  修改
                </Typography>
              </ColorButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
