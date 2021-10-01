import School from "./School";
import { AllSchools } from "../views/statistics/AllSchools";
import CreateUsers from "../views/personsInfo/CreateUsers";
export default function adminContentMenu({ showContent, schoolId }) {
  const menuContent = {
    home: <AllSchools />,
    schoolsUsers: <CreateUsers />,
    allSchools: <School schoolId={schoolId} />,
  };
  return <div>{menuContent[showContent]}</div>;
}
