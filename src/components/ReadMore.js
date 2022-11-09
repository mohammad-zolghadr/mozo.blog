import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Functions
import { getDataWithinId } from "../requests";

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
  const location = useLocation().pathname.split("/");
  const postId = +location[location.length - 1];

  useEffect(() => {
    getDataWithinId(postId).then((res) => {
      setValue({
        title: res.title,
        body: res.body,
        mood: res.category,
        date: res.date,
        author: res.author,
      });
      getDownloadURL(ref(fStorage, res.image)).then((url) => {
        setValue({ ...value, image: url });
      });
    });
  }, []);

  return (
    <div className="cContainer">
      <img src={value.image} />
      <h3>{value.title}</h3>
      <p>{value.body}</p>
    </div>
  );
};

export default ReadMore;
