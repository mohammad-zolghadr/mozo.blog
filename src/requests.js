// Function
import { TextKey, getText } from "./Text";
// Firebase
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db, fStorage } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";

const postsCollectionRef = collection(db, "posts");
const moodsCollectionRef = collection(db, "moods");

const key = new TextKey();

const getPostsList = async () => {
  const data = await getDocs(postsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data() }));
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
  category,
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
      category,
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

export { getPostsList, getMoodsList, sendPost };
