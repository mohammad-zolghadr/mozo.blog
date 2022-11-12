import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | مود بلاگ`;
  }, [title]);
};

export default useTitle;
