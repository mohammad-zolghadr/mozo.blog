import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import Blog from "./components/Blog";
import AboutMe from "./components/AboutMe";
import NotFound from "./components/NotFound";
import GlobalMessage from "./components/GlobalMessage";
import ReadMore from "./components/ReadMore";

// Function
import { getText, TextKey } from "./Text";

import vpnIcon from "./assets/images/vpn.png";

const App = () => {
  const key = new TextKey();
  const [isShowingGlobalMessage, setIsShowingGlobalMessage] = useState();

  useEffect(() => {
    // only show message in First Time
    const showVpnOn = JSON.parse(localStorage.getItem("showVpnOn"));
    if (showVpnOn != null) setIsShowingGlobalMessage(showVpnOn);
    else {
      setIsShowingGlobalMessage(true);
      localStorage.setItem("showVpnOn", JSON.stringify(false));
    }
  }, []);

  return (
    <div>
      <Navbar />
      {isShowingGlobalMessage && (
        <GlobalMessage
          data={{
            message: getText(key.TurnOnVPN),
            image: vpnIcon,
            closeGlobalMessage: setIsShowingGlobalMessage,
          }}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ReadMore />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/not-Found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
};

export default App;
