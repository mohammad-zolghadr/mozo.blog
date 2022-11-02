import React, { useState } from "react";

// firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

// styles & icons
import style from "../sass/NewPost.scss";
import voiceIco from "../assets/images/voice-ico.png";

// Function
import { TextKey, getText } from "../Text";

const NewPost = () => {
  const key = new TextKey();
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    image: "",
  });

  const inputHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]:
        e.target.name !== "image" ? e.target.value : e.target.files[0],
    });
  };

  const postCollectionRef = collection(db, "posts");
  const sendData = async (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo.isAuth);
    if (userInfo.isAuth) {
      await addDoc(postCollectionRef, {
        ...inputValue,
        author: userInfo.name,
        email: userInfo.email,
        date: new Date().toLocaleDateString("fa-IR"),
      });
    } else alert("You Must Login First!");
  };

  return (
    <div className="cContainer">
      <form onSubmit={sendData} className="newPostFormContainer">
        <input
          name="title"
          type="text"
          value={inputValue.title}
          onChange={inputHandler}
          placeholder={getText(key.NP_PH_Title)}
        />
        <div>
          <textarea
            name="body"
            value={inputValue.body}
            onChange={inputHandler}
            placeholder={getText(key.NP_PH_Text)}
          ></textarea>
          <img src={voiceIco} />
        </div>
        <div className="newPostFileChooser">
          <label htmlFor="file-upload" className="newPostFileUpload">
            {getText(key.NP_IN_File)}
          </label>
          <input
            name="image"
            id="file-upload"
            type="file"
            onChange={inputHandler}
          />
          <button>{getText(key.NP_Btn_Login)}</button>
        </div>
        <button type="submit" className="newPostSubmit">
          {getText(key.NP_Btn_Post)}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
