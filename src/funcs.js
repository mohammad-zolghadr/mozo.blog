import i18n from './i18n';

const isPersian = () => {
  let res = true;
  res = i18n.languages[0] === 'fa' ? true : false;
  return res;
};

const removeObjectByProperty = (arr, prop) => {
  arr.forEach(function (obj) {
    delete obj[prop];
  });

  return arr;
};

export { isPersian, removeObjectByProperty };
