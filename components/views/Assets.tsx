import { useState } from "react";
import AddSchoolAssets from "../forms/AddSchoolAssets";
import AddNewButton from "../shared/AddNewButton";
import SchoolAssetsTable from "../tabels/SchoolAssetsTable";

export default function Assets({ schoolId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">موجودات المدرسة:</div>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle={`اضافة مادة جديدة`}
          modelData={
            <AddSchoolAssets
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
      </div>
      <SchoolAssetsTable schoolId={schoolId} />
    </div>
  );
}
