import { Skeleton } from "antd";

const SkeletonLoading = () => {
  return (
    <div>
      <SKA />
    </div>
  );
};

export default SkeletonLoading;

const SKA = () => {
  return <Skeleton.Avatar size="large" active shape="square" className="m-4" />;
};
