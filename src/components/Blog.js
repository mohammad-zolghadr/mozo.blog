import React, { useState, useEffect } from "react";

import style from "../sass/Blog.scss";

// components
import Post from "./Post";
import Loading from "./Loading";

// Function
import { TextKey, getText } from "../Text";

// Firebase
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const Blog = () => {
  const [categorySelected, setCategorySelected] = useState(0);
  const categories = [
    "همه",
    "غمگین",
    "خوشحال",
    "عاشقانه",
    "انرژی مثبت",
    "انگیزشی",
    "مناسبتی",
    "فاز سنگین",
  ];
  const key = new TextKey();
  const [postsList, setPostsList] = useState();
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    getPostsList();
  }, []);

  const getPostsList = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data() })));
  };

  const changeCategory = (e) => {
    const index = categories.findIndex(
      (element) => element === e.target.innerText
    );
    setCategorySelected(index);
  };

  return (
    <div className="cContainer">
      <div className="bp_categoriesContaner">
        {categories.map((el, index) => {
          if (index !== categorySelected) {
            return (
              <span onClick={changeCategory} key={index}>
                {el}
              </span>
            );
          } else {
            return (
              <span
                className="bp_categorySelected"
                onClick={changeCategory}
                key={index}
              >
                {el}
              </span>
            );
          }
        })}
      </div>
      <div className="homePostsContainer">
        <div>
          {!postsList ? (
            <Loading showFullScreen={false} />
          ) : (
            postsList.map((el) => <Post key={el.image} data={el} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
