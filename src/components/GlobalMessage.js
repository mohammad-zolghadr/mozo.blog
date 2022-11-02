import React from "react";

import style from "../sass/GlobalMessage.scss";

const GlobalMessage = (props) => {
  const { message, image, closeGlobalMessage } = props.data;
  return (
    <div className="gMessageContainer">
      <img src={image} />
      <p>{message}</p>
      <button onClick={() => closeGlobalMessage(false)}>باشه</button>
    </div>
  );
};

export default GlobalMessage;
