import Card from "../statistics/cards";
import Bar_chart from "../statistics/Bar_chart";
import Bar_chart_division from "../statistics/Bar_chart_division";
import Footer from "../layout/Footer";
import AbsenceTableSummary from "../statistics/AbsenceTableSummary";
import EmpStuTableSummary from "../statistics/EmpStuTableSummary";
import DaysProgress from "../statistics/DaysProgress";
import Image from "next/image";
export default function SingleSchoolStatistics({
  employees,
  students,
  empAbcense,
  dates,
}) {
  const getTotalByClassNumber = (division) => {
    return [
      ...Array.from(
        new Set(
          division.map(
            (d: { _id: { classNumber: string } }) => d._id.classNumber
          )
        )
      ),
    ];
  };

  return (
    <>
      <div className="relative bg-blue-400 md:pt-15 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          {dates && <DaysProgress dates={dates} />}
          <Card
            students={{
              total: students.totalStudents[0]?.totalStudents,
              _id: { type: "students" },
            }}
            employees={employees?.employeeType}
            employeeGender={employees?.gender}
            studentsGender={students.gender}
          />
        </div>
      </div>
      <div className="px-4 md:px-10 mx-auto w-full -m-24 bg-gray-100">
        <div className="flex flex-wrap">
          <Bar_chart
            jobTitle={employees?.jobTitle}
            classNumber={employees?.classNumber}
            subject={employees?.subject}
            typeOfDegree={employees?.typeOfDegree}
          />

          <Bar_chart_division
            empDivision={employees.division}
            empTotalClass={getTotalByClassNumber(employees?.division)}
            stuDivision={students?.division}
            stuTotalClass={getTotalByClassNumber(students?.division)}
          />
        </div>
        <div className="flex flex-wrap mt-4">
          <EmpStuTableSummary
            empData={employees?.typeOfCertifcate}
            emptotal={employees?.totalEmployee[0]?.totalEmployee}
            stuData={students?.classNumber}
            stuTotal={students?.totalStudents[0]?.totalStudents}
            stuSocialData={students?.familySituation}
            stuHelthData={students?.healthSituation}
          />

          <AbsenceTableSummary
            totalAbsence={empAbcense?.totalEmployeeAbsence[0]?.totalAbsence}
            absenceOfYear={empAbcense?.absenceOfYear}
            absenceByReason={empAbcense?.absenceByReason}
            absenceByNameAndReson={empAbcense?.absenceByNameAndReson}
          />
        </div>

        <Footer />
      </div>
    </>
  );
}
