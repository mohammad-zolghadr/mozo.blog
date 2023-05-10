import React, { useState, useEffect } from 'react';

// Functions
import { getMoodsList } from '../requests';

import style from '../sass/MoodsList.scss';

const MoodsList = (props) => {
  const [categorySelected, setCategorySelected] = useState(0);
  const [categories, setCategories] = useState();
  const arrayListOfMoods = [];

  useEffect(() => {
    getMoodsList().then((data) => {
      setCategories(data);
      if (props.lpFetch) {
        data.forEach((element) => {
          arrayListOfMoods.push({
            mood: element,
            count: 0,
          });
        });
        props.lpFetch.setEmptyLastPostFetched(arrayListOfMoods);
      }
    });
  }, []);

  const changeCategory = (e) => {
    const index = categories.findIndex(
      (element) => element[0] === e.target.innerText
    );
    setCategorySelected(index);
    props.mood(categories[index]);
  };
  return (
    <div className='bp_categoriesContainer'>
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
                className='bp_categorySelected'
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
