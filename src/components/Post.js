import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "../sass/Post.scss";
import { getText, TextKey } from "../Text";
import { downloadImage } from "../requests";

const Post = (props) => {
  const { image, title, body, author, date, category, id } = props.data;
  let navigate = useNavigate();
  const key = new TextKey();
  const [imageUrl, setImageUrl] = useState();
  const location = useLocation().pathname.split("/")[1];

  downloadImage(image).then((url) => setImageUrl(url));

  return (
    <div className="postContainer">
      <img src={imageUrl} />
      <span className="postItemCategory">مود : {category}</span>
      <div>
        <h3>{title}</h3>
        <div className="postDescriptionTextContainer">
          <p>{body.substring(0, 120)}...</p>
          <span></span>
        </div>
        <div>
          <span>
            {getText(key.HL_Authour_Title)}
            {author}
          </span>
          <span>{date}</span>
        </div>
        <div>
          <span></span>
          <button
            onClick={() => {
              if (location && location === "blog") navigate(`${id}`);
              else navigate(`blog/${id}`);
            }}
          >
            {getText(key.HL_Btn_Continue)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
