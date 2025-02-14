import React, { useRef } from "react";

export default function RenameInput({ value, onChange, onSubmit, shake }) {
  const inputRef = useRef(null);

  return (
    <input
      type="text"
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && onSubmit()}
      className={shake ? "error-shake" : ""}
      autoFocus
    />
  );
}
