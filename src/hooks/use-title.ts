import { useEffect, useState } from "react";

export const useTitle = (defaultValue: string = "") => {
  const [title, setTitle] = useState(defaultValue);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const clear = () => {
    setTitle("");
  };

  return { set: setTitle, title, clear };
};
