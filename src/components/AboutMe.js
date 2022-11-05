import React, { useEffect, useState } from "react";

// Styles and Icons
import style from "../sass/AboutMe.scss";

// Functions
import { getAboutMeData } from "../requests";

// Components
import Loading from "./Loading";

const AboutMe = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const fetchedData = await getAboutMeData();
      setData(fetchedData[0]);
    }
    getData();
  }, []);

  return (
    <div className="cContainer">
      {!data ? (
        <div className="AM_loadingContainer">
          <Loading />
        </div>
      ) : (
        <div className="AM_Container">
          <img src={data.profile} />
          <div>
            <h4>{data.name}</h4>
            <span>{data.specialty}</span>
          </div>
          <hr />
          <p>{data.description}</p>
          <a href={data.link} target="_blank">
            {data.buttonText}
          </a>
          <p className="AM_footer">
            Made with <span>&#x2764;</span> | Shiraz - 1401
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
