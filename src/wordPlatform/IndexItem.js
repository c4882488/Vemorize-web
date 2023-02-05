import React from "react";
import ClassImg from "./imgs/ClassImg.png";
import { ReactComponent as AvatarSVG } from "./svgs/avatar.svg";
import "./App.css";
import { Link } from "react-router-dom";

const IndexItem = (props) => {
  const {
    item: { class_id, id, class_name, teacher_name, user_name },
    isTeacher,
  } = props;

  const getWordUrl = () => {
    if (isTeacher) {
      return "/TeacherClass/"+ id;
    }
    return "/StudentClass/" + class_id;
  };

  return (
    <Link to={getWordUrl()} style={{ color: "#000000" }}>
      <div className="index-item">
        <img src={ClassImg} alt={ClassImg} className="index-item-img" />
        <div className="index-item-classText">{class_name}</div>
        <AvatarSVG className="index-item-AvatarSVG" />
        <div className="index-item-Avatar">
          {isTeacher ? user_name : teacher_name}
        </div>
      </div>
    </Link>
  );
};
export default IndexItem;
