import { useState } from "react";

export default function useForm(initialState) {
  const [fields, setFields] = useState(initialState);

  const handleFieldsChange = function (event) {
    let value = event.target.value;

    if (event.target.type === "checkbox") {
      value = !fields[event.target.id];
    } else {
      value = event.target.value;
    }

    setFields({
      ...fields,
      [event.target.id]: value,
    });
  };

  return [fields, handleFieldsChange, setFields];
}
