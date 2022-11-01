import React from "react";
import { useNavigate } from "react-router-dom";

import style from "../sass/Post.scss";

const Post = (props) => {
  const { image, title, body, author, date, link } = props.data;
  let navigate = useNavigate();

  return (
    <div className="postContainer">
      <img src={image} />
      <div>
        <h3>{title}</h3>
        <p>{body.substring(0, 110)}...</p>
        <div>
          <span>نوشته شده توسط : {author}</span>
          <span>{date}</span>
        </div>
        <div>
          <span></span>
          <button onClick={() => navigate(`/${link}`)}>ادامه مطلب</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
