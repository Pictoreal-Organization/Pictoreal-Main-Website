import React from "react";

export default function PlusMenu({ onInsert }) {
  return (
    <div className="absolute bg-white border p-2 rounded shadow">
      <button onClick={() => onInsert("image")}>Insert Image</button>
      {/* Add more insert options as needed */}
    </div>
  );
}