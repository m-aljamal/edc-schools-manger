import { Table, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import CustomModel from "../shared/CustomModel";
import ProfilePage from "../persons/ProfilePage";
import AddNewPersonForm from "../persons/AddNewPersonForm";

import DeletePerson from "../persons/DeletePerson";

const TableComponent = ({ columns, allData }) => {
  const [total, setTotal] = useState("");
  const [showContent, setShowContent] = useState({
    delete: false,
    profile: false,
    edit: false,
  });

  const [destroyOnClose, setdestroyOnClose] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [visible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setTotal(allData?.length);
  }, [allData]);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setTotal(extra.currentDataSource.length);
  };

  return (
    <div>
      {visible && (
        <CustomModel
          padding={showContent.profile}
          isModalVisible={
            showContent.profile || showContent.edit || showContent.delete
          }
          setIsModalVisible={setIsModalVisible}
          modelDate={
            showContent.profile ? (
              <ProfilePage data={selectedData} type={selectedData?.type} />
            ) : showContent.edit ? (
              <AddNewPersonForm
                edit={true}
                type={selectedData?.type}
                setIsModalVisible={setIsModalVisible}
                setdestroyOnClose={setdestroyOnClose}
                oldData={selectedData}
              />
            ) : (
              <DeletePerson
                close={() => setIsModalVisible(false)}
                type={selectedData.type}
                id={selectedData._id}
                name={selectedData.name}
              />
            )
          }
          title={
            showContent.delete
              ? `حذف معلومات ${selectedData?.name}`
              : showContent.edit &&
                `تعديل معلومات ${
                  selectedData?.type === "students" ? "طالب" : "موظف"
                }`
          }
          destroyOnClose={destroyOnClose}
        />
      )}
      <Table
        columns={columns}
        dataSource={allData}
        rowKey="_id"
        bordered
        loading={!allData}
        onChange={handleTableChange}
        scroll={{ x: 1000, y: 400 }}
        showSorterTooltip={false}
        pagination={{ position: ["bottomRight"] }}
        footer={() => (
          <p style={{ textAlign: "start" }}>
            العدد الاجمالي:
            <span className="text-blue-400 font-bold">{total && total}</span>
          </p>
        )}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (event.ctrlKey) {
                // show edit
                setSelectedData(record);
                setShowContent({ delete: false, edit: true, profile: false });
                setIsModalVisible(true);
                // edit
              } else if (event.altKey) {
                // delete
                setIsModalVisible(true);
                setSelectedData(record);
                setShowContent({ delete: true, edit: false, profile: false });
                console.log("delete");
              } else {
                // show profile
                setShowContent({ delete: false, profile: true, edit: false });
                setIsModalVisible(true);
                setSelectedData(record);
              }
            },
          };
        }}
      />
    </div>
  );
};

export default TableComponent;
