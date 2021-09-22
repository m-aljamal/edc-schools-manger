import React, { useState } from "react";
import { typeOfCertifcate, subjects } from "../../utils/SchoolSubjects";
import { NameAndImageShredColumns, SharedTableItems } from "./SharedTableItems";
import TableComponent from "./TableComponent";

export const ServicesTable = ({ allData, type, isAdmin }) => {
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
      title: "المسمى الوظيفي",
      dataIndex: "jobTitle",
      width: 130,
    },
    ...SharedTableItems(type, allData, isAdmin),
  ];

  return <TableComponent columns={columns} allData={allData} />;
};
