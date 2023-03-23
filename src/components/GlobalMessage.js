import React from "react";

import style from "../sass/GlobalMessage.scss";
import { getText, TextKey } from "../Text";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const GlobalMessage = (props) => {
  const { message, image, closeGlobalMessage } = props.data;
  const key = new TextKey();
  const { t, i18n } = useTranslation();

  return (
    <div className="gMessageContainer">
      <img src={image} />
      <p>{message}</p>
      <button onClick={() => closeGlobalMessage(false)}>
        {getText(key.Ok, t, i18n)}
      </button>
    </div>
  );
};

export default GlobalMessage;
