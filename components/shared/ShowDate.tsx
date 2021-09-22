import React from "react";

export default function ShowDate({ date }) {
  if (!date) {
    return <p></p>;
  }
  return (
    <p className="text-gray-700 text-base font-bold">
      {new Date(date).toLocaleDateString("en-GB")}
    </p>
  );
}
