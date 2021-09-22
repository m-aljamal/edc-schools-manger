import { useState } from "react";
import AddSchoolActivite from "../forms/AddSchoolActivite";
import AddNewButton from "../shared/AddNewButton";
import SchoolActivites from "../tabels/SchoolActivites";

export default function Activites({ schoolId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">الأنشطة المدرسية:</div>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle={`اضافة نشاط جديد`}
          modelData={
            <AddSchoolActivite
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
      </div>
      <SchoolActivites schoolId={schoolId} />
    </div>
  );
}
