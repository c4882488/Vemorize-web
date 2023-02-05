import React from "react";
import { ReactComponent as AvatarSVG } from "./svgs/avatar.svg";
// import avatarStu from "./imgs/avatarStu.png";
import TrashCan2 from "./imgs/TrashCan2.png";
import "./App.css";
import { IconButton } from "@mui/material";
//import { Link } from "react-router-dom";

const MemberList = (props) => {
  const {
    item: { user_name },
    student,
    Identity,
  } = props;
  return (
    <div className="MemberList">
      <div
        style={{
          width: 100,
          height: 100,
          display: "inline-block",
        }}
      >
        <AvatarSVG style={{ marginLeft: 25, marginTop: 25 }} />
        {/* <img src={avatarStu} alt="avatarStu" className="MemberList-img" /> */}
      </div>
      <div style={{ display: "inline-block" }}>
        <div className="MemberList-title">
          {!Identity ? "班級管理員" : "學生"}
        </div>
        <div className="MemberList-name">{user_name}</div>
      </div>
      {Identity && student ? (
        <IconButton
          className="MemberList-TCimg"
          style={{ marginTop: 30, marginRight: 30 }}
          onClick={() =>
            props.item.handleDeleteNumbered(props.item.stuednt_user_id)
          }
        >
          <img
            src={TrashCan2}
            alt="TrashCan2"
            style={{ width: 35, height: 35 }}
          />
        </IconButton>
      ) : null}
    </div>
  );
};
export default MemberList;
