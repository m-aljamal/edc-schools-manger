import { useState } from "react";
import AddBookToLibrary from "../forms/AddBookToLibrary";
import AddNewButton from "../shared/AddNewButton";
import SchoolLibraryTable from "../tabels/SchoolLibraryTable";

export default function SchoolLibrary({ schoolId }) {
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
          modelTitle={`اضافة كتاب جديد`}
          modelData={
            <AddBookToLibrary
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
      </div>
      <SchoolLibraryTable schoolId={schoolId} />
    </div>
  );
}
