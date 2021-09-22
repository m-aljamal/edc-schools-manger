import { useState } from "react";
import { classes, division, familySituation } from "../../utils/SchoolSubjects";
import { NameAndImageShredColumns, SharedTableItems } from "./SharedTableItems";
import TableComponent from "./TableComponent";

export const StudentsTable = ({ allData, type, isAdmin }) => {
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
      title: "الصف",
      dataIndex: "classNumber",
      filters: classes,
      onFilter: (value, record) => record.classNumber?.includes(value),
    },

    {
      title: "الشعبة",
      dataIndex: "division",
      filters: division,
      onFilter: (value, record) => record.division?.includes(value),
    },
    {
      title: "الوضع العائلي",
      dataIndex: "familySituation",
      filters: familySituation,
      onFilter: (value, record) => record.familySituation?.includes(value),
    },
    {
      title: "الوضع الصحي",
      dataIndex: "healthSituation",
      filters: [
        {
          text: "مريض",
          value: "مريض",
        },
        {
          text: "معافاة",
          value: "معافاة",
        },
      ],
      onFilter: (value, record) => record.healthSituation.indexOf(value) === 0,
    },

    ...SharedTableItems(type, allData, isAdmin),
  ];

  return <TableComponent columns={columns} allData={allData} />;
};
