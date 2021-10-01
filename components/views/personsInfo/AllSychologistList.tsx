import React from "react";
import SychologistTable from "../../tabels/SychologistTable";

export default function AllSychologistList() {
  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">
          <p>أستمارات اجتماعية</p>
        </div>
      </div>
      <SychologistTable />
    </div>
  );
}
