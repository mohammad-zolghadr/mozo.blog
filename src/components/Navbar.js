import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "../sass/Navbar.scss";
import gmailIcon from "../assets/images/gmail-icon.png";
import arrowIcon from "../assets/images/arrowMenu.png";

const Navbar = () => {
  const [navTopResponsive, setNavTopResponsive] = useState(true);

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
          <h1>مود بلاگ</h1>
        </Link>

        <div onClick={navHandlerResponsive} className="btnResponsiveMenu">
          <span>دسترسی سریع</span>
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
                نوشتن پست جدید
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeNavResponsive}>
                بلاگ ها
              </Link>
            </li>
            <li>
              <Link to="/about-me" onClick={closeNavResponsive}>
                درباره من
              </Link>
            </li>
            <li>
              <button onClick={signIn}>
                <img src={gmailIcon} />
                ورود با Gmail
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
