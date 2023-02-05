import React from "react";
import TextField from "@mui/material/TextField";
import ClassImg from "./imgs/ClassImg.png";
import TrashCan from "./imgs/TrashCan.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import "./App.css";
import { IconButton } from "@mui/material";

const AddWordListItem = (props) => {
  // console.log(props.word);
  const [words, setWords] = React.useState({
    id: props.id,
    word_english: props.word.word_english != "" ? props.word.word_english : "",
    word_chinese: props.word.word_chinese != "" ? props.word.word_chinese : "",
    word_meaning: props.word.word_meaning != "" ? props.word.word_meaning : "",
    word_pos: props.word.word_pos != "" || props.word.word_pos !== undefined ? props.word.word_pos : "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWords({
      ...words,
      [name]: value,
    });
  };
  React.useEffect(() => {
    const { onChange } = props;
    onChange(words);
    
  }, [words]);

  const handleDeleteWord = () => {
    const { onDelete } = props;
    onDelete(words.id);
    // console.log(this.state.id);
  };

  const { word_english, word_chinese, word_meaning, word_pos } = words;
  return (
    <div className="AddWordListItem">
      <IconButton
        className="AddWordListItem-trashCan"
        style={{ marginRight: 20, marginTop: 10 }}
        onClick={() => {
          handleDeleteWord();
        }}
      >
        <img src={TrashCan} alt={TrashCan} style={{ width: 20, height: 20 }} />
      </IconButton>
      <div>
        <div
          style={{
            marginTop: 35,
            marginLeft: 20,
            display: "inline-block",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          英文：
        </div>
        <TextField
          required
          id="title"
          label="請輸入英文"
          value={word_english}
          variant="standard"
          name="word_english"
          sx={{ width: 450, marginTop: 2 }}
          onChange={handleChange}
        />
      </div>

      <div>
        <img
          src={ClassImg}
          alt={ClassImg}
          className="AddWordListItem-Classimg"
        />
      </div>
      <div>
        <div
          style={{
            marginTop: 35,
            marginLeft: 20,
            display: "inline-block",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          中文：
        </div>
        <TextField
          required
          id="title"
          label="請輸入中文"
          value={word_chinese}
          variant="standard"
          name="word_chinese"
          sx={{ width: 450, marginTop: 2 }}
          onChange={handleChange}
        />
      </div>

      <div>
        <div
          style={{
            marginTop: 35,
            marginLeft: 20,
            display: "inline-block",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          釋義：
        </div>
        <TextField
          required
          id="title"
          label="請輸入釋義"
          value={word_meaning}
          variant="standard"
          name="word_meaning"
          sx={{ width: 450, marginTop: 2 }}
          onChange={handleChange}
        />
      </div>
      <div>
        <div
          style={{
            marginTop: 35,
            marginLeft: 20,
            display: "inline-block",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          詞性：
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="partOfSpeech">詞性</InputLabel>
          <Select
            required
            labelId="partOfSpeech"
            id="partOfSpeech-Select"
            value={word_pos}
            onChange={handleChange}
            label="partOfSpeech"
            name="word_pos"
          >
            <MenuItem value="n.">名詞</MenuItem>
            <MenuItem value="v.">動詞</MenuItem>
            <MenuItem value="adj.">形容詞</MenuItem>
            <MenuItem value="adv.">副詞</MenuItem>
            <MenuItem value="prep.">介系詞</MenuItem>
            <MenuItem value="conj.">連接詞</MenuItem>
            <MenuItem value="pron.">代名詞</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
export default AddWordListItem;
