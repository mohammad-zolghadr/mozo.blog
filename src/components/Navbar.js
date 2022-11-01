import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// styles & icons
import style from "../sass/Navbar.scss";
import gmailIcon from "../assets/images/gmail-icon.png";
import logoutIcon from "../assets/images/logout-icon.png";
import arrowIcon from "../assets/images/arrowMenu.png";

// function
import { getText, TextKey } from "../Text";

// Firebase
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";

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

  useEffect(() => {
    const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfoLocalStorage);
  }, []);

  const signInHandler = () => {
    closeNavResponsive();
    signInWithPopup(auth, provider)
      .then((res) => {
        const data = {
          isAuth: true,
          id: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
        };
        setUserInfo(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  };

  const signOutHandler = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setUserInfo({ isAuth: false, id: "", name: "", email: "", image: "" });
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
          <h1>{getText(key.NB_Main_Title)}</h1>
        </Link>

        <div onClick={navHandlerResponsive} className="btnResponsiveMenu">
          <span>{getText(key.NB_MenuResponsive)}</span>
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
                {getText(key.NB_MenuNewPost)}
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeNavResponsive}>
                {getText(key.NB_MenuBlogs)}
              </Link>
            </li>
            <li>
              <Link to="/about-me" onClick={closeNavResponsive}>
                {getText(key.NB_AboutMe)}
              </Link>
            </li>
            <li>
              {userInfo.isAuth ? (
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
                  {getText(key.NB_SignInGmail)}
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
