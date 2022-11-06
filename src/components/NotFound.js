import React from "react";

// Style and Icons
import style from "../sass/NotFound.scss";
import image from "../assets/images/404Error.gif";

// Functions
import { getText, TextKey } from "../Text";

const NotFound = () => {
  const key = new TextKey();
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
