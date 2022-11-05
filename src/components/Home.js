import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// styles & icons
import style from "../sass/Home.scss";
import bgImage from "../assets/images/home.jpg";

// components
import Post from "./Post";
import Loading from "./Loading";

// Function
import { TextKey, getText } from "../Text";
import { getPostsList } from "../requests";

const Home = () => {
  let navigate = useNavigate();
  const key = new TextKey();
  const [postsList, setPostsList] = useState();

  useEffect(() => {
    async function getData() {
      setPostsList(await getPostsList());
    }
    getData();
  }, []);

  return (
    <div className="homeWrapper">
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
        <h3>{getText(key.HL_Title_LastBlog)}</h3>
        <div>
          {!postsList ? (
            <Loading showFullScreen={false} />
          ) : (
            postsList.map((el) => <Post key={el.image} data={el} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
