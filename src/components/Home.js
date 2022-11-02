import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// styles & icons
import style from "../sass/Home.scss";
import bgImage from "../assets/images/home.jpg";

// components
import Post from "./Post";

// Function
import { TextKey, getText } from "../Text";

// Firebase
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const data = [
  {
    image: bgImage,
    title: "یک فنجان قهوه و گوشه دنج",
    body: "اینجا پاییز است... چرا امسال پاییز اینقدر بی رحم است؟ واقعا انگار باید از اینجا رفت... اینجا بوی غریبگی می دهد... بوی تنهایی می دهد... باید رفت و گذشت",
    author: "محمد ذوالقدر",
    date: "1401/08/10",
    link: "Link Here",
  },
];

const Home = () => {
  let navigate = useNavigate();
  const key = new TextKey();
  const [postsList, setPostsList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    getPostsList();
  }, []);

  const getPostsList = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data() })));
  };

  return (
    <div>
      <div className="homeContainer">
        <img src={bgImage} />
        <span className="homeImageBlackCover"></span>
        <div className="homeMainLanding">
          <h3>{getText(key.HL_Title)}</h3>
          <div className="homeMainLandingDescription">
            <span></span>
            <ul>
              <li>{getText(key.HL_Option_1)}</li>
              <li>{getText(key.HL_Option_2)}</li>
              <li>{getText(key.HL_Option_3)}</li>
            </ul>
          </div>
          <div className="homeMainLandingBtns">
            <button onClick={() => navigate("/blog")} className="secondaryBtn">
              {getText(key.HL_Btn_SeeAllPost)}
            </button>
            <button
              onClick={() => navigate("/new-post")}
              className="primaryBtn"
            >
              {getText(key.HL_Btn_NewPost)}
            </button>
          </div>
        </div>
      </div>
      <div className="homePostsContainer">
        <h3
          onClick={() => {
            console.log(postsList);
          }}
        >
          {getText(key.HL_Title_LastBlog)}
        </h3>
        <div>
          {postsList &&
            postsList.map((el) => <Post key={el.image} data={el} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
