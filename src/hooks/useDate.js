import { useState, useEffect } from "react";

export const useDate = () => {
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date().toDateString());
    }, 60000);
  }, []);

  return { date };
};
