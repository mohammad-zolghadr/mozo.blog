import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// styles & icons
import style from "../sass/Navbar.scss";
import gmailIcon from "../assets/images/gmail-icon.png";
import arrowIcon from "../assets/images/arrowMenu.png";

// function
import { getText, TextKey } from "../Text";
import { mSignUp, mSignOut } from "../requests";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Navbar = () => {
  const key = new TextKey();
  const [navTopResponsive, setNavTopResponsive] = useState(true);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isAuth: false,
    id: "",
    name: "",
    email: "",
    image: "",
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
    userInfoLocalStorage && setUserInfo(userInfoLocalStorage);
  }, []);

  const signInHandler = () => {
    closeNavResponsive();
    mSignUp().then((data) => setUserInfo(data));
  };

  const signOutHandler = () => {
    closeNavResponsive();
    mSignOut().then(() => {
      setUserInfo({ isAuth: false, id: "", name: "", email: "", image: "" });
      navHandlerResponsive();
    });
  };

  const navHandlerResponsive = () => {
    setNavTopResponsive(!navTopResponsive);
  };

  const closeNavResponsive = () => {
    setNavTopResponsive(true);
  };

  return (
    <div>
      <header>
        <Link to="/" onClick={closeNavResponsive}>
          <h1>{getText(key.NB_Main_Title, t, i18n)}</h1>
        </Link>

        <div onClick={navHandlerResponsive} className="btnResponsiveMenu">
          <span>{getText(key.NB_MenuResponsive, t, i18n)}</span>
          <img src={arrowIcon} />
        </div>

        <nav
          style={{
            top: !navTopResponsive && "54px",
          }}
        >
          <ul>
            <li>
              <Link to="/new-post" onClick={closeNavResponsive}>
                {getText(key.NB_MenuNewPost, t, i18n)}
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeNavResponsive}>
                {getText(key.NB_MenuBlogs, t, i18n)}
              </Link>
            </li>
            <li>
              <Link to="/about-me" onClick={closeNavResponsive}>
                {getText(key.NB_AboutMe, t, i18n)}
              </Link>
            </li>
            <li>
              {userInfo && userInfo.isAuth ? (
                <div className="navbarUsername" onClick={signOutHandler}>
                  <div
                    onMouseEnter={() => setIsShowLogout(true)}
                    onMouseLeave={() => setIsShowLogout(false)}
                  >
                    <span>{userInfo.name}</span>
                    <img src={userInfo.image} />
                  </div>
                  {isShowLogout && (
                    <span className="showLogoutInfo">خروج از حساب</span>
                  )}
                </div>
              ) : (
                <button onClick={signInHandler}>
                  <img src={gmailIcon} />
                  {getText(key.NB_SignInGmail, t, i18n)}
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
