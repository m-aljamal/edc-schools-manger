import School from "./School";
import { AllSchools } from "../views/AllSchools";
import CreateUsers from "../views/CreateUsers";
export default function adminContentMenu({ showContent, schoolId }) {
  const menuContent = {
    home: <AllSchools />,
    schoolsUsers: <CreateUsers />,
    allSchools: <School schoolId={schoolId} />,
  };
  return <div>{menuContent[showContent]}</div>;
}
