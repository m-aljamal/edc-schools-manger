import React, { useState } from "react";
import AddUserForm from "../persons/AddUserForm";
import AddNewButton from "../shared/AddNewButton";
import SchoolSupervisor from "../tabels/SchoolSupervisor";

export default function  CreateUsers() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">جميع المشرفين:</div>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle={`اضافة مشرف جديد`}
          modelData={
            <AddUserForm
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
      </div>
      <SchoolSupervisor />
    </div>
  );
}
