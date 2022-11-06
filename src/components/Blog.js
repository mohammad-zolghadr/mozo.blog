import React, { useState, useEffect } from "react";

// components
import Post from "./Post";
import Loading from "./Loading";
import MoodsList from "./MoodsList";

// Function
import { getPostsList } from "../requests";
import { getText, TextKey } from "../Text";

import listEmpty from "../assets/images/search_empty.png";

const Blog = () => {
  const key = new TextKey();
  const [mood, setMood] = useState();
  const [postsList, setPostsList] = useState();
  const [postsListUnchange, setPostsListUnchange] = useState();

  useEffect(() => {
    async function getData() {
      const fetchedData = await getPostsList();
      setPostsList(fetchedData);
      setPostsListUnchange(fetchedData);
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(mood, postsList, postsListUnchange);
    if (mood) {
      if (mood === "همه") setPostsList(postsListUnchange);
      else
        setPostsList(
          postsListUnchange.filter((element) => element.category === mood)
        );
    }
  }, [mood]);

  return (
    <div className="cContainer">
      <MoodsList mood={setMood} />
      <div className="homePostsContainer">
        <div>
          {!postsList ? (
            <Loading showFullScreen={false} />
          ) : (
            postsList.map((el) => <Post key={el.image} data={el} />)
          )}
          {postsList && postsList.length === 0 && (
            <div className="postsListEmpty">
              <img src={listEmpty} />
              <p>{getText(key.HL_EMPTY_LIST)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
