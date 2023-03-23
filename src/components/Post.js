import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "../sass/Post.scss";

// Functions
import { getText, TextKey } from "../Text";
import { downloadImage } from "../requests";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Post = (props) => {
  const { image, title, summary, author, date, category, id } = props.data;
  let navigate = useNavigate();
  const key = new TextKey();
  const [imageUrl, setImageUrl] = useState();
  const location = useLocation().pathname.split("/")[1];
  const { t, i18n } = useTranslation();

  downloadImage(image).then((url) => setImageUrl(url));

  return (
    <div className="postContainer">
      <img src={imageUrl} />
      <span className="postItemCategory">
        {getText(key.Mood, t, i18n) + category}
      </span>
      <div>
        <h3>{title}</h3>
        <div className="postDescriptionTextContainer">
          <p>{summary}</p>
          <span></span>
        </div>
        <div>
          <span>
            {getText(key.HL_Authour_Title, t, i18n)}
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
            {getText(key.HL_Btn_Continue, t, i18n)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
