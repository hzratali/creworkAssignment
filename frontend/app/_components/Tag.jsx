import React from "react";

const Tag = ({ priority }) => {
  console.log(
    priority.trim() == "urgent"
      ? "#FF6B6B"
      : priority.trim() == "medium"
      ? "#FFA235"
      : priority.trim() == "low"
      ? "#0ECC5A"
      : ""
  );
  return (
    <div
      className={`px-3 py-2 text-white rounded-xl bg-${priority}`}
    >
      <p className="capitalize">{priority}</p>
    </div>
  );
};

export default Tag;
