import { useState } from "react";
import useSWR from "swr";
import TableComponent from "./TableComponent";
import { NameAndImageShredColumns } from "./SharedTableItems";
import axios from "axios";
export default function SchoolAssetsTable({ schoolId }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const apiUrl = "/api/schoolAssets";

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
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
    {
      title: "النوع",
      dataIndex: "type",
    },
    {
      title: "العدد",
      dataIndex: "quantity",
    },
    {
      title: "سعر الشراء $",
      dataIndex: "priceOfBay",
    },
    {
      title: "الرقم التسلسلي",
      dataIndex: "serialNumber",
    },
    {
      title: "تاريخ الشراء",
      dataIndex: "dateOfBay",
      render: (text) => (
        <div>
          <p>{new Date(text).toDateString()}</p>
        </div>
      ),
    },
  ];
  return <TableComponent columns={columns} allData={data} />;
}
