import { DatePicker, Select, Table, Button } from "antd";

import { NameAndImageShredColumns } from "../tabels/SharedTableItems";
import {
  classes,
  employeesAbcenseResons,
  studentsAbcenseResons,
} from "../../utils/SchoolSubjects";
import moment from "moment";
const { Option } = Select;

export const AbcenceForm = ({
  date,
  type,
  names,
  absenceData,
  loading,
  searchText,
  searchedColumn,

  setAbsenceData,
  setLoading,
  setAbcenceDate,
  setSearchText,
  setSearchedColumn,
  handleTimeSheet,
}) => {
  const hanldeReason = (event, userInfo) => {
    const findIndex = absenceData.findIndex((a) => a._id === userInfo._id);
    if (findIndex > -1) {
      let newArray = [...absenceData];
      if (!event) {
        newArray.splice(findIndex, 1);
        setAbsenceData(newArray);
      } else {
        newArray[findIndex] = { ...newArray[findIndex], reason: event };
        setAbsenceData(newArray);
      }
    }
    if (event && findIndex === -1) {
      setAbsenceData([
        ...absenceData,
        {
          reason: event,
          name: userInfo.name,
          _id: userInfo._id,
          dateOfStart: userInfo.dateOfStart,
        },
      ]);
    }
  };

  const sharedColumns = [
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
    {
      title: "اسم الاب",
      dataIndex: "fatherName",
    },
  ];

  const reasonsArray =
    type === "employees" ? employeesAbcenseResons : studentsAbcenseResons;

  const abcenceReason = [
    {
      title: "سبب الغياب",

      render: (value, row, index) => (
        <div>
          <Select
            allowClear
            placeholder="الرجاء الاختيار"
            onChange={(e) => hanldeReason(e, row)}
            value={absenceData.find((a) => a._id === row._id)?.reason}
          >
            {reasonsArray.map((r, i) => (
              <Option key={i} value={r.text}>
                {r.text}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  const emColumns = [...sharedColumns, ...abcenceReason];

  const stuColumns = [
    ...sharedColumns,
    {
      title: "الصف",
      dataIndex: "classNumber",
      filters: classes,
      onFilter: (value, record) => record.classNumber?.includes(value),
    },

    ...abcenceReason,
  ];

  const handleDateChange = (date, dateText) => {
    setAbcenceDate(dateText);
  };
  return (
    <div>
      <DatePicker
        placeholder="تاريخ الغياب"
        onChange={handleDateChange}
        value={date !== "" ? moment(date) : null}
      />

      <Table
        className="mt-8"
        rowKey="_id"
        columns={type === "students" ? stuColumns : emColumns}
        dataSource={names}
        scroll={{ x: 600, y: 520 }}
      />
      <Button
        disabled={absenceData.length === 0 || !date}
        loading={loading}
        block
        onClick={handleTimeSheet}
        type="primary"
      >
        حفظ
      </Button>
    </div>
  );
};
