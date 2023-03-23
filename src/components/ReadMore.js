import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

//Components
import Loading from "./Loading";

import style from "../sass/ReadMore.scss";

// Functions
import { getDataWithinId, downloadImage } from "../requests";
import { getText, TextKey } from "../Text";
import useTitle from "../hooks/useTitle";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const ReadMore = () => {
  const [value, setValue] = useState({
    title: "",
    body: "",
    image: "",
    author: "",
    date: "",
    mood: "",
  });
  const key = new TextKey();
  const location = useLocation().pathname.split("/");
  const postId = +location[location.length - 1];
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getDataWithinId(postId).then((res) => {
      downloadImage(res.image).then((url) => {
        setIsLoading(false);
        setValue({
          title: res.title,
          body: res.body,
          mood: res.category,
          date: res.date,
          author: res.author,
          image: url,
        });
      });
    });
  }, []);

  useTitle(value.title);

  return (
    <div className="cContainer">
      <div className="readMoreContainer">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <img src={value.image} />
            <div className="readMoreAuthorInfo">
              <span>
                {getText(key.HL_Authour_Title, t, i18n)}
                {value.author}
              </span>
              <span>{value.date}</span>
            </div>
            <h2>{value.title}</h2>
            <div>{value && parse(value.body)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadMore;
