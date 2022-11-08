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
} from "firebase/firestore";
import { db, fStorage } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";

const postsCollectionRef = collection(db, "posts");
const moodsCollectionRef = collection(db, "moods");
const aboutMeCollectionRef = collection(db, "about_me");

const key = new TextKey();

const getPostsList = async (startId = 0, limitCount = 3) => {
  const data = await getDocs(
    query(
      postsCollectionRef,
      orderBy("id"),
      limit(limitCount),
      startAt(startId)
    )
  );
  return data.docs.map((doc) => ({ ...doc.data() }));
};

const getPostsCount = async () => {
  const snapshot = await getCountFromServer(postsCollectionRef);
  const size = snapshot.data().count;
  return size;
};

const getMoodsList = async () => {
  let data = await getDocs(moodsCollectionRef);
  const arrayData = data.docs.map((doc) => ({ ...doc.data() }));
  return arrayData.map((el) => Object.values(el)[0]);
};

const sendPost = (
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

export { getPostsList, getPostsCount, getMoodsList, sendPost, getAboutMeData };
