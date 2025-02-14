import React, { useEffect, useRef } from "react";

export default function AddInput({ value, onChange, onSubmit, error, shake }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="add-input-container">
      <input
        type="text"
        ref={inputRef}
        className={`add-input ${error ? "error-border" : ""} ${shake ? "error-shake" : ""}`}
        placeholder="Enter file or folder name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      <button className="add-button" onClick={onSubmit}>
        Save
      </button>
      {error && <p className="error-message fade-in">{error}</p>}
    </div>
  );
}
