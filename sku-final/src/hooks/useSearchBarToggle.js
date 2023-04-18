import { useEffect } from "react";

const useClickOutside = (ref, func) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      func();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, func]);
};

export default useClickOutside;