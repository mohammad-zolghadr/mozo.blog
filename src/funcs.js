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

const getOppositeCategory = (inputCat, isPersian) => {
  if (!isPersian) {
    switch (inputCat) {
      case 'all':
        return 'همه';
      case 'occasion':
        return 'مناسبتی';
      case 'dark mood':
        return 'فاز سنگین';
      case 'happy':
        return 'خوشحال';
      case 'love':
        return 'عاشقانه';
      case 'sad':
        return 'غمگین';
      case 'news':
        return 'خبری';
      case 'motivational':
        return 'انگیزشی';
      case 'positive':
        return 'انرژی مثبت';
      case 'tutorial':
        return 'آموزشی';
      case 'mood':
        return 'مود';
      default:
        return 'همه';
    }
  } else {
    switch (inputCat) {
      case 'همه':
        return 'all';
      case 'مناسبتی':
        return 'occasion';
      case 'فاز سنگین':
        return 'dark mood';
      case 'خوشحال':
        return 'happy';
      case 'عاشقانه':
        return 'love';
      case 'غمگین':
        return 'sad';
      case 'خبری':
        return 'news';
      case 'انگیزشی':
        return 'motivational';
      case 'انرژی مثبت':
        return 'positive';
      case 'آموزشی':
        return 'tutorial';
      case 'مود':
        return 'mood';
      default:
        return 'all';
    }
  }
};

const compressImageFromSrc = (src) => {
  let img = new Image();
  img.src = src;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  let dataURL = canvas.toDataURL('image/jpeg', 0.7);
  return dataURL;
};

export {
  isPersian,
  removeObjectByProperty,
  getOppositeCategory,
  compressImageFromSrc,
};
