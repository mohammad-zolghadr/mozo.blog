import React from "react";
import { Link } from "react-router-dom";

import style from "../sass/Navbar.scss";
import gmailIcon from "../assets/images/gmail-icon.png";

const Navbar = () => {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>مود بلاگ</h1>
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/new-post">نوشتن پست جدید</Link>
            </li>
            <li>
              <Link to="/blog">بلاگ ها</Link>
            </li>
            <li>
              <Link to="/about-me">درباره من</Link>
            </li>
            <li>
              <button>
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
