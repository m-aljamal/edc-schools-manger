import { Avatar, Dropdown, Menu } from "antd";
import axios from "axios";
import router from "next/router";
import React from "react";
import { PoweroffOutlined } from "@ant-design/icons";

const UserDropdown = ({ currentUser }) => {
  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>الصفحة الشخصية</Menu.Item>
      <Menu.Item icon={<PoweroffOutlined />} onClick={handleLogout}>
        تسجيل الخروج
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={["click"]}>
        <div className="flex items-center border   text-gray-100  p-1 rounded-md font-bold cursor-pointer ">
          <i className=" fas fa-angle-down ml-2"></i>
          <p>{currentUser?.name}</p>
        </div>
      </Dropdown>
    </>
  );
};

export default UserDropdown;
