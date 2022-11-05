import React, { useState, useEffect } from "react";

// components
import Post from "./Post";
import Loading from "./Loading";
import MoodsList from "./MoodsList";

// Function
import { getPostsList } from "../requests";

const Blog = () => {
  const [mood, setMood] = useState();
  const [postsList, setPostsList] = useState();

  useEffect(() => {
    async function getData() {
      setPostsList(await getPostsList());
    }
    getData();
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Blog;
