import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const useDate = () => {
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date().toDateString());
    }, 60000);
  }, []);

  return { date };
};
