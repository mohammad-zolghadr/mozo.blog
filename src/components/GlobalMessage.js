import React from "react";

import style from "../sass/GlobalMessage.scss";
import { getText, TextKey } from "../Text";

const GlobalMessage = (props) => {
  const { message, image, closeGlobalMessage } = props.data;
  const key = new TextKey();

  return (
    <div className="gMessageContainer">
      <img src={image} />
      <p>{message}</p>
      <button onClick={() => closeGlobalMessage(false)}>
        {getText(key.Ok)}
      </button>
    </div>
  );
};

export default GlobalMessage;
