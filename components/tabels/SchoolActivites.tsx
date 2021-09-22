import { useState } from "react";
import useSWR from "swr";
import TableComponent from "./TableComponent";
import { NameAndImageShredColumns } from "./SharedTableItems";
import axios from "axios";
import LoadingSpin from "../shared/LoadingSpin";
import { setViewDate } from "../../utils/weekendDays";
export default function SchoolActivites({ schoolId }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const apiUrl = "/api/activities";

  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);

  const { data, error } = schoolId
    ? useSWR([apiUrl, schoolId], feacher)
    : useSWR(apiUrl, {
        dedupingInterval: 60000,
      });

  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    return <p>يوجد خطأ الرجاء المحاولة لاحقا</p>;
  }

  const columns = [
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
    {
      title: "اسماء المشرفين",
      dataIndex: "teachersNames",
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "اسماء الطلاب",
      dataIndex: "namesOfBeneficiaries",
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الصفوف المشاركة",
      dataIndex: "classNumbers",
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "مدة النشاط",
      dataIndex: "duration",
    },
    {
      title: "تاريخ النشاط",
      dataIndex: "date",
      render: (text) => <p>{setViewDate(text)}</p>,
    },
    {
      title: "وصف النشاط",
      dataIndex: "description",
    },
  ];
  return <TableComponent columns={columns} allData={data} />;
}
