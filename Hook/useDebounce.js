import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [deboucedValue, setDeboucedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return deboucedValue;
};

export default useDebounce;
