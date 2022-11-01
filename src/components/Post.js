import React from "react";
import { useNavigate } from "react-router-dom";

import style from "../sass/Post.scss";
import { getText, TextKey } from "../Text";

const Post = (props) => {
  const { image, title, body, author, date, link } = props.data;
  let navigate = useNavigate();
  const key = new TextKey();

  return (
    <div className="postContainer">
      <img src={image} />
      <div>
        <h3>{title}</h3>
        <p>{body.substring(0, 110)}...</p>
        <div>
          <span>
            {getText(key.HL_Authour_Title)}
            {author}
          </span>
          <span>{date}</span>
        </div>
        <div>
          <span></span>
          <button onClick={() => navigate(`/${link}`)}>
            {getText(key.HL_Btn_Continue)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
