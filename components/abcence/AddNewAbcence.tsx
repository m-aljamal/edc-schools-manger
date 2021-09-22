import dynamic from "next/dynamic";
import { useState } from "react";
import { Dropdown, Menu } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import AddNewAbcenceForm from "./AddNewAbcenceForm";
const EditAbcenceForm = dynamic(() => import("./EditAbcence"));

const AddNewAbcence = ({ names, displaySheetMonth, type }) => {
  const [isEdit, setIsEdit] = useState(false);

  const menu = () => (
    <Menu style={{ boxShadow: "var(--bs)", borderRadius: "10px" }}>
      <Menu.Item>
        <p onClick={() => setIsEdit(true)}>
          <EditOutlined className="text-green-700" /> تعديل
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container mt-8">
      <div className="flex justify-between items-center">
        <div className="mb-8 font-bold md:text-lg text-base">
          {isEdit ? "تعديل غياب سابق" : "تسجيل غياب جديد:"}
        </div>
        {isEdit ? (
          <CloseOutlined
            className="text-red-800"
            onClick={() => setIsEdit(false)}
          />
        ) : (
          <Dropdown overlay={menu} trigger={["click"]}>
            <EllipsisOutlined />
          </Dropdown>
        )}
      </div>
      {isEdit ? (
        <EditAbcenceForm
          type={type}
          setIsEdit={setIsEdit}
          names={names}
          displaySheetMonth={displaySheetMonth}
        />
      ) : (
        <AddNewAbcenceForm
          type={type}
          names={names}
          displaySheetMonth={displaySheetMonth}
        />
      )}
    </div>
  );
};

export default AddNewAbcence;
