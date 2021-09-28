import dynamic from "next/dynamic";
import AdministrativeDocs from "../views/AdministrativeDocs";
const NamesList = dynamic(() => import("../views/NamesList"));
const SychologistForm = dynamic(() => import("../views/SychologistForm"));
const ContentMenu = ({ schoolId, showContent }) => {
  const menuContent = {
    students: <NamesList type="students" schoolId={schoolId} />,
    administativeDocs: <AdministrativeDocs schoolId={schoolId} />,
    sychologistForm: <SychologistForm />,
  };
  return <div>{menuContent[showContent]}</div>;
};

export default ContentMenu;
