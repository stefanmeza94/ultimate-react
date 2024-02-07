<<<<<<< HEAD
import { useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)));

  useEffect(() => {
    localStorage.setItem(key, value);
=======
import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
>>>>>>> 67678160c215f81d2b5fee70613d8101b6b0fb5d
  }, [value, key]);

  return [value, setValue];
}
