import React from "react";

export default function HeadingMenu({ onSelect }) {
  return (
    <div className="absolute bg-white border p-2 rounded shadow">
      <button onClick={() => onSelect("H1")}>H1</button>
      <button onClick={() => onSelect("H2")}>H2</button>
      <button onClick={() => onSelect("H3")}>H3</button>
      {/* Add more heading options as needed */}
    </div>
  );
}