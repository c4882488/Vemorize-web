import React, { useState, useEffect } from "react";
import { ReactComponent as AddClass } from "./svgs/addClass.svg";
import IconButton from "@mui/material/IconButton";
import Document from "./imgs/Document.png";
import IndexItem from "./IndexItem";
//import { Link } from "react-router-dom";
import "./App.css";
import AddClassDialog from "./AddClassDialog";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { useHistory } from "react-router-dom";

const UserIndex = () => {
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

  // 設定老師
  const [isTeacher, setIsTeacher] = React.useState(false);
  // 顯示資料區
  const [userClass, setUserClass] = React.useState({
    data: [],
  });
  const [openAddClass, setOpenAddClass] = useState(false);
  const handleTypeModal = () => {
    setOpenAddClass(!openAddClass);
  };

  // 判斷教師身分 Api
  const Identity = async () => {
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
            if (result.result[0].name == "teacher") {
              setIsTeacher(true);
              console.log("teacher");
            }
            getData();
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
  // 取得資料 Api
  const getData = async () => {
    console.log(isTeacher);
    const url = isTeacher
      ? "http://htdocs.vhost/project/public/getClasses"
      : "http://htdocs.vhost/project/public/getStudentClasses";

    // body: JSON.stringify(login),
    await fetch(url, {
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
            console.log(result);
            setUserClass({ ...userClass, data: result.result });
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
  };

  useEffect(() => {
    Identity();
    getData();
  }, [isTeacher]);
  return (
    <div>
      <CustomizedSnackbars
        open={open}
        state={state}
        snackText={snackText}
        onClick={handleSnackbaeClick}
        onClose={handleSnackbaeClose}
      />
      <AddClassDialog
        getData={getData}
        openAddClass={openAddClass}
        handleTypeModal={handleTypeModal}
      />
      <div className="overview">
        <img src={Document} alt="Document" />
        <div className="overview-text">Overview</div>
      </div>
      <div className="content-view">
        <div
          style={{
            marginLeft: 200,
            marginRight: 100,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {userClass.data.map((item) => (
            <IndexItem item={item} key={item.id} isTeacher={isTeacher} />
          ))}
        </div>
      </div>
      {isTeacher === true && (
        <IconButton
          style={{
            float: "right",
            marginRight: 70,
            marginTop: 150,
          }}
          onClick={handleTypeModal}
        >
          <AddClass style={{ width: 80, height: 80 }} />
        </IconButton>
      )}
    </div>
  );
};
export default UserIndex;
