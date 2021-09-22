import React from "react";

export default function UpArrow({ onClick, name }) {
  return (
    <div className="flex gap-10 items-center transform -translate-y-6">
      <i
        className="fas fa-arrow-up cursor-pointer  text-lg "
        onClick={onClick}
      ></i>
      <p className="mr-2 font-bold text-gray-500">{name}</p>
    </div>
  );
}
