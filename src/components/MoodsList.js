import React, { useState, useEffect } from "react";

// Functions
import { getMoodsList } from "../requests";

import style from "../sass/MoodsList.scss";

const MoodsList = (props) => {
  const [categorySelected, setCategorySelected] = useState(0);
  const [categories, setCategories] = useState();
  useEffect(() => {
    async function getData() {
      setCategories(await getMoodsList());
    }
    getData();
  }, []);

  const changeCategory = (e) => {
    const index = categories.findIndex(
      (element) => element === e.target.innerText
    );
    setCategorySelected(index);
    props.mood(categories[index]);
  };
  return (
    <div className="bp_categoriesContainer">
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
  );
};

export default MoodsList;
