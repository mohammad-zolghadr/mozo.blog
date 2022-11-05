import React from "react";

const ReadMore = (props) => {
  const { title, body, image, author, date } = props.data;
  return (
    <div>
      <img src={image} />
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default ReadMore;
