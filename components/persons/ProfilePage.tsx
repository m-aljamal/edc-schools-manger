import AdminstratorProfile from "./profile/AdminstratorProfile";
import ServiceProfile from "./profile/ServiceProfile";
import StudentProfile from "./profile/StudentProfile";
import TeacherProfile from "./profile/TeacherProfile";

const ProfilePage = ({ data, type }) => {
  const content = {
    students: <StudentProfile data={data} />,
    teacher: <TeacherProfile data={data} />,
    administrators: <AdminstratorProfile data={data} />,
    services: <ServiceProfile data={data} />,
  };

  return <div>{content[type]}</div>;
};

export default ProfilePage;
