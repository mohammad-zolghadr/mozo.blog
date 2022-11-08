import React, { useState, useEffect } from "react";

import style from "../sass/Blog.scss";

// components
import Post from "./Post";
import Loading from "./Loading";
import MoodsList from "./MoodsList";

// Function
import { getPostsList, getPostsCount } from "../requests";
import { getText, TextKey } from "../Text";

import listEmpty from "../assets/images/search_empty.png";

const Blog = () => {
  const key = new TextKey();
  const [mood, setMood] = useState();
  const [postsList, setPostsList] = useState([]);
  const [postsListUnchange, setPostsListUnchange] = useState([]);
  const [lastPostFetched, setLastPostFetched] = useState(0);
  const [postCollectionSize, setPostCollectionSize] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const countPostFetchPerRequest = 2;

  useEffect(() => {
    async function getData() {
      const fetchedData = await getPostsList(
        lastPostFetched,
        countPostFetchPerRequest
      );
      setIsLoading(false);
      if (postsList && postsListUnchange) {
        setPostsList([...postsList, ...fetchedData]);
        setPostsListUnchange([...postsListUnchange, ...fetchedData]);
      } else {
        setPostsList(fetchedData);
        setPostsListUnchange(fetchedData);
      }
      const size = await getPostsCount();
      console.log(size);
      setPostCollectionSize(size);
    }
    getData();
  }, [lastPostFetched]);

  useEffect(() => {
    if (mood) {
      if (mood === "همه") setPostsList(postsListUnchange);
      else
        setPostsList(
          postsListUnchange.filter((element) => element.category === mood)
        );
    }
    console.log(mood);
  }, [mood]);

  const getMorePost = () => {
    setIsLoading(true);
    const offset = lastPostFetched + countPostFetchPerRequest + 1;
    setLastPostFetched(offset);
  };

  return (
    <div className="cContainer">
      <MoodsList mood={setMood} />
      <div className="blogPostsContainer">
        <div className="postsListContainer">
          {postsList && postsList.map((el) => <Post key={el.id} data={el} />)}
          {postsList.length === 0 && !isLoading && (
            <div className="postsListEmpty">
              <img src={listEmpty} />
              <p>{getText(key.HL_EMPTY_LIST)}</p>
            </div>
          )}
        </div>
        {isLoading && <Loading showFullScreen={false} />}
        {postsList.length < postCollectionSize && !isLoading && (
          <button onClick={getMorePost}>مشاهده بیشتر</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
