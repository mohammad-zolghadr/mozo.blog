import i18n from './i18n';

// Function
import { TextKey, getText } from './Text';
// Firebase
import {
  getDocs,
  collection,
  addDoc,
  orderBy,
  limit,
  query,
  startAt,
  getCountFromServer,
  where,
} from 'firebase/firestore';
import { db, fStorage, auth, provider } from './firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithPopup, signOut } from 'firebase/auth';

const postsCollectionRef = collection(db, 'posts');
const moodsCollectionRef = collection(db, 'moods');
const aboutMeCollectionRef = collection(db, 'about_me');

const key = new TextKey();

const getPostsList = async (startId = 0, limitCount = 3, mood = '') => {
  let customQuery = '';
  if (mood !== '' && mood !== 'همه')
    customQuery = query(
      postsCollectionRef,
      where('category', '==', mood),
      orderBy('id'),
      limit(limitCount),
      startAt(startId)
    );
  else
    customQuery = query(
      postsCollectionRef,
      orderBy('id'),
      limit(limitCount),
      startAt(startId)
    );

  const data = await getDocs(customQuery);
  return data.docs.map((doc) => ({ ...doc.data() }));
};

const getPostsCount = async () => {
  const snapshot = await getCountFromServer(postsCollectionRef);
  const size = snapshot.data().count;
  return size;
};

const getLastId = async () => {
  const mQuery = query(postsCollectionRef, orderBy('id', 'desc'), limit(1));
  const data = await getDocs(mQuery);
  const id = data.docs[0]
    ? data.docs[0]._document.data.value.mapValue.fields.id
    : 1;
  return id;
};

const getDataWithinId = async (id) => {
  const data = await getDocs(query(postsCollectionRef, where('id', '==', id)));
  return data.docs.map((doc) => ({ ...doc.data() }))[0];
};

const getMoodsList = async () => {
  let customQuery = '';
  if (i18n.languages[0] === 'fa')
    customQuery = query(moodsCollectionRef, where('lang', '==', 'fa'));
  else {
    customQuery = query(moodsCollectionRef, where('lang', '==', 'en'));
  }
  let data = await getDocs(customQuery);
  let arrayData = data.docs.map((doc) => ({ ...doc.data() }));
  arrayData = removeObjectByProperty(arrayData, 'lang');
  console.log(arrayData);
  return arrayData.map((el) => Object.values(el));
};

const sendPost = async (
  id,
  image,
  title,
  summary,
  body,
  author,
  email,
  mood = 'همه'
) => {
  let isUploaded = { state: false, text: '' };
  await uploadImage(image)
    .then(async (imageIdUploaded) => {
      await addDoc(postsCollectionRef, {
        id,
        title,
        summary,
        body,
        image: imageIdUploaded,
        author,
        email,
        date: new Date().toLocaleDateString('fa-IR'),
        category: mood,
      })
        .then(() => {
          isUploaded = { state: true, text: getText(key.NP_SuccessPost) };
        })
        .catch(() => {
          isUploaded = { state: false, text: getText(key.NP_ErrorPost) };
        });
    })
    .catch(
      () => (isUploaded = { state: false, text: getText(key.NP_ErrorPost) })
    );
  return isUploaded;
};

const uploadImage = async (imageFile) => {
  let imageIdUploaded;
  const imageRef = ref(
    fStorage,
    `postImage/${imageFile.name + new Date().toISOString()}`
  );
  await uploadBytes(imageRef, imageFile).then(
    (res) => (imageIdUploaded = res.metadata.fullPath)
  );
  return imageIdUploaded;
};

const getAboutMeData = async () => {
  let customQuery = '';
  if (i18n.languages[0] === 'fa')
    customQuery = query(aboutMeCollectionRef, where('lang', '==', 'fa'));
  else {
    customQuery = query(aboutMeCollectionRef, where('lang', '==', 'en'));
  }
  const data = await getDocs(customQuery);
  return data.docs.map((doc) => ({ ...doc.data() }));
};

const mSignUp = async () => {
  let data;
  await signInWithPopup(auth, provider)
    .then((res) => {
      data = {
        isAuth: true,
        id: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        image: res.user.photoURL,
      };
      localStorage.setItem('userInfo', JSON.stringify(data));
    })
    .catch((error) => console.log(error));

  return data;
};

const mSignOut = async () => {
  await signOut(auth).then(() => {
    localStorage.clear();
  });
};

const downloadImage = async (resId) => {
  let finalUrl;
  await getDownloadURL(ref(fStorage, resId)).then((url) => {
    finalUrl = url;
  });
  return finalUrl;
};

function removeObjectByProperty(arr, prop) {
  arr.forEach(function (obj) {
    delete obj[prop];
  });

  return arr;
}

export {
  getPostsList,
  getPostsCount,
  getMoodsList,
  sendPost,
  getAboutMeData,
  getDataWithinId,
  getLastId,
  mSignUp,
  mSignOut,
  downloadImage,
  uploadImage,
};
