import { Menu } from "antd";
import { FileDoneOutlined, LeftOutlined } from "@ant-design/icons";
export default function TeacherMenuList({
  handleClick,
  theme,
  mode,
  className,
  selectedKeys,
}) {
  return (
    <Menu
      onClick={handleClick}
      theme={theme}
      mode={mode}
      defaultSelectedKeys={["students"]}
      selectedKeys={[selectedKeys]}
      className={className}
    >
      <Menu.Item key="students" icon={<LeftOutlined />}>
        جميع الطلاب
      </Menu.Item>
      <Menu.Item key="sychologistForm" icon={<LeftOutlined />}>
        أستمارة اجتماعية
      </Menu.Item>
      <Menu.Item key="administativeDocs" icon={<FileDoneOutlined />}>
        الملفات الادارية
      </Menu.Item>
    </Menu>
  );
}
