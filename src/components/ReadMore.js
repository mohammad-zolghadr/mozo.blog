import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import Loading from "./Loading";

import style from "../sass/ReadMore.scss";

// Functions
import { getDataWithinId } from "../requests";
import { getText, TextKey } from "../Text";

// firebase
import { fStorage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

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

  useEffect(() => {
    getDataWithinId(postId).then((res) => {
      getDownloadURL(ref(fStorage, res.image)).then((url) => {
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

  return (
    <div className="cContainer">
      <div className="readMoreContainer">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <img src={value.image} />
            <div className="readMoreAuthorInfo">
              <span>
                {getText(key.HL_Authour_Title)}
                {value.author}
              </span>
              <span>{value.date}</span>
            </div>
            <h2>{value.title}</h2>
            <p>{value.body}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadMore;
