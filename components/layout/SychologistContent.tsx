import dynamic from "next/dynamic";
import AdministrativeDocs from "../views/folders/AdministrativeDocs";
import AllSychologistList from "../views/personsInfo/AllSychologistList";
const NamesList = dynamic(() => import("../views/personsInfo/NamesList"));
const SychologistForm = dynamic(
  () => import("../views/personsInfo/SychologistForm")
);
const ContentMenu = ({ schoolId, showContent }) => {
  const menuContent = {
    students: <NamesList type="students" schoolId={schoolId} />,
    administativeDocs: <AdministrativeDocs schoolId={schoolId} />,
    sychologistForm: <SychologistForm />,
    allsychologist: <AllSychologistList />,
  };
  return <div>{menuContent[showContent]}</div>;
};

export default ContentMenu;
