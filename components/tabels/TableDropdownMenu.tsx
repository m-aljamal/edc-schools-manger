import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import AddNewPersonForm from "../persons/AddNewPersonForm";
import DeletePerson from "../persons/DeletePerson";
import CustomModel from "../shared/CustomModel";

export default function DropdownMeny({
  record,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [destroyOnClose, setdestroyOnClose] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setOpenEdit(true);
        }}
        icon={<i className="far fa-edit"></i>}
      >
        تعديل
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setOpenDelete(true);
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
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        arrow
        trigger={["click"]}
      >
        <i className="fas fa-caret-down text-lg text-gray-600 cursor-pointer"></i>
      </Dropdown>

      <CustomModel
        // padding={showContent.profile}
        isModalVisible={openEdit || openDelete}
        setIsModalVisible={setOpenEdit || setOpenDelete}
        modelDate={
          openEdit ? (
            <AddNewPersonForm
              edit={true}
              type={record?.type}
              setIsModalVisible={setOpenEdit || setOpenDelete}
              setdestroyOnClose={setdestroyOnClose}
              oldData={record}
            />
          ) : (
            <DeletePerson
              close={() => setOpenDelete(false)}
              type={record.type}
              id={record._id}
              name={record.name}
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
