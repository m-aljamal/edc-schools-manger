import { Menu } from "antd";
import { TeamOutlined, FundOutlined, LeftOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

export default function adminMenuList({
  handleClick,
  schools,
  selectedKeys,
  theme,
  mode,
  className,
}) {
  return (
    <Menu
      onClick={handleClick}
      theme={theme}
      mode={mode}
      defaultSelectedKeys={["home"]}
      selectedKeys={[selectedKeys]}
      className={className}
    >
      <Menu.Item key="home" icon={<FundOutlined />}>
        الرئيسية
      </Menu.Item>
      <Menu.Item key="schoolsUsers" icon={<FundOutlined />}>
        مشرفي المدارس
      </Menu.Item>

      <SubMenu key="allSchools" icon={<TeamOutlined />} title="المدارس">
        {schools?.map((s, i) => (
          <Menu.Item key={s._id} icon={<LeftOutlined />}>
            {s.name}
          </Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
}
