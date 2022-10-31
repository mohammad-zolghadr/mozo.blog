import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import Blog from "./components/Blog";
import AboutMe from "./components/AboutMe";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/not-Found" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
};

export default App;
