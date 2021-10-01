import axios from "axios";
import React from "react";
import useSWR from "swr";
import SingleSchoolStatistics from "./SingleSchoolStatistics";
const SingleSchool = ({ schoolId }) => {
  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);
  const { data, error } = useSWR(
    ["/api/statistics/singleSchool/", schoolId],
    feacher
  );

  if (error) return <p>يوجد خطا في السيرفر الرجاء اعادة المحاولة</p>;
  if (!data) return <p>الرجاء الانتظار.....</p>;
  const employees = data?.totalEmployee[0];
  const students = data?.totalStudents[0];
  const empAbcense = data?.empAbcenseByYear[0];

  return (
    <SingleSchoolStatistics
      employees={employees}
      students={students}
      empAbcense={empAbcense}
      dates={data.dates}
    />
  );
};

export default SingleSchool;
