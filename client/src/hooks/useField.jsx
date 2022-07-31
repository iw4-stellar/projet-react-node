import { useState } from "react";

export default function useField(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (e) => {
    if (e.target.type === "checkbox") {
      setValue(!value);
    } else {
      setValue(e.target.value);
    }
  };

  return [value, handleValueChange, setValue];
}
