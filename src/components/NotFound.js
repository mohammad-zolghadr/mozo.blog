import React from "react";

// Style and Icons
import style from "../sass/NotFound.scss";
import image from "../assets/images/404Error.gif";

// Functions
import { getText, TextKey } from "../Text";
import useTitle from "../hooks/useTitle";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const NotFound = () => {
  const key = new TextKey();
  const { t, i18n } = useTranslation();
  useTitle(getText(key.NF_Page_Title, t, i18n));
  return (
    <div className="cContainer">
      <div className="nfContainer">
        <img src={image} />
        <p>{getText(key.NF_Title, t, i18n)}</p>
      </div>
    </div>
  );
};

export default NotFound;
