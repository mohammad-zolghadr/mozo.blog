import React from "react";

import style from "../sass/NewPost.scss";
import voiceIco from "../assets/images/voice-ico.png";

// Function
import { TextKey, getText } from "../Text";

const NewPost = () => {
  const key = new TextKey();
  return (
    <div className="cContainer">
      <form className="newPostFormContainer">
        <input type="text" placeholder={getText(key.NP_PH_Title)} />
        <div>
          <textarea placeholder={getText(key.NP_PH_Text)}></textarea>
          <img src={voiceIco} />
        </div>
        <div className="newPostFileChooser">
          <label htmlFor="file-upload" className="newPostFileUpload">
            {getText(key.NP_IN_File)}
          </label>
          <input id="file-upload" type="file" />
          <button>{getText(key.NP_Btn_Login)}</button>
        </div>
        <button className="newPostSubmit">{getText(key.NP_Btn_Post)}</button>
      </form>
    </div>
  );
};

export default NewPost;
