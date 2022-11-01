import React from "react";

// styles & icons
import style from "../sass/Home.scss";
import bgImage from "../assets/images/home.jpg";

const Home = () => {
  return (
    <div className="homeContainer">
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
          <button className="secondaryBtn">مشاهده همه پست ها</button>
          <button className="primaryBtn">نوشتن پست جدید</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
