import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// styles & icons
import style from "../sass/NewPost.scss";
import voiceIco from "../assets/images/voice-ico.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function
import { TextKey, getText } from "../Text";
import { sendPost } from "../requests";

// components
import Loading from "./Loading";
import MoodsList from "./MoodsList";

const NewPost = () => {
  const key = new TextKey();
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [mood, setMood] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  // const [bodyTextHandler, setBodyTextHandler] = useState(false);
  const bodyText = useRef(null);

  const voiceTypingHandler = () => {
    if (!listening)
      SpeechRecognition.startListening({ continuous: true, language: "fa-IR" });
    else SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (transcript) {
      // let finalText;
      // if (bodyTextHandler === "") finalText = transcript;
      // else {
      //   finalText = `${bodyTextHandler} ${transcript}`;
      //   // setBodyTextHandler("");
      // }
      // finalText &&
      // if (!bodyTextHandler) {
      //   setInputValue({
      //     ...inputValue,
      //     body: `${bodyText.current.value} ${transcript}`,
      //   });
      //   setBodyTextHandler(true);
      // } else {
      setInputValue({
        ...inputValue,
        body: transcript,
      });
      // }
    }
  }, [transcript]);

  // useEffect(() => {
  //   // setBodyTextHandler(bodyText.current.value);
  // }, [inputValue.body]);

  const inputHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]:
        e.target.name !== "image" ? e.target.value : e.target.files[0],
    });

    if (e.target.name === "image" && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);

  const sendData = (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // all field Filled
    if (!inputValue.title || !inputValue.body || !inputValue.image) {
      errorToast(getText(key.NP_ErrorFillFields));
      return;
    }
    // maximum image size 200KB
    if (+inputValue.image.size / 1000 > 200) {
      errorToast(getText(key.NP_ErrorImageSize));
      return;
    }

    // user is Auth and Post
    if (userInfo && userInfo.isAuth) {
      setIsLoading(true);
      if (inputValue.image == null) return;
      sendPost(
        inputValue.image,
        inputValue.title,
        inputValue.body,
        userInfo.name,
        userInfo.email,
        mood,
        successToast,
        errorToast,
        setIsLoading,
        setInputValue
      );
    } else errorToast(getText(key.NP_ErrorAuth));
  };

  return (
    <div className="cContainer">
      <ToastContainer position="bottom-left" autoClose={4000} />
      {isLoading && <Loading showFullScreen={true} />}
      <form onSubmit={sendData} className="newPostFormContainer">
        <input
          name="title"
          type="text"
          value={inputValue.title}
          onChange={inputHandler}
          placeholder={getText(key.NP_PH_Title)}
        />
        <div className="newPostTextAreaContainer">
          <textarea
            name="body"
            ref={bodyText}
            value={inputValue.body}
            onChange={inputHandler}
            placeholder={getText(key.NP_PH_Text)}
          ></textarea>
          <div>
            {listening && <div></div>}
            <img src={voiceIco} onClick={voiceTypingHandler} />
          </div>
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
            accept="image/png, image/jpeg"
          />
          {inputValue.image && (
            <img className="newPostImagePreview" src={previewImage} />
          )}
          <span className="newPostImageCondition">
            {getText(key.NP_MaximumPicSize)}
          </span>
        </div>
        <MoodsList mood={setMood} />
        <button type="submit" className="newPostSubmit">
          {getText(key.NP_Btn_Post)}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
