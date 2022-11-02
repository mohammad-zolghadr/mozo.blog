import React, { useState } from "react";

// firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { fStorage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";

// styles & icons
import style from "../sass/NewPost.scss";
import voiceIco from "../assets/images/voice-ico.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function
import { TextKey, getText } from "../Text";

// components
import Loading from "./Loading";

const NewPost = () => {
  const key = new TextKey();
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");

  const inputHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]:
        e.target.name !== "image" ? e.target.value : e.target.files[0],
    });
  };

  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);

  // const loadUploadedImageToUi = () => {
  //   const reader = new FileReader();
  //   const url = reader.readAsDataURL(inputValue.image);
  //   reader.onloadend = () => {
  //     console.log(reader.result);
  //     setPreviewImage(reader.result);
  //   };
  //   console.log(url);
  // };

  const postCollectionRef = collection(db, "posts");
  const sendData = (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.isAuth) {
      setIsLoading(true);
      if (inputValue.image == null) return;
      const imageRef = ref(fStorage, `postImage/${inputValue.image.name}`);
      uploadBytes(imageRef, inputValue.image)
        .then((res) => {
          addDoc(postCollectionRef, {
            title: inputValue.title,
            body: inputValue.body,
            image: res.metadata.fullPath,
            author: userInfo.name,
            email: userInfo.email,
            date: new Date().toLocaleDateString("fa-IR"),
          })
            .then(() => {
              setIsLoading(false);
              setInputValue({
                title: "",
                body: "",
                image: "",
              });
              successToast(getText(key.NP_SuccessPost));
            })
            .catch(() => {
              setIsLoading(false);
              errorToast(getText(key.NP_ErrorPost));
            });
        })
        .catch((err) => {
          setIsLoading(false);
          errorToast(getText(key.NP_ErrorPost));
        });
    } else errorToast(getText(key.NP_ErrorAuth));
  };

  const uploadImage = () => {
    if (inputValue.image == null) return;
    const imageRef = ref(fStorage, `postImage/${inputValue.image.name}`);
    uploadBytes(imageRef, inputValue.image).then((res) => {
      return res.metadata.fullPath;
    });
  };

  return (
    <div className="cContainer">
      <ToastContainer position="bottom-left" autoClose={4000} />
      {isLoading && <Loading />}
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
          {/* {inputValue.image && (
            <>
              {loadUploadedImageToUi}
              <img src={previewImage} />
            </>
          )} */}
        </div>
        <button type="submit" className="newPostSubmit">
          {getText(key.NP_Btn_Post)}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
