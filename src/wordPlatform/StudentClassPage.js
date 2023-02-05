import React, { useState, useEffect } from "react";
import { ReactComponent as AvatarSVG } from "./svgs/avatar.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import "./App.css";
import InputBase from "@mui/material/InputBase";
import Document from "./imgs/Document.png";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import MemberList from "./MemberList";
import WordList from "./WordList";
import StudentScore from "./StudentScore";
import StudentTest from "./StudentTest";
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
const StudentClassPage = (props) => {
  // 彈窗
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("success");
  const [snackText, setSnackText] = useState("");
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
  const [lessonName, setLessonName] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  const [word, setWord] = React.useState([]);
  const [data, setData] = React.useState("undefined");
  const [defaultWordset, setDefaultWordset] = React.useState();
  const [uid, setUid] = useState();

  // 取得網址ID
  const { id } = props.match.params;

  //單字集按鈕狀態
  const [vocStatus, setVocStatus] = React.useState(true);

  //單字集按鈕顯示即隱藏
  const [needHidden, setNeedHidden] = React.useState(true);
  const handleVocButton = () => {
    setNeedHidden(true);
    setVocStatus(true);
    setTestStatus(false);
    setScoreStatus(false);
    setMemberStatus(false);
  };
  //測驗按鈕狀態
  const [testStatus, setTestStatus] = React.useState(false);
  const handleTestButton = () => {
    setNeedHidden(false);
    setVocStatus(false);
    setTestStatus(true);
    setScoreStatus(false);
    setMemberStatus(false);
  };
  //歷史成績按鈕狀態
  const [scoreStatus, setScoreStatus] = React.useState(false);
  const handleScoreButton = () => {
    setNeedHidden(false);
    setVocStatus(false);
    setTestStatus(false);
    setScoreStatus(true);
    setMemberStatus(false);
    setData("undefined");
  };
  //成員按鈕狀態
  const [memberStatus, setMemberStatus] = React.useState(false);
  const handleMemberButton = () => {
    setNeedHidden(false);
    setMemberStatus(true);
    setVocStatus(false);
    setTestStatus(false);
    setScoreStatus(false);
    setData("undefined");
  };

  // 搜尋
  const [search, setSearch] = React.useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // 測驗資料
  const testAns = (id, val) => {
    const newWordSet = word.map((sword) => {
      return id === sword.id
        ? {
            ...sword,
            test: val,
          }
        : sword;
    });
    setWord(newWordSet);
  };
  const handleTest = async ()=>{
    const Correct = word.filter(
      (sword) => sword.test == sword.word_english
    ).length;
    const Score = (100/word.length)*Correct;
    // console.log(Score);

    await fetch("http://htdocs.vhost/project/public/submitStudentScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        class_id: id,
        wordset_id: defaultWordset, 
        score: Score
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.result);
        switch (result.status) {
          case 200: {
            setState("success");
            setSnackText(result.message);
            handleSnackbaeClick();
            getWordData();
            handleScoreButton();
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
    
  }

  // 取得班級資料 Api
  const getClassInfoData = async () => {
    await fetch("http://htdocs.vhost/project/public/getStudentClasses", {
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
            let new_ClassInfo = result.result.filter(
              (Infos) => Infos.class_id == id
            );
            // console.log(new_ClassInfo);
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

  //getUserID  Api
  const getUserID = async () => {
    await fetch("http://htdocs.vhost/project/public/getProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.result[0].id);
        switch (result.status) {
          case 200:
            setUid(result.result[0].id);
            // console.log(result);
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

  // 取得成員資料 Api
  const getClassMembeData = async () => {
    await fetch("http://htdocs.vhost/project/public/getClassMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        class_id: Number(id),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
  const getScoreData = async () => {
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
        user_id: uid,
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
        console.log(result.result[0].wordset_id);
        switch (result.status) {
          case 200:
            if (defaultWordset == undefined) {
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
        console.log(result);
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
  useEffect(() => {
    console.log(word);
  }, [word]);

  useEffect(() => {
    getClassInfoData();
    getUserID();
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
      getScoreData();
    }
  }, [uid, defaultWordset, vocStatus, memberStatus, scoreStatus, search]);

  return (
    <div>
      <CustomizedSnackbars
        open={open}
        state={state}
        snackText={snackText}
        onClick={handleSnackbaeClick}
        onClose={handleSnackbaeClose}
      />
      <div className="ClassPage-Leftscreen">
        <div className="ClassPage-Leftscreen-ClassName">
          {!classInfo.length !== "" ? classInfo.class_name : null}
        </div>
        <div className="ClassPage-Leftscreen-TeacherName">
          <AvatarSVG />
          <div>{!classInfo.length !== "" ? classInfo.teacher_name : null}</div>
        </div>

        <div style={{ marginTop: 200 }}>
          <ColorButton2
            className="ClassPage-Leftscreen-ColorButton2"
            onClick={handleVocButton}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              單字集
            </Typography>
          </ColorButton2>
          {needHidden &&
            lessonName.map((item) => {
              return (
                <ColorButton2
                  className="ClassPage-Leftscreen-ColorButton3"
                  kkey={item.wordset_id}
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
            onClick={handleTestButton}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              測驗
            </Typography>
          </ColorButton2>
          <ColorButton2
            className="ClassPage-Leftscreen-ColorButton2"
            onClick={handleScoreButton}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              歷史成績
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
        {testStatus === false && ( //此為單字集、歷史成績、成員會顯示的東東
          <div className="CassPage-words">
            <div>
              <img src={Document} alt="Document" />
            </div>
            <div className="CassPage-words-text">
              {vocStatus === true && "Words"}
              {memberStatus === true &&
                data !== "undefined" &&
                "Members(" +
                  eval(
                    Number(data.student.length) + Number(data.teacher.length)
                  ) +
                  ")"}
              {scoreStatus === true && "Scores"}
            </div>
            <Search style={{ backgroundColor: "#E0E0DC", marginLeft: 750 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  handleSearchChange(e);
                }}
              />
            </Search>
          </div>
        )}
        {testStatus === true && (
          <div className="CassPage-test-title">
            <ColorButton
              variant="contained"
              style={{
                width: 100,
                height: 60,
                borderRadius: 10,
                marginRight: 30,
                float: "right",
              }}
              onClick={() => {handleTest();}}
            >
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold", color: "#858585" }}
              >
                提交
              </Typography>
            </ColorButton>
            <div className="CassPage-test-title-text">
              <div>已作答</div>

              <div>
                {word.filter((sword) => sword.test !== undefined).length}/
                {word.length > 0 && word.length}
              </div>
            </div>
          </div>
        )}
        <div>
          {vocStatus === true &&
            word.length > 0 &&
            word.map((item) => {
              return <WordList key={item.id} item={item} />;
            })}
          {/* {memberStatus === true && <MemberList />} */}
          {memberStatus === true &&
            data !== "undefined" &&
            data.teacher.map((item) => {
              return (
                <MemberList
                  key={item.user_id}
                  Identity={false}
                  item={item}
                  student={true}
                />
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
                  student={false}
                />
              );
            })}
          {scoreStatus === true &&
            data !== "undefined" &&
            data.map((item) => {
              return <StudentScore key={item.id} item={item} />;
            })}
          {/* {testStatus === true && <StudentTest />} */}
          {testStatus === true &&
            word.length > 0 &&
            word.map((item, index) => {
              return (
                <StudentTest
                  key={item.id}
                  item={item}
                  ind={index + 1}
                  len={word.length}
                  testAns={testAns}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default StudentClassPage;
