import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./slideBar";
import ContentMenu from "./ContentMenu";
import AdminContentMenu from "./adminContentMenu";
import TeacherContentMenu from "./TeacherContentMenu";
import MenuList from "./MenuList";
import TeacherMenuList from "./TeacherMenuList";
import AdminMenuList from "./adminMenuList";
import SychologistMenyList from "./SychologistMenyList";
import SychologistContent from "./SychologistContent";
export default function Dashboard({ userType, schools }) {
  const [currentContnet, setCurrentContent] = useState(
    userType === "مرشد نفسي" ? "students" : "home"
  );
  const [schoolId, setSchoolId] = useState(null);

  const handleClick = (e) => {
    if (userType === "admin") {
      if (e.keyPath.length === 2) {
        setSchoolId(e.keyPath[0]);
        setCurrentContent(e.keyPath[1]);
      } else {
        setCurrentContent(e.key);
      }
    } else {
      setCurrentContent(e.key);
    }
  };

  const contentType = {
    teacher: {
      content: (
        <TeacherContentMenu schoolId={null} showContent={currentContnet} />
      ),
      menu: (
        <TeacherMenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      ),
    },

    "مرشد نفسي": {
      content: (
        <SychologistContent schoolId={null} showContent={currentContnet} />
      ),
      menu: (
        <SychologistMenyList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      ),
    },
    "مشرف المدرسة": {
      content: <ContentMenu schoolId={null} showContent={currentContnet} />,
      menu: (
        <MenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      ),
    },
    admin: {
      content: (
        <AdminContentMenu showContent={currentContnet} schoolId={schoolId} />
      ),
      menu: (
        <AdminMenuList
          schools={schools}
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      ),
    },
    "مدير المدرسة": {
      content: <ContentMenu schoolId={null} showContent={currentContnet} />,
      menu: (
        <MenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      ),
    },
    user: {
      content: <ContentMenu schoolId={null} showContent={currentContnet} />,
      menu: (
        <MenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="light"
          mode="inline"
          className=""
        />
      ),
    },
  };

  if (!contentType[userType]) {
    return (
      <div className="text-center text-red-800 mt-4 text-xl">
        <p>لا يوجد صلاحيات دخول لهذا الايميل</p>
        <p>الرجاء مراجعة الادارة</p>
      </div>
    );
  }
  return (
    <>
      <Sidebar showMenuList={contentType[userType].menu} />
      <div className="relative md:mr-72 bg-blueGray-100">
        <Navbar />
        {contentType[userType].content}
      </div>
    </>
  );
}
