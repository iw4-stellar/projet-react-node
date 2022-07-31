import { useEffect, useState } from "react";

export default function useLocalStorage(key) {
  const lsValue = JSON.parse(localStorage.getItem(key)); // localstorage value
  const [value, setValue] = useState(lsValue);
  const save = (val) => {
    localStorage.setItem(key, JSON.stringify(val));
    setValue(val);
  };

  return [value, save];
}
