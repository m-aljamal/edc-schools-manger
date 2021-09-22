import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomModel from "./CustomModel";
const AddNewButton = ({
  modelData,
  modelTitle,
  isModalVisible,
  setIsModalVisible,
  destroyOnClose,
}) => {
  return (
    <>
      <Button
        type="primary"
        className="flex items-center justify-center place-content-center"
        shape="circle"
        icon={<PlusOutlined />}
        size="middle"
        onClick={() => setIsModalVisible(true)}
      />
      <CustomModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modelDate={modelData}
        title={modelTitle}
        destroyOnClose={destroyOnClose}
      />
    </>
  );
};

export default AddNewButton;
