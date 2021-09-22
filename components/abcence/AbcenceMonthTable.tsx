import { Table, Input, Button, Space, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import setDate from "../../utils/setDate";
import { checkWeekDays } from "../../utils/weekendDays";

const AbcenceMonthTable = ({
  names,
  absenceListByMonth,
  displaySheetMonth,
}) => {
  const [todayAbcenseTotal, settodayAbcenseTotal] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const date = new Date(displaySheetMonth);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const totalDays = new Date(y, m, 0).getDate();

  const getColumnSearchProps = (dataIndex: string, title: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-4">
        <Input
          dir="rtl"
          autoFocus
          placeholder={`بحث ${title} `}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            بحث
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            إعادة تعيين
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);

              setSearchedColumn(dataIndex);
            }}
          >
            تصفية
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const teachersColumns: [{}] = [
    {
      title: "الاسم",
      dataIndex: "name",
      ...getColumnSearchProps("name", "الاسم"),
      width: 100,
    },
  ];

  for (let i = 1; i <= totalDays; i++) {
    teachersColumns.push({
      title: i,
      width: 25,
      render: (value, row, index) => {
        const weekend = checkWeekDays(date, i);
        if (weekend) {
          return (
            <Tooltip placement="topLeft" title="عطلة اسبوعية">
              <PauseOutlined className="text-blue-500" />
            </Tooltip>
          );
        }

        let abcence;
        for (abcence in absenceListByMonth) {
          let employee;

          for (employee in absenceListByMonth[abcence].names) {
            while (
              new Date(absenceListByMonth[abcence].date).getUTCDate() === i &&
              row.name === absenceListByMonth[abcence].names[employee].name
            ) {
              return (
                <Tooltip
                  placement="topLeft"
                  title={absenceListByMonth[abcence].names[employee].reason}
                >
                  <CloseOutlined className="text-red-500" />
                </Tooltip>
              );
            }
          }
        }

        if (setDate(row.dateOfStart) <= setDate(new Date(y, m - 1, i))) {
          return <CheckOutlined className="text-green-600" />;
        }

        return (
          <Tooltip placement="topLeft" title="لا يوجد بيانات">
            <p>-</p>
          </Tooltip>
        );
      },
    });
  }

  useEffect(() => {
    settodayAbcenseTotal("");
    if (absenceListByMonth) {
      const todayAbsence = absenceListByMonth.find(
        (a) =>
          setDate(new Date(a.date)).toISOString() ===
          setDate(new Date()).toISOString()
      );
      if (todayAbsence) {
        settodayAbcenseTotal(todayAbsence.names.length);
      }
    }
  }, [absenceListByMonth]);

  return (
    <div className="mt-10">
      <Table
        columns={teachersColumns}
        dataSource={names}
        rowKey="_id"
        bordered
        loading={!absenceListByMonth || !names}
        scroll={{ x: 1800, y: 520 }}
        showSorterTooltip={false}
        pagination={{ position: ["bottomRight"] }}
        footer={() => (
          <p className="font-bold">
            {todayAbcenseTotal ? `  العدد الاجمالي للغياب اليوم:` : ``}
            <span className="mr-2 text-pink-900">
              {todayAbcenseTotal && todayAbcenseTotal}
            </span>
          </p>
        )}
      />
    </div>
  );
};

export default AbcenceMonthTable;
