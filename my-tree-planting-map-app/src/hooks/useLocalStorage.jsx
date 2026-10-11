"use client";

import { useEffect, useState } from "react";

// Now the part that makes the data survive page refresh: localStorage
// Browser provides: localStorage which is essentially a small persistent key-value storage.
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  // Get data from localStorage
  // Effect #1 — load existing data
  useEffect(() => {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      // turns it back into JavaScript data.
      setValue(JSON.parse(storedData));
    }
  }, [key]);

  // Save data to localStorage
  // Because localStorage stores strings, an array/object must be converted: JSON.stringify(...)
  // Effect #2 — save changes
  // React State  ←────────────→  localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));// Whenever the value changes, save it to localStorage.
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;