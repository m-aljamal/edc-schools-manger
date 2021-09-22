import React from "react";
import useSWR from "swr";
import { StudentsTable } from "../tabels/StudentsTable";

export default function TeacherStudentsNameList() {
  const { data, error } = useSWR("/api/teacher");
  if (error) {
    console.log(error);
  }
  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">جميع الطلاب:</div>
      </div>
      <StudentsTable allData={data} type="students" isAdmin={true} />
    </div>
  );
}
