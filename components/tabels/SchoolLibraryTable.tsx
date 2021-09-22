import { useState } from "react";
import useSWR from "swr";
import TableComponent from "./TableComponent";
import { NameAndImageShredColumns } from "./SharedTableItems";
import axios from "axios";
export default function SchoolLibraryTable({ schoolId }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const apiUrl = "/api/library";

  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);

  const { data, error } = schoolId
    ? useSWR([apiUrl, schoolId], feacher)
    : useSWR(apiUrl, {
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
      title: "النوع",
      dataIndex: "type",
    },
    {
      title: "العدد",
      dataIndex: "quantity",
    },

    {
      title: "المستوى",
      dataIndex: "level",
    },
  ];
  return <TableComponent columns={columns} allData={data} />;
}
