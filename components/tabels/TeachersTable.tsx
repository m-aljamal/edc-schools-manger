import { useState } from "react";
import {
  classes,
  typeOfCertifcate,
  division,
  subjects,
} from "../../utils/SchoolSubjects";
import {
  NameAndImageShredColumns,
  SharedTableItems,
  TypeCertifcate,
} from "./SharedTableItems";
import TableComponent from "./TableComponent";

export const TeachersTable = ({ allData, type, isAdmin }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const columns = [
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),

    {
      title: "المادة",
      dataIndex: "subject",
      filters: subjects,
      width: 100,
      onFilter: (value, record) => record.subject?.includes(value),
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الصف",
      dataIndex: "classNumber",
      width: 130,
      filters: classes,
      onFilter: (value, record) => record.classNumber?.includes(value),
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },

    {
      title: "الشعبة",
      dataIndex: "division",
      className: "text-gray-900 ",
      filters: division,
      width: 120,
      onFilter: (value, record) => record.division?.includes(value),
      render: (value, row, index) => (
        <>
          {value?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الاختصاص",
      dataIndex: "typeOfDegree",
      filters: subjects,
      width: 130,
      onFilter: (value, record) => record.typeOfDegree.indexOf(value) === 0,
    },
    TypeCertifcate(typeOfCertifcate),
    ...SharedTableItems(type, allData, isAdmin),
  ];

  return <TableComponent columns={columns} allData={allData} />;
};
