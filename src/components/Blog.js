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
  const [mood, setMood] = useState("همه");
  const [postsList, setPostsList] = useState([]);
  const [emptyLastPostFetched, setEmptyLastPostFetched] = useState([
    { mood: "همه", count: 0 },
    // { mood: "انرژی مثبت", count: 0 },
    // { mood: "فاز سنگین", count: 0 },
    // { mood: "انگیزشی", count: 0 },
    // { mood: "غمگین", count: 0 },
    // { mood: "عاشقانه", count: 0 },
    // { mood: "خوشحال", count: 0 },
    // { mood: "مناسبتی", count: 0 },
    // { mood: "مود", count: 0 },
    // { mood: "آموزشی", count: 0 },
  ]);
  const [lastPostFetched, setLastPostFetched] = useState(emptyLastPostFetched);
  const [postCollectionSize, setPostCollectionSize] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const countPostFetchPerRequest = 3;

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
    emptyLastPostFetched.length !== 0 &&
      setLastPostFetched(emptyLastPostFetched);
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
