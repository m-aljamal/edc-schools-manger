import React from "react";
import AdministrativeDocs from "../views/AdministrativeDocs";
import TeacherStudentsNameList from "../views/TeacherStudentsNameList";
export default function TeacherContentMenu({ schoolId, showContent }) {
  const menuContent = {
    home: <TeacherStudentsNameList />,
    // administativeDocs: <AdministrativeDocs schoolId={schoolId} teacher />,
    administativeDocs: (
      <AdministrativeDocs schoolId={schoolId} teacher={true} />
    ),
  };
  return <div>{menuContent[showContent]}</div>;
}
