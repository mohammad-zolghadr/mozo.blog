import React from "react";
import { useNavigate } from "react-router-dom";

// styles & icons
import style from "../sass/Home.scss";
import bgImage from "../assets/images/home.jpg";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="homeContainer">
      <div>
        <img src={bgImage} />
        <span className="homeImageBlackCover"></span>
        <div className="homeMainLanding">
          <h3>هر چه میخواهد دل تنگت بگو!</h3>
          <div className="homeMainLandingDescription">
            <span></span>
            <ul>
              <li>پست کردن مطالب با دسته بندی متفاوت</li>
              <li>امکان تایپ مطالب با ویس</li>
              <li>ثبت نام با جیمیل</li>
            </ul>
          </div>
          <div className="homeMainLandingBtns">
            <button onClick={() => navigate("/blog")} className="secondaryBtn">
              مشاهده همه پست ها
            </button>
            <button
              onClick={() => navigate("/new-post")}
              className="primaryBtn"
            >
              نوشتن پست جدید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
