import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import AddNewPersonForm from "../persons/AddNewPersonForm";
import DeletePerson from "../persons/DeletePerson";
import ProfilePage from "../persons/ProfilePage";
import SocialForm from "../persons/SocialForm";
import CustomModel from "../shared/CustomModel";
import { useRouter } from "next/router";
export default function DropdownMeny({ record }) {
  const router = useRouter();

  const [destroyOnClose, setdestroyOnClose] = useState(false);
  const [visible, setVisible] = useState({
    type: "",
    show: false,
  });

  const menu = (
    <Menu>
      {router.query.id !== "مرشد نفسي" && (
        <Menu.Item
          key="edit"
          onClick={() => {
            setVisible({ show: true, type: "edit" });
          }}
          icon={<i className="far fa-edit"></i>}
        >
          تعديل
        </Menu.Item>
      )}

      {router.query.id === "مرشد نفسي" && (
        <Menu.Item
          key="socialForm"
          onClick={() => {
            setVisible({ show: true, type: "socialForm" });
          }}
          icon={<i className="far fa-edit"></i>}
        >
          استمارة اجتماعية
        </Menu.Item>
      )}
      <Menu.Item
        key="profile"
        onClick={() => {
          setVisible({ show: true, type: "profile" });
        }}
        className="text-gray-600"
        icon={<i className="far fa-address-card"></i>}
      >
        مشاهدة
      </Menu.Item>
      {router.query.id !== "مرشد نفسي" && (
        <Menu.Item
          key="delete"
          onClick={() => {
            setVisible({ show: true, type: "delete" });
          }}
          className="text-red-400"
          icon={<i className="far fa-trash-alt"></i>}
        >
          حذف
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={["click"]}>
        <i className="fas fa-caret-down text-lg text-gray-600 cursor-pointer"></i>
      </Dropdown>

      <CustomModel
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
              onClose={() => setVisible({ show: false, type: "" })}
              type={record.type}
              id={record._id}
              name={record.name}
            />
          ) : visible.type === "profile" ? (
            <ProfilePage
              type={record.type}
              // id={record._id}

              data={record}
            />
          ) : (
            <SocialForm
              closeForm={() => {
                setVisible({ show: false, type: "" });
                setdestroyOnClose(true);
              }}
              type={record.type}
              id={record._id}
              name={record.name}
            />
          )
        }
        title={
          visible.type === "delete"
            ? `حذف معلومات ${record?.name}`
            : visible.type === "edit"
            ? `تعديل معلومات ${record?.name}`
            : visible.type === "socialForm" &&
              `استمارة جديدة للطالب ${record?.name}`
        }
        destroyOnClose={destroyOnClose}
      />
    </>
  );
}
