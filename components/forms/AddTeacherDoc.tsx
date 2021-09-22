import { Button, message, AutoComplete } from "antd";
import axios from "axios";
import useSWR, { trigger } from "swr";
import LoadingSpin from "../shared/LoadingSpin";
import { useState } from "react";

export default function AddDoc({ setIsModalVisible, setdestroyOnClose }) {
  const { data, error } = useSWR("/api/drive/teacherfiles");
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
  const [folder, setFolder] = useState({
    name: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const options = [];
  folders.forEach((f) => options.push({ value: f.name, id: f.id }));

  const [files, setFile] = useState([]);

  const handleCreateNewFolder = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", folder.name);
      formData.append("folderId", folder.id);
      for (let file of files) {
        formData.append("files", file);
      }
      const res = await axios.post("/api/drive/upload", formData);

      if (res.status === 200) {
        setLoading(false);
        trigger("/api/drive");
        trigger("/api/drive/teacherfiles");
        setdestroyOnClose(true);
        message.success(`تم انشاء المجلد بنجاح`);
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(error.response.data.error);
    }
  };
  const handleChange = async (e) => {
    setFile(e.target.files);
  };
  const onChange = (value) => {
    let id = options.find((o) => o.value === value)?.id;
    setFolder({ name: value, id: id || "new" });
  };

  return (
    <form onSubmit={handleCreateNewFolder}>
      <div>
        <AutoComplete
          className="w-full mb-4"
          onChange={onChange}
          allowClear
          options={options}
          placeholder="اختار المجلد"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
      <label className="input-wrapper bg-gray-600 text-white p-2 cursor-pointer  ">
        اختار الملف
        <input hidden type="file" onChange={handleChange} multiple />
      </label>
      <Button
        className="text-base bg-blue-400 hover:bg-blue-500 mt-4"
        htmlType="submit"
        block
        type="primary"
        loading={loading}
      >
        رفع الملف
      </Button>
    </form>
  );
};
