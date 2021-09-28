import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import AddNewPersonForm from "../persons/AddNewPersonForm";
import DeletePerson from "../persons/DeletePerson";
import ProfilePage from "../persons/ProfilePage";
import CustomModel from "../shared/CustomModel";

export default function DropdownMeny({ record }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  const [visible, setVisible] = useState({
    type: "",
    show: false,
  });
  const menu = (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() => {
          // setOpenEdit(true);
          setVisible({ show: true, type: "edit" });
        }}
        icon={<i className="far fa-edit"></i>}
      >
        تعديل
      </Menu.Item>
      <Menu.Item
        key="profile"
        onClick={() => {
          // setOpenProfile(true);
          setVisible({ show: true, type: "profile" });
        }}
        className="text-gray-600"
        icon={<i className="far fa-address-card"></i>}
      >
        مشاهدة
      </Menu.Item>
      <Menu.Item
        key="delete"
        onClick={() => {
          // setOpenDelete(true);
          setVisible({ show: true, type: "delete" });
        }}
        className="text-red-400"
        icon={<i className="far fa-trash-alt"></i>}
      >
        حذف
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={["click"]}>
        <i className="fas fa-caret-down text-lg text-gray-600 cursor-pointer"></i>
      </Dropdown>

      <CustomModel
        // padding={showContent.profile}
        isModalVisible={visible.show}
        setIsModalVisible={() => setVisible({ show: false, type: "" })}
        modelDate={
          visible.type === "edit" ? (
            <AddNewPersonForm
              edit={true}
              type={record?.type}
              setIsModalVisible={visible.show}
              setdestroyOnClose={setdestroyOnClose}
              oldData={record}
            />
          ) : visible.type === "delete" ? (
            <DeletePerson
              close={() => setOpenDelete(false)}
              type={record.type}
              id={record._id}
              name={record.name}
            />
          ) : (
            <ProfilePage
              // close={() => setOpenProfile(false)}
              type={record.type}
              // id={record._id}

              data={record}
            />
          )
        }
        title={
          openDelete
            ? `حذف معلومات ${record?.name}`
            : openEdit && `تعديل معلومات ${record?.name}`
        }
        destroyOnClose={destroyOnClose}
      />
    </>
  );
}
