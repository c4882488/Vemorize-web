import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddWordListItem from "./AddWordListItem";
// import { Link } from "react-router-dom";
import "./App.css";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { useHistory } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FADA6F"),
  backgroundColor: "#FADA6F",
  "&:hover": {
    backgroundColor: "#FADA6F",
  },
}));

const AddWordList = (props) => {
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
  // 取得網址ID
  const { id, wid } = props.match.params;
  const [title, setTitle] = React.useState("");
  const [newLesson, setNewLesson] = React.useState({
    words: [{ id: wid !== undefined?null:1 }],
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // setNewLesson({
    //   ...newLesson,
    //   title: e.target.value,
    // });
  };

  // 增加單字卡
  const handleAddWords = () => {
    setNewLesson((prevState) => ({
      words: [
        ...prevState.words,
        { id: newLesson.words[prevState.words.length - 1].id + 1 },
      ],
    }));
  };

  // 單字卡更新資料
  const handleUpdateWords = (data) => {
    // console.log(data);
    const new_words = newLesson.words.map((word) => {
      return word.id === data.id ? data : word;
    });
    setNewLesson({
      words: new_words,
    });
  };
  // 刪除單字卡
  const handleDeleteWords = (id) => {
    if (newLesson.words.length > 1) {
      const new_words = newLesson.words.filter((word) => word.id !== id);
      setNewLesson({
        words: new_words,
      });
    } else {
      alert("至少要有一個單字卡");
    }
  };
  
  const [wordsetID, setWordsetID] = React.useState("");

  // 新增單字集
  const addword = async () => {
    await fetch("http://htdocs.vhost/project/public/newWordset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ class_id: id, wordset_name: title }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            // console.log(result.result[0].wordset_id);
            setWordsetID(result.result[0].wordset_id);
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
  // 修改單字集
  const updateWordSet = async () =>{
    await fetch("http://htdocs.vhost/project/public/updateWordset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ 
        "wordset_id": wid,
        "wordset_name": title
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            console.log(result.result);
            setWordsetID(wid);
            //
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

  // 修改單字集內容
  const updateWord = async () => {
    await fetch("http://htdocs.vhost/project/public/updateWordsetContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwtToken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ ...newLesson, wordset_id: Number(wordsetID) }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        switch (result.status) {
          case 200:
            console.log(result.result);
            if (result.result.fail === 0) {
              history.push("/TeacherClass/" + id);
            }
            //
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

  // 修改
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
        // console.log(result.result);
        switch (result.status) {
          case 200:
            setTitle(
              result.result.filter((sword) =>
                sword.wordset_id == wid
              )[0].wordset_name
            )
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
      
      await fetch(
        "http://htdocs.vhost/project/public/getWordsetContent?wordset_id=" +
          wid,
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
              // console.log(result.result);
              setNewLesson({words: result.result });

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

  const handleSubmit = () => {
    if (wid !== undefined) {
      updateWordSet();
    } else {
      addword();
    }
    updateWord();
  };

  React.useEffect(() => {
    if (wid !== undefined) {
      getData();
    }
    updateWord();
  }, [wordsetID]);

  const { words } = newLesson;
  return (
    <div>
      <CustomizedSnackbars
        open={open}
        state={state}
        snackText={snackText}
        onClick={handleSnackbaeClick}
        onClose={handleSnackbaeClose}
      />
      <div className="AddWordList-title">
        <div className="AddWordList-title-titleText">
          {wid !== undefined ? "修改" : "建立新"}單字集
        </div>
        <div className="AddWordList-title-AddListButton">
          {/* <Link to="/TeacherClass" style={{ textDecoration: "none" }}> */}
          <ColorButton
            variant="contained"
            style={{
              width: 150,
              height: 50,
              borderRadius: 30,
              marginTop: 50,
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              {wid !== undefined ? "修改" : "建立"}單字集
            </Typography>
          </ColorButton>
          {/* </Link> */}
        </div>
        <div className="AddWordList-title-titleName">
          <div style={{ marginTop: 15, display: "inline-block" }}>標題：</div>
          <TextField
            id="title"
            required
            label="請輸入標題"
            value={title || ""}
            variant="standard"
            sx={{ width: 250 }}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          {words.map((word) => (
            <AddWordListItem
              key={word.id}
              id={word.id}
              word={word}
              onChange={handleUpdateWords}
              onDelete={handleDeleteWords}
            />
          ))}
        </div>
        <div>
          <ColorButton
            variant="contained"
            style={{
              width: 150,
              height: 50,
              borderRadius: 30,
              marginTop: 50,
              marginLeft: 620,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold" }}
              onClick={() => {
                handleAddWords();
              }}
            >
              新增單字卡
            </Typography>
          </ColorButton>
        </div>
      </div>
    </div>
  );
};
export default AddWordList;
