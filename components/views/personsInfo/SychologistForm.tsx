import React from "react";
import AddNewSocialForm from "../../forms/AddNewSocialForm";

export default function SychologistForm() {
  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">
          <p>أستماراة اجتماعية جديدة</p>
        </div>
      </div>
      <AddNewSocialForm />
    </div>
  );
}
