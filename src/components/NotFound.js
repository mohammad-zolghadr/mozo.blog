import React from "react";

// Style and Icons
import style from "../sass/NotFound.scss";
import image from "../assets/images/404Error.gif";

// Functions
import { getText, TextKey } from "../Text";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  const key = new TextKey();
  useTitle(getText(key.NF_Page_Title));
  return (
    <div className="cContainer">
      <div className="nfContainer">
        <img src={image} />
        <p>{getText(key.NF_Title)}</p>
      </div>
    </div>
  );
};

export default NotFound;
