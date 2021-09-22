import React, { useState } from "react";
import useSWR from "swr";
import TableComponent from "./TableComponent";

export default function SchoolSupervisor() {
  const { data, error } = useSWR("/api/users/allusers", {
    dedupingInterval: 60000,
  });
  if (!data) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>there is an error</p>;
  }
 

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
    },
    {
      title: "الايميل",
      dataIndex: "email",
    },
    {
      title: "كلمة السر",
      dataIndex: "password",
    },
    {
      title: "تاريخ الانشاء",
      dataIndex: "createdAt",
      render: (text) => (
        <div>
          <p>{new Date(text).toDateString()}</p>
        </div>
      ),
    },
  ];
  return (
    <div>
      <AdminUsers columns={columns} allData={data.adminUsers} />
      <SchoolUsers
        schools={data.schools}
        allData={data.schoolsUsers}
        columns={columns}
      />
    </div>
  );
}
const h2Style = "font-bold md:text-lg text-base mb-3";
const AdminUsers = ({ columns, allData }) => {
  return (
    <div>
      <h2 className={h2Style}>المشرف العام :</h2>
      <TableComponent columns={columns} allData={allData} />
    </div>
  );
};

const SchoolUsers = ({ columns, allData, schools }) => {
  const schoolUsersColumn = [
    ...columns,
    {
      title: "المدرسة",
      dataIndex: "_id",

      render: (text) => {
        const school = schools?.find((s) => s.director === text);
        return <p>{school?.name}</p>;
      },
    },
  ];
  return (
    <div className="mt-5">
      <h2 className={h2Style}>مشرف المدرسة :</h2>
      <TableComponent columns={schoolUsersColumn} allData={allData} />
    </div>
  );
};
