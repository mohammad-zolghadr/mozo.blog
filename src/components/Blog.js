import React, { useState, useEffect } from "react";

import style from "../sass/Blog.scss";

// components
import Post from "./Post";
import Loading from "./Loading";

// Function
import { TextKey, getText } from "../Text";
import { getPostsList, getMoodsList } from "../requests";

const Blog = () => {
  const [categorySelected, setCategorySelected] = useState(0);
  const key = new TextKey();
  const [categories, setCategories] = useState();
  const [postsList, setPostsList] = useState();

  useEffect(() => {
    async function getData() {
      setPostsList(await getPostsList());
      setCategories(await getMoodsList());
    }
    getData();
  }, []);

  const changeCategory = (e) => {
    const index = categories.findIndex(
      (element) => element === e.target.innerText
    );
    setCategorySelected(index);
  };

  return (
    <div className="cContainer">
      <div className="bp_categoriesContaner">
        {categories &&
          categories.map((el, index) => {
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
