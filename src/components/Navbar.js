import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "../sass/Navbar.scss";
import gmailIcon from "../assets/images/gmail-icon.png";
import arrowIcon from "../assets/images/arrowMenu.png";

import { getText, TextKey } from "../Text";

const Navbar = () => {
  const [navTopResponsive, setNavTopResponsive] = useState(true);

  const key = new TextKey();

  const navHandlerResponsive = () => {
    setNavTopResponsive(!navTopResponsive);
  };

  const closeNavResponsive = () => {
    setNavTopResponsive(true);
  };

  const signIn = () => {
    closeNavResponsive();
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
              <button onClick={signIn}>
                <img src={gmailIcon} />
                {getText(key.NB_SignInGmail)}
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
