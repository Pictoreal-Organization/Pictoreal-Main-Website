import React from "react";

export default function FormatToolbar({ selection, onFormat }) {
  return (
    <div className="absolute bg-white border p-2 rounded shadow">
      <button onClick={() => onFormat("bold")}>Bold</button>
      <button onClick={() => onFormat("italic")}>Italic</button>
      {/* Add more formatting buttons as needed */}
    </div>
  );
}