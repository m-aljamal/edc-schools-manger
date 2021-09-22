import DropdownMenu from "./DropdownMenu";
import { Avatar } from "antd";
import { getColumnSearchProps } from "./searchInTable";
import { address } from "../../static/address";
export const NameAndImageShredColumns = (
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn
) => {
  return [
    {
      title: "الاسم",
      dataIndex: "name",
      width: 180,
      ...getColumnSearchProps(
        "name",
        "الاسم",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },

    {
      title: "الصورة",
      width: 75,
      dataIndex: "image",
      render: (text) => (
        <>
          {text.url ? (
            <Avatar size="large" src={text.url} alt="image" />
          ) : (
            <Avatar>U</Avatar>
          )}
        </>
      ),
    },
  ];
};

export const TypeCertifcate = (typeOfCertifcate) => {
  return {
    title: "التحصيل العلمي",
    dataIndex: "TypeOfCertifcate",
    filters: typeOfCertifcate,
    width: 150,
    onFilter: (value, record) => record.TypeOfCertifcate.indexOf(value) === 0,
  };
};

export const SharedTableItems = (type, allData, isAdmin) => {
  return [
    {
      title: "الجنس",
      dataIndex: "sex",
      width: 100,
      filters: [
        {
          text: "ذكر",
          value: "ذكر",
        },
        {
          text: "انثى",
          value: "انثى",
        },
      ],
      onFilter: (value, record) => record.sex?.indexOf(value) === 0,
    },
    {
      title: "خط الباص",
      dataIndex: "busPath",
      width: 130,
      filters: address,
      onFilter: (value, record) => record.busPath?.indexOf(value) === 0,
    },
  ];
};
