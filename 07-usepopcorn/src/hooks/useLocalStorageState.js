import { useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)));

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}
