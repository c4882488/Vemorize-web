import React from "react";
import avatarStu from "./imgs/avatarStu.png";
import "./App.css";

const AllStudentList = (props) => {
  const {
    handleShowScore,
    item: { user_name, stuednt_user_id },
  } = props;
  return (
    <>
      <div className="MemberList" onClick={() => handleShowScore(stuednt_user_id)}>
        <div
          style={{
            width: 100,
            height: 100,
            display: "inline-block",
          }}
        >
          <img src={avatarStu} alt="avatarStu" className="MemberList-img" />
        </div>
        <div style={{ display: "inline-block" }}>
          <div className="MemberList-title">學生</div>
          <div className="MemberList-name">{user_name}</div>
        </div>
      </div>
    </>
  );
};
export default AllStudentList;
