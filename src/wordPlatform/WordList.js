import React from "react";
import ClassImg from "./imgs/ClassImg.png";
import { ReactComponent as StarSVG } from "./svgs/star.svg";
import "./App.css";

const WordList = (props) => {
  const { word_english, word_chinese, word_meaning, word_pos } = props.item;
  return (
    <div className="ClassPage-WordList">
      <div className="ClassPage-WordList-star">
        <StarSVG className="ClassPage-WordList-star-svg" />
      </div>
      <div className="ClassPage-WordList-word">
        <div className="ClassPage-WordList-word-vec">{word_english}</div>
        <div className="ClassPage-WordList-word-Verb">
          ({word_pos}) {word_chinese}
        </div>
        <div className="ClassPage-WordList-word-meaning">{word_meaning}</div>
      </div>
      <img src={ClassImg} alt={ClassImg} className="ClassPage-WordList-img" />
    </div>
  );
};
export default WordList;
