import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function LoadingSpin() {
  const antIcon = <LoadingOutlined className="text-4xl text-gray-500" spin />;
  return (
    <>
      <Spin className="flex justify-center items-center" indicator={antIcon} />
    </>
  );
}
