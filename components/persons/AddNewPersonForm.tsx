import React, { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { trigger } from "swr";

import AddNewTeacherForm from "../forms/AddNewTeacherForm";
import AddNewAddministratorForm from "../forms/AddNewAddministratorForm";
import AddNewServicesForm from "../forms/AddNewServicesForm";
import AddNewStudentForm from "../forms/AddNewStudentForm";

export default function AddNewPersonForm({
  type,
  oldData,
  edit,
  setIsModalVisible,
  setdestroyOnClose,
}) {
  const [image, setImage] = useState(oldData?.image || "");
  const [graduateImage, setGraduateImage] = useState(
    oldData?.graduateImage || ""
  );
  const [contractImage, setContractImage] = useState(
    oldData?.contractImage || ""
  );

  const handleNew = async (values, helpers) => {
    const url = `/api/names/${type}`;
    try {
      const res = await axios.post(url, {
        ...values,
        image,
        graduateImage,
        contractImage,
      });

      trigger(url);
      if (res.status === 200) {
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success("تم التسجيل بنجاح");
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(error.response.data.error);
    }
  };

  const handleEdit = async (values, helpers) => {
    try {
      const res = await axios.put(`/api/names/${type}/${oldData._id}`, {
        ...values,
        image,
        graduateImage,
        contractImage,
      });
      trigger(`/api/names/${type}`);
      if (res.status === 200) {
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success("تم التعديل بنجاح");
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(error.response.data.error);
    }
  };
  const props = {
    oldData: oldData,
    edit: edit,
    handleEdit: handleEdit,
    handleNew: handleNew,
    image: image,
    setImage: setImage,
    graduateImage: graduateImage,
    setGraduateImage: setGraduateImage,
    contractImage: contractImage,
    setContractImage: setContractImage,
    type: type,
  };

  const formByType = {
    administrators: <AddNewAddministratorForm {...props} />,
    teacher: <AddNewTeacherForm {...props} />,
    services: <AddNewServicesForm {...props} />,
    students: <AddNewStudentForm {...props} />,
  };
  return formByType[type];
}
