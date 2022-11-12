import React, { useState, useEffect } from "react";

import style from "../sass/Blog.scss";

// components
import Post from "./Post";
import Loading from "./Loading";
import MoodsList from "./MoodsList";

// Function
import { getPostsList, getPostsCount } from "../requests";
import { getText, TextKey } from "../Text";
import useTitle from "../hooks/useTitle";

import listEmpty from "../assets/images/search_empty.png";

const Blog = () => {
  const countPostFetchPerRequest = 3;
  const key = new TextKey();
  const [mood, setMood] = useState("همه");
  const [postsList, setPostsList] = useState([]);
  const [emptyLastPostFetched, setEmptyLastPostFetched] = useState([
    { mood: "همه", count: 0 },
  ]);
  const [lastPostFetched, setLastPostFetched] = useState(emptyLastPostFetched);
  const [postCollectionSize, setPostCollectionSize] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useTitle(getText(key.B_Page_Title));

  const getLastPostFetchedWithinMood = () => {
    return lastPostFetched.find((element) => element.mood === mood);
  };
  const setLastPostFetchedWithinMood = (value) => {
    lastPostFetched.map((element) => {
      if (element.mood === mood) {
        setLastPostFetched((prevState) => [
          ...prevState.filter(
            (el) => el.mood !== getLastPostFetchedWithinMood().mood
          ),
          { mood, count: value },
        ]);
      }
    });
  };

  async function getData() {
    const fetchedData = await getPostsList(
      getLastPostFetchedWithinMood().count,
      countPostFetchPerRequest,
      mood
    );

    if (fetchedData.length !== 0) {
      const offset = fetchedData[fetchedData.length - 1].id + 1;
      setLastPostFetchedWithinMood(offset);

      getLastPostFetchedWithinMood().count === 0
        ? setPostsList(fetchedData)
        : setPostsList([...postsList, ...fetchedData]);
      const size = await getPostsCount();
      setPostCollectionSize(size);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    setLastPostFetched(emptyLastPostFetched);
    setPostsList([]);
    getData();
  }, [mood]);

  useEffect(() => {
    setLastPostFetched(emptyLastPostFetched);
    setLastPostFetchedWithinMood(countPostFetchPerRequest + 1);
  }, [emptyLastPostFetched]);

  const getMorePost = () => {
    setIsLoading(true);
    getData();
  };

  return (
    <div className="cContainer">
      <MoodsList
        mood={setMood}
        lpFetch={{ emptyLastPostFetched, setEmptyLastPostFetched }}
      />
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
        {postsList.length < postCollectionSize &&
          !isLoading &&
          postsList.length !== 0 && (
            <button onClick={getMorePost}>مشاهده بیشتر</button>
          )}
      </div>
    </div>
  );
};

export default Blog;
