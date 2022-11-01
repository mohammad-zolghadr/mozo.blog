import React from "react";
import { useNavigate } from "react-router-dom";

// styles & icons
import style from "../sass/Home.scss";
import bgImage from "../assets/images/home.jpg";

// components
import Post from "./Post";

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
  return (
    <div>
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
      <div className="homePostsContainer">
        <h3>مطالب اخیر</h3>
        <div>
          <Post data={data[0]} />
          <Post data={data[0]} />
          <Post data={data[0]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
