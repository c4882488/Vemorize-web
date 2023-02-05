import React from "react";
import avatarStu from "./imgs/avatarStu.png";
import "./App.css";
//import { Link } from "react-router-dom";

const StudentScore = (props) => {
  const {
    item: { wordset_name, user_name, quiz_score },
  } = props;
  return (
    <div className="MemberList">
      <div
        style={{
          width: 100,
          height: 100,
          display: "inline-block",
          position: "absolute",
        }}
      >
        <img src={avatarStu} alt="avatarStu" className="StudentScore-img" />
      </div>
      <div style={{ display: "inline-block" }}>
        <div className="StudentScore-title">學生</div>
        <div className="StudentScore-name">{user_name}</div>
      </div>
      <div className="StudentScore-LessonText">{wordset_name}</div>
      <div className="StudentScore-Score">{quiz_score}/100</div>
    </div>
  );
};
export default StudentScore;
