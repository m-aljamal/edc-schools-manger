import dynamic from "next/dynamic";
import AdministrativeDocs from "../views/AdministrativeDocs";
import Assets from "../views/Assets";
const NamesList = dynamic(() => import("../views/NamesList"));
const AddAbcence = dynamic(() => import("../views/AddAbcence"));
const AbcenceMonthPreview = dynamic(
  () => import("../views/AbcenceMonthPreview")
);
const SingleSchool = dynamic(() => import("../views/SingleSchool"));
const SchoolLibrary = dynamic(() => import("../views/SchoolLibrary"));
const Activites = dynamic(() => import("../views/Activites"));
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
