// Function
import { TextKey, getText } from "./Text";
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
} from "firebase/firestore";
import { db, fStorage, auth, provider } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { signInWithPopup, signOut } from "firebase/auth";

const postsCollectionRef = collection(db, "posts");
const moodsCollectionRef = collection(db, "moods");
const aboutMeCollectionRef = collection(db, "about_me");

const key = new TextKey();

const getPostsList = async (startId = 0, limitCount = 3, mood = "") => {
  let customQuery = "";
  if (mood !== "" && mood !== "همه")
    customQuery = query(
      postsCollectionRef,
      where("category", "==", mood),
      orderBy("id"),
      limit(limitCount),
      startAt(startId)
    );
  else
    customQuery = query(
      postsCollectionRef,
      orderBy("id"),
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
  const mQuery = query(postsCollectionRef, orderBy("id", "desc"), limit(1));
  const data = await getDocs(mQuery);
  return data.docs[0]._document.data.value.mapValue.fields.id;
};

const getDataWithinId = async (id) => {
  const data = await getDocs(query(postsCollectionRef, where("id", "==", id)));
  return data.docs.map((doc) => ({ ...doc.data() }))[0];
};

const getMoodsList = async () => {
  let data = await getDocs(moodsCollectionRef);
  const arrayData = data.docs.map((doc) => ({ ...doc.data() }));
  return arrayData.map((el) => Object.values(el)[0]);
};

const sendPost = (
  id,
  image,
  title,
  body,
  author,
  email,
  mood = "همه",
  successToast,
  errorToast,
  setIsLoading,
  setInputValue
) => {
  const imageRef = ref(
    fStorage,
    `postImage/${image.name + new Date().toISOString()}`
  );
  uploadBytes(imageRef, image).then((res) => {
    addDoc(postsCollectionRef, {
      id,
      title,
      body,
      image: res.metadata.fullPath,
      author,
      email,
      date: new Date().toLocaleDateString("fa-IR"),
      category: mood,
    })
      .then(() => {
        setIsLoading(false);
        successToast(getText(key.NP_SuccessPost));
        setInputValue({ title: "", body: "", image: "" });
      })
      .catch(() => {
        setIsLoading(false);
        errorToast(getText(key.NP_ErrorPost));
      });
  });
};

const getAboutMeData = async () => {
  const data = await getDocs(aboutMeCollectionRef);
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
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => console.log(error));

  return data;
};

const mSignOut = async () => {
  await signOut(auth).then(() => {
    localStorage.clear();
  });
};

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
};
