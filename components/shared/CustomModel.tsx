import { Modal } from "antd";

const CustomModel = ({
  isModalVisible,
  setIsModalVisible,
  modelDate,
  title,
  destroyOnClose,
  ...props
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      bodyStyle={{ padding: props.padding ? "0" : "" }}
      closable={false}
      footer={false}
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={900}
      destroyOnClose={destroyOnClose}
    >
      {modelDate}
    </Modal>
  );
};

export default CustomModel;
