import FormItem from "antd/lib/form/FormItem";
import { Formik } from "formik";
// import { Form, Input, AutoComplete } from "formik-antd";
import { Button, message, AutoComplete } from "antd";
import axios from "axios";
import useSWR, { trigger } from "swr";
import LoadingSpin from "../shared/LoadingSpin";
import { useEffect, useState } from "react";

export default function AddDoc({ setIsModalVisible, setdestroyOnClose }) {
  const { data, error } = useSWR("/api/drive");
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    <p>error</p>;
  }

  return (
    <div>
      <div>
        <AddNewFolder
          setIsModalVisible={setIsModalVisible}
          setdestroyOnClose={setdestroyOnClose}
          folders={data}
        />
      </div>
    </div>
  );
}

const AddNewFolder = ({ setIsModalVisible, setdestroyOnClose, folders }) => {
  const [teacherFolders, setTeacherFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chooseTeacherFolder, setchooseTeacherFolder] = useState({
    name: "",
    id: "",
  });
  const options = [];
  folders.forEach((f) => options.push({ value: f.name, id: f.id }));
  const [chooseFolder, setChoseFolder] = useState({
    name: "",
    id: "",
  });
  const [files, setFile] = useState([]);

  const handleCreateNewFolder = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("parentFolderName", chooseTeacherFolder.name);
      formData.append("parentFolderId", chooseTeacherFolder.id);
      formData.append("name", chooseFolder.name);
      formData.append("folderId", chooseFolder.id);
      for (let file of files) {
        formData.append("files", file);
      }
      const res = await axios.post("/api/drive/upload", formData);
      if (res.status === 200) {
        setLoading(false);
        trigger("/api/drive");
        setdestroyOnClose(true);
        message.success(`تم رفع المجلد بنجاح`);
        setIsModalVisible(false);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.error);
    }
  };
  const handleChange = async (e) => {
    setFile(e.target.files);
  };
  const onChange = async (value) => {
    if (!value) {
      setchooseTeacherFolder({
        name: "",
        id: "",
      });
      setTeacherFolders([]);
    } else {
      const id = options.find((o) => o.value === value)?.id;
      setchooseTeacherFolder({ name: value, id });
      const teacherFolders = await axios.get(`/api/drive/getFiles/${id}`);
      setTeacherFolders(
        teacherFolders?.data.map((f) => ({ value: f.name, id: f.id }))
      );
    }
  };

  const onFolderChange = (value) => {
    if (!value) {
      setTeacherFolders([]);
    } else {
      const id = teacherFolders.find((o) => o.value === value)?.id;
      setChoseFolder({ name: value, id });
    }
  };

  return (
    <form onSubmit={handleCreateNewFolder}>
      <div>
        <AutoComplete
          className="w-full mb-4"
          onChange={onChange}
          allowClear
          options={options}
          placeholder="اختار مجلد المدرس"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
      <div>
        <AutoComplete
          className="w-full mb-4"
          onChange={onFolderChange}
          allowClear
          options={teacherFolders}
          placeholder=" اختار اسم المجلد او انشئ جديد"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
      <input type="file" onChange={handleChange} multiple />
      <Button
        className="text-base bg-blue-400 hover:bg-blue-500"
        htmlType="submit"
        block
        type="primary"
        loading={loading}
      >
        رفع الملف
      </Button>
    </form>
    // <Formik initialValues={folderInitialValue} onSubmit={handleCreateNewFolder}>
    //   {({ values }) => (
    //     <Form>
    //       <FormItem name="name" label="اسم المجلد">
    //         <AutoComplete
    //           allowClear
    //           name="name"
    //           options={options}
    //           placeholder="اختار المجلد"
    //           filterOption={(inputValue, option) =>
    //             option!.value
    //               .toUpperCase()
    //               .indexOf(inputValue.toUpperCase()) !== -1
    //           }
    //         />
    //       </FormItem>
    //       <FormItem>
    //         <input type="file" onChange={handleChange} multiple />
    //       </FormItem>
    //       <Button
    //         className="text-base bg-blue-400 hover:bg-blue-500"
    //         htmlType="submit"
    //         block
    //         type="primary"
    //       >
    //         رفع الملف
    //       </Button>
    //     </Form>
    //   )}
    // </Formik>
  );
};
