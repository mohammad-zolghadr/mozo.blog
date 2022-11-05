import React from "react";

// Styles and Icons
import style from "../sass/AboutMe.scss";
import profile from "../assets/images/profile.jpg";

// Functions
import { getText, TextKey } from "../Text";

const AboutMe = () => {
  const key = new TextKey();
  return (
    <div className="cContainer">
      <div className="AM_Container">
        <img src={profile} />
        <div>
          <h4>{getText(key.AM_NAME)}</h4>
          <span>{getText(key.AM_SPECIALTY)}</span>
        </div>
        <hr />
        <p>
          سلام امیدوارم خوب باشین همینجوری یه متن تستی الان اینجا مینویسم ولی
          بعدا کاری میکنم که از سمت سرور بیاد اطلاعاتش
        </p>
        <a href="https://mohammadzolghadr.ir" target="_blank">
          {getText(key.AM_SEE_MY_WEB)}
        </a>
        <p className="AM_footer">
          Made with <span>&#x2764;</span> | Shiraz - 1401
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
