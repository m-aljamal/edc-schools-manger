import dynamic from "next/dynamic";
import AdministrativeDocs from "../views/folders/AdministrativeDocs";
import Assets from "../views/assets/Assets";
const SychologistForm = dynamic(
  () => import("../views/personsInfo/SychologistForm")
);
const NamesList = dynamic(() => import("../views/personsInfo/NamesList"));
const AddAbcence = dynamic(() => import("../views/abcence/AddAbcence"));
const AbcenceMonthPreview = dynamic(
  () => import("../views/abcence/AbcenceMonthPreview")
);
const SingleSchool = dynamic(() => import("../views/statistics/SingleSchool"));
const SchoolLibrary = dynamic(() => import("../views/library/SchoolLibrary"));
const Activites = dynamic(() => import("../views/activities/Activites"));
const ContentMenu = ({ schoolId, showContent }) => {
  const menuContent = {
    home: <SingleSchool schoolId={schoolId} />,
    teachers: <NamesList type="teacher" schoolId={schoolId} />,
    administrators: <NamesList type="administrators" schoolId={schoolId} />,
    services: <NamesList type="services" schoolId={schoolId} />,
    monthlyEmployeesTimeSheet: (
      <AbcenceMonthPreview schoolId={schoolId} type="employees" />
    ),
    monthlyStudentTimeSheet: (
      <AbcenceMonthPreview schoolId={schoolId} type="students" />
    ),
    employeesTimeSheet: <AddAbcence type="employees" />,

    students: <NamesList type="students" schoolId={schoolId} />,
    stutimesheet: <AddAbcence type="students" />,
    assets: <Assets schoolId={schoolId} />,
    library: <SchoolLibrary schoolId={schoolId} />,
    administativeDocs: <AdministrativeDocs schoolId={schoolId} />,
    activites: <Activites schoolId={schoolId} />,
  };
  return <div>{menuContent[showContent]}</div>;
};

export default ContentMenu;
