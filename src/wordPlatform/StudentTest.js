import React from "react";
import TextField from "@mui/material/TextField";
import "./App.css";
//import { Link } from "react-router-dom";

const StudentTest = (props) => {
  const {
    item: { id, word_chinese },
    ind,
    len,
    testAns
  } = props;
  const [answer, setAnswer] = React.useState("");
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    testAns(id,e.target.value);
  };
  return (
    <div className="StudentTest-Item">
      <div style={{ marginTop: 30 }}>
        <div style={{ float: "right", marginTop: 30, marginRight: 30 }}>
          {ind}/{len}
        </div>
        <div style={{ marginLeft: 30, color: "#858585" }}>中文</div>
      </div>
      <div style={{ marginLeft: 60, marginTop: 50 }}>{word_chinese}</div>
      <div style={{ marginLeft: 50, marginTop: 180, color: "#858585" }}>
        輸入正確答案
      </div>
      <div style={{ marginLeft: 60, marginTop: 30 }}>
        <TextField
          required
          id="answer"
          label="輸入正確答案"
          variant="filled"
          value={answer}
          sx={{ width: 800, marginTop: 1 }}
          onChange={handleAnswerChange}
        />
      </div>
    </div>
  );
};
export default StudentTest;
