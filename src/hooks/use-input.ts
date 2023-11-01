import React from "react";

export function useInput(initialValue: string) {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return {
    value,
    onChange,
  };
}
