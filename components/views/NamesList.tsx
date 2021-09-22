import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import AddNewButton from "../shared/AddNewButton";
import { TeachersTable } from "../tabels/TeachersTable";
import { AdministratorsTable } from "../tabels/AdministratorsTable";
import { ServicesTable } from "../tabels/ServicesTable";
import { StudentsTable } from "../tabels/StudentsTable";
import AddNewPersonForm from "../persons/AddNewPersonForm";
const NamesList = ({ type, schoolId }) => {
  const apiUrl = `/api/names/${type}`;

  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);

  const { data } = schoolId
    ? useSWR([apiUrl, schoolId], feacher)
    : useSWR(apiUrl, {
        dedupingInterval: 60000,
      });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  const words = {
    teacher: {
      add: "مدرس",
      all: "المدرسين",
      table: <TeachersTable allData={data} type={type} isAdmin={schoolId} />,
    },
    administrators: {
      add: "اداري",
      all: "الاداريين",
      table: (
        <AdministratorsTable allData={data} type={type} isAdmin={schoolId} />
      ),
    },
    services: {
      add: "مستخدم",
      all: "مستخدمين",
      table: <ServicesTable allData={data} type={type} isAdmin={schoolId} />,
    },
    students: {
      add: "طالب",
      all: "طلاب",
      table: <StudentsTable allData={data} type={type} isAdmin={schoolId} />,
    },
  };

  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">
          جميع {words[type].all}:
        </div>
        {!schoolId && (
          <AddNewButton
            destroyOnClose={destroyOnClose}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            modelTitle={`اضافة ${words[type].add} جديد`}
            modelData={
              <AddNewPersonForm
                type={type}
                oldData={undefined}
                edit={false}
                setIsModalVisible={setIsModalVisible}
                setdestroyOnClose={setdestroyOnClose}
              />
            }
          />
        )}
      </div>
      {words[type].table}
    </div>
  );
};

export default NamesList;
