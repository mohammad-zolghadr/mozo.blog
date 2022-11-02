import React from "react";

import style from "../sass/Loading.scss";

const Loading = (props) => {
  const { showFullScreen } = props;

  return (
    <>
      {showFullScreen ? (
        <div className="loadingCircleContainer">
          <div className="loadingCircle"></div>
        </div>
      ) : (
        <div>
          <div className="loadingCircle"></div>
        </div>
      )}
    </>
  );
};

export default Loading;
