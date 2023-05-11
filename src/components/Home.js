import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles & icons
import style from '../sass/Home.scss';
import bgImage from '../assets/images/home.jpg';

// components
import Post from './Post';
import Loading from './Loading';

// Function
import { TextKey, getText } from '../Text';
import { getPostsList } from '../requests';
import useTitle from '../hooks/useTitle';
import { useTranslation } from 'react-i18next';

const Home = () => {
  let navigate = useNavigate();
  const key = new TextKey();
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  useTitle(getText(key.H_Page_Title, t, i18n));

  useEffect(() => {
    async function getData() {
      const fetchedData = await getPostsList(0, 6);
      setIsLoading(false);
      setPostsList(fetchedData);
    }
    getData();
  }, []);

  return (
    <div className='homeWrapper'>
      <div className='homeContainer'>
        <img src={bgImage} />
        <span className='homeImageBlackCover'></span>
        <div className='homeMainLanding'>
          <h3>{getText(key.HL_Title, t, i18n)}</h3>
          <div className='homeMainLandingDescription'>
            <span></span>
            <ul>
              <li>{getText(key.HL_Option_1, t, i18n)}</li>
              <li>{getText(key.HL_Option_2, t, i18n)}</li>
              <li>{getText(key.HL_Option_3, t, i18n)}</li>
            </ul>
          </div>
          <div className='homeMainLandingBtns'>
            <button onClick={() => navigate('/blog')} className='secondaryBtn'>
              {getText(key.HL_Btn_SeeAllPost, t, i18n)}
            </button>
            <button
              onClick={() => navigate('/new-post')}
              className='primaryBtn'
            >
              {getText(key.HL_Btn_NewPost, t, i18n)}
            </button>
          </div>
        </div>
      </div>
      <div className='homePostsContainer'>
        <h3>{getText(key.HL_Title_LastBlog, t, i18n)}</h3>
        <div className='postsListContainer'>
          {isLoading && <Loading />}
          {postsList &&
            postsList.map((el) => <Post key={el.image} data={el} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
