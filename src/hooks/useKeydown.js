import { useEffect } from "react";

function useKeydown(key, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === key) callback(e);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
}

export default useKeydown;
