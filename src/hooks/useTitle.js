import { useEffect } from "react";

// function
import { getText, TextKey } from "../Text";
import { useTranslation } from "react-i18next";

const useTitle = (title) => {
  const key = new TextKey();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = `${title} | ${getText(key.NB_Main_Title, t, i18n)}`;
  }, [title]);
};

export default useTitle;
