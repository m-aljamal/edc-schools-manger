import { Button, message, Table, Tag, DatePicker, Select } from "antd";
import { trigger } from "swr";
import axios from "axios";
import React, { useState } from "react";
import setDate from "../../utils/setDate";
import { NameAndImageShredColumns } from "../tabels/SharedTableItems";
import {
  classes,
  employeesAbcenseResons,
  studentsAbcenseResons,
} from "../../utils/SchoolSubjects";
import moment from "moment";

const { Option } = Select;

const EditAbcenceForm = ({
  names,
  displaySheetMonth,
  oldData,
  setIsEdit,
  type,
}) => {
  const [absenceData, setAbsenceData] = useState(oldData.names);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [date, setAbcenceDate] = useState(oldData.date);
  const [loading, setLoading] = useState(false);
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

  const handleTimeSheet = async () => {
    try {
      let res = await axios.put(`/api/absence-api/${type}/${oldData._id}`, {
        date: setDate(date),
        names: absenceData,
      });
      trigger(`/api/absence-api/${type}/month/${displaySheetMonth}`);
      if (res.status === 200) {
        setIsEdit(false);

        message.success("تم تعديل الغياب بنجاح");
      }
    } catch (error) {
      message.error(error.response?.data?.error);
    }
  };

  return (
    <div>
      <DatePicker
        placeholder="تاريخ الغياب"
        onChange={handleDateChange}
        value={date !== "" ? moment(date) : null}
      />
      <div>
        <span className="ml-4"></span>
      </div>
      <Table
        rowKey="_id"
        columns={type === "students" ? stuColumns : emColumns}
        dataSource={names}
      />
      <Button
        disabled={absenceData.length === 0 || !date}
        loading={loading}
        block
        onClick={handleTimeSheet}
        type="primary"
        className="mb-8"
      >
        حفظ
      </Button>
    </div>
  );
};

export default EditAbcenceForm;
