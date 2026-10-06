"use client";

import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  // Get data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      setValue(JSON.parse(storedData));
    }
  }, [key]);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;