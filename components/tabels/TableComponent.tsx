import { Table } from "antd";
import { useEffect, useState } from "react";

import TableDropdownMenu from "./TableDropdownMenu";
const TableComponent = ({ columns, allData }) => {
  const [total, setTotal] = useState("");

  useEffect(() => {
    setTotal(allData?.length);
  }, [allData]);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setTotal(extra.currentDataSource.length);
  };

  return (
    <div>
      <Table
        columns={[
          {
            title: "",
            dataIndex: "",

            width: 45,
            render: (record) => <TableDropdownMenu record={record} />,
          },

          ...columns,
        ]}
        dataSource={allData}
        rowKey="_id"
        bordered
        loading={!allData}
        onChange={handleTableChange}
        scroll={{ x: 1100, y: 400 }}
        showSorterTooltip={false}
        pagination={{ position: ["bottomRight"] }}
        footer={() => (
          <p style={{ textAlign: "start" }}>
            العدد الاجمالي:
            <span className="text-blue-400 font-bold">{total && total}</span>
          </p>
        )}
      />
    </div>
  );
};

export default TableComponent;
