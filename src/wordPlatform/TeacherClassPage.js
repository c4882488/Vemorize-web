import React, { useState, useEffect } from "react";
import { ReactComponent as AvatarSVG } from "./svgs/avatar.svg";
//import { ReactComponent as UpdateButtonSVG } from "./svgs/updateButton.svg";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Document from "./imgs/Document.png";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "./App.css";
import MemberList from "./MemberList";
import WordList from "./WordList";
import AllStudentList from "./AllStudentList";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddMemberDialog from "./AddMemberDialog";
import StudentScore from "./StudentScore";
// import StudentScore from "./StudentScore";
import CustomizedSnackbars from "./CustomizedSnackbars";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FADA6F"),
  backgroundColor: "#FADA6F",
  "&:hover": {
    backgroundColor: "#FADA6F",
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FFF7DC"),
  backgroundColor: "#FFF7DC",
  "&:hover": {
    backgroundColor: "#FFF7DC",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const TeacherClassPage = (props) => {
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
  //資料顯示區
  const [lessonName, setLessonName] = React.useState([]);
  const [word, setWord] = React.useState([]);
  const [data, setData] = React.useState("undefined");
  const [defaultWordset, setDefaultWordset] = React.useState();
  const [classInfo, setClassInfo] = React.useState([]);

  //單字集按鈕狀態
  const [vocStatus, setVocStatus] = useState(true);

  //單字集按鈕顯示即隱藏
  const [needHidden, setNeedHidden] = useState(true);
  const handleVocButton = () => {
    setNeedHidden(true);
    setVocStatus(true);
    setScoreStatus(false);
    setMemberStatus(false);
    setShowScore(false);
  };
  //成績總覽按鈕狀態
  const [scoreStatus, setScoreStatus] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const handleScoreButton = () => {
    setNeedHidden(false);
    setVocStatus(false);
    setScoreStatus(true);
    setData("undefined");
    setMemberStatus(false);
    setShowScore(false);
  };
  //成員按鈕狀態
  const [memberStatus, setMemberStatus] = useState(false);
  const handleMemberButton = () => {
    setNeedHidden(false);
    setMemberStatus(true);
    setVocStatus(false);
    setData("undefined");
    setScoreStatus(false);
    setShowScore(false);
  };

  const [showScoreID, setShowScoreID] = useState("");
  const handleShowScore = (sid)=>{
    setData("undefined");
    setScoreStatus(false);
    setShowScore(!showScore);
    setShowScoreID(sid);
  }
  const getScoreData =async () => {
    // console.log(showScoreID);
    // 取得成員成績資料 Api
    await fetch("http://htdocs.vhost/project/public/getMemberScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        class_id: Number(id),
        user_id: showScoreID,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        switch (result.status) {
          case 200:
            console.log(result.result);
            setData(result.result);

            setState("success");
            setSnackText(result.message);
            handleSnackbaeClick();
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


  // 搜尋
  const [search, setSearch] = React.useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //新增成員彈跳視窗
  const [openAddMember, setOpenAddMember] = useState(false);
  const handleTypeModal = () => {
    setOpenAddMember(!openAddMember);
  };
  // 取得網址ID
  const { id } = props.match.params;

  const handleDeleteNumbered =async (sid) => {
    await fetch("http://htdocs.vhost/project/public/deleteClassMember", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        class_id: Number(id),
        student_id: sid,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            // console.log(result.result);
            getClassMembeData();
            setState("success");
            setSnackText(result.message);
            handleSnackbaeClick();
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
  }
  // 新增成員
  const handleAddNumbered = async (data) => {
    await fetch("http://htdocs.vhost/project/public/addClassMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        class_id: Number(id),
        user_email: data,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            // console.log(result.result);
            getClassMembeData();
            setState("success");
            setSnackText(result.message);
            handleSnackbaeClick();
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

  // 取得班級資料 Api
  const getClassInfoData = async () => {
    // "http://htdocs.vhost/project/public/getStudentClasses";
    // body: JSON.stringify(login),
    await fetch("http://htdocs.vhost/project/public/getClasses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.result);
        switch (result.status) {
          case 200: {
            let new_ClassInfo = result.result.filter((Infos) => Infos.id == id);
            setClassInfo(new_ClassInfo[0]);
            // console.log(new_ClassInfo[0].class_name);
            break;
          }
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

  // 取得單字集資料 Api
  const getData = async () => {
    await fetch(
      "http://htdocs.vhost/project/public/getWordsetList?class_id=" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.result[0].wordset_id);
        switch (result.status) {
          case 200:
            if(defaultWordset == undefined){
              setDefaultWordset(result.result[0].wordset_id);
            }
            // console.log(result);
            setLessonName(result.result);
            // setState("success");
            // setSnackText(result.message);
            // handleSnackbaeClick();
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

  // 取得word資料 Api
  const getWordData = async (wordid = defaultWordset) => {
    await fetch(
      "http://htdocs.vhost/project/public/getWordsetContent?wordset_id=" +
        wordid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            // console.log(result);
            setWord(result.result);
            if (search !== "") {
              setWord(
                result.result.filter((sword) =>
                  sword.word_english.includes(search)
                )
              );
            }

            setState("success");
            setSnackText(result.message);
            handleSnackbaeClick();
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

  // 取得成員資料 Api
  const getClassMembeData = async (wordid = id) => {
    await fetch(
      "http://htdocs.vhost/project/public/getClassMember?class_id=" +
        wordid,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            // console.log(result.result);
            setData(result.result);

            setState("success");
            setSnackText(result.message);
            handleSnackbaeClick();
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
    // Identity();
    getClassInfoData();
    if (vocStatus) {
      getData();
      if (defaultWordset !== undefined) {
        getWordData();
      }
    }
    if (memberStatus) {
      getClassMembeData();
    }
    if (scoreStatus) {
      getClassMembeData();
    }
    if(showScore){
      getScoreData();
    }
  }, [defaultWordset, memberStatus, scoreStatus, search]);
  return (
    <div>
      <CustomizedSnackbars
        open={open}
        state={state}
        snackText={snackText}
        onClick={handleSnackbaeClick}
        onClose={handleSnackbaeClose}
      />
      <AddMemberDialog
        handleAddNumbered={handleAddNumbered}
        handleTypeModal={handleTypeModal}
        openAddMember={openAddMember}
      />
      <div className="ClassPage-Leftscreen">
        <div className="ClassPage-Leftscreen-ClassName">
          {/* {console.log(classInfo.class_name)} */}
          {!classInfo.length !== "" ? classInfo.class_name : null}
        </div>
        <div className="ClassPage-Leftscreen-TeacherName">
          <AvatarSVG />
          <div>{!classInfo.length !== "" ? classInfo.user_name : null}</div>
        </div>
        <Link to={"/AddWord/" + id} style={{ textDecoration: "none" }}>
          <ColorButton
            variant="contained"
            style={{
              width: 150,
              height: 50,
              borderRadius: 30,
              marginTop: 100,
              marginLeft: 100,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            startIcon={<AddIcon />}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              新增
            </Typography>
          </ColorButton>
        </Link>
        <div style={{ marginTop: 30 }}>
          <ColorButton2
            className="ClassPage-Leftscreen-ColorButton2"
            onClick={handleVocButton}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              單字集
            </Typography>
          </ColorButton2>
          {needHidden &&
            lessonName.length > 0 &&
            lessonName.map((item) => {
              return (
                <ColorButton2
                  className="ClassPage-Leftscreen-ColorButton3"
                  key={item.wordset_id}
                  onClick={() => {
                    setSearch("");
                    setDefaultWordset(item.wordset_id);
                    // getWordData(item.wordset_id);
                  }}
                >
                  <Typography sx={{ fontSize: 12 }}>
                    {item.wordset_name}
                  </Typography>
                </ColorButton2>
              );
            })}
          <ColorButton2
            className="ClassPage-Leftscreen-ColorButton2"
            onClick={handleScoreButton}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              成績總覽
            </Typography>
          </ColorButton2>
          <ColorButton2
            className="ClassPage-Leftscreen-ColorButton2"
            onClick={handleMemberButton}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              成員
            </Typography>
          </ColorButton2>
        </div>
      </div>
      <div className="renderItem">
        <div className="CassPage-words">
          <div>
            <img src={Document} alt="Document" />
          </div>

          <div className="CassPage-words-text">
            {vocStatus === true && "Words(" + word.length + ")"}
            {memberStatus === true &&
              data !== "undefined" &&
              "Members(" +
                eval(
                  Number(data.student.length) + Number(data.teacher.length)
                ) +
                ")"}
            {scoreStatus === true && "Scores"}
            {showScore === true && "Scores"}
          </div>
          {vocStatus === true && (
            <Link to={"/AddWord/" + id + "/" + defaultWordset}>
              <IconButton
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 20,
                  backgroundColor: "#FADA6F",
                }}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            </Link>
          )}
          {memberStatus === true && (
            <IconButton
              style={{
                width: 30,
                height: 30,
                marginLeft: 20,
                backgroundColor: "#FADA6F",
              }}
              onClick={handleTypeModal}
            >
              <AddIcon />
            </IconButton>
          )}
          <Search style={{ backgroundColor: "#E0E0DC", marginLeft: 700 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => {
                handleSearchChange(e);
              }}
            />
          </Search>
        </div>
        <div>
          {vocStatus === true &&
            word.length > 0 &&
            word.map((item) => {
              return <WordList key={item.id} item={item} />;
            })}
          {memberStatus === true &&
            data !== "undefined" &&
            data.teacher.map((item) => {
              return (
                <MemberList key={item.user_id} Identity={false} item={item} student={true}/>
              );
            })}
          {memberStatus === true &&
            data !== "undefined" &&
            data.student.map((item) => {
              return (
                <MemberList
                  key={item.stuednt_user_id}
                  Identity={true}
                  item={item}
                  student={true}
                  handleDeleteNumbered={handleDeleteNumbered}
                />
              );
            })}
          {/* {scoreStatus === true && (
            <AllStudentList onClickStudent={onClickStudent} />
          )} */}
          {showScore === true &&
            data !== "undefined" &&
            data.map((item) => {
              return <StudentScore key={item.id} item={item} />;
            })}
          {scoreStatus === true &&
            data !== "undefined" &&
            data.student.map((item) => {
              return (
                <AllStudentList
                  key={item.stuednt_user_id}
                  item={item}
                  handleShowScore={handleShowScore}
                  showScore={showScore}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default TeacherClassPage;
