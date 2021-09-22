import { message } from "antd";
import axios from "axios";
import { trigger } from "swr";

export default function DeletePerson({ type, id, name, close }) {
  const handleDelete = async () => {
    close();
    try {
      const deleteURL = `/api/names/${type}/${id}`;
      const url = `/api/names/${type}`;

      const res = await axios.delete(deleteURL);
      trigger(url);
      if (res.status === 200) {
        message.success("تم حذف الاسم بنجاح");
      }
    } catch (error) {
      message.error(error?.response?.data?.error);
    }
  };
  return (
    <div>
      <h2 className="text-gray-800 text-base">
        هل متأكد من حذف معلومات {name}
      </h2>
      <div className="mt-8 text-base flex justify-between items-center ">
        <button
          className=" py-1 px-8 text-white bg-red-500 fornt-bold rounded-md "
          onClick={handleDelete}
        >
          حذف
        </button>
        <button
          className="py-1 px-8 text-gray-800 fornt-bold border rounded-md"
          onClick={close}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
