import { Menu } from "antd";
import {
  TeamOutlined,
  FundOutlined,
  BarcodeOutlined,
  BookOutlined,
  CalculatorOutlined,
  FileDoneOutlined,
  SmileOutlined,
  LeftOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

const MenuList = ({ handleClick, theme, mode, className, selectedKeys }) => {
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
      <SubMenu key="sub1" icon={<TeamOutlined />} title="الموظفين">
        <Menu.Item key="teachers" icon={<LeftOutlined />}>
          المدرسين
        </Menu.Item>
        <Menu.Item key="administrators" icon={<LeftOutlined />}>
          الاداريين
        </Menu.Item>
        <Menu.Item key="services" icon={<LeftOutlined />}>
          الخدميين
        </Menu.Item>
        <Menu.Item key="employeesTimeSheet" icon={<LeftOutlined />}>
          تسجيل الغياب
        </Menu.Item>
        <Menu.Item key="monthlyEmployeesTimeSheet" icon={<LeftOutlined />}>
          الغياب الشهري
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        icon={<i className="fas fa-user-graduate"></i>}
        title="الطلاب"
      >
        <Menu.Item key="students" icon={<LeftOutlined />}>
          جميع الطلاب
        </Menu.Item>
        <Menu.Item key="stutimesheet" icon={<LeftOutlined />}>
          تسجيل الغياب
        </Menu.Item>
        <Menu.Item key="monthlyStudentTimeSheet" icon={<LeftOutlined />}>
          الغياب الشهري
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="activites" icon={<i className="fas fa-skating"></i>}>
        الأنشطة المدرسية
      </Menu.Item>
      <Menu.Item key="assets" icon={<BarcodeOutlined />}>
        موجودات المدرسة
      </Menu.Item>
      <Menu.Item key="library" icon={<BookOutlined />}>
        مكتبة المدرسة
      </Menu.Item>
      <Menu.Item key="11" icon={<CalculatorOutlined />}>
        البرنامج الاسبوعي
      </Menu.Item>
      <Menu.Item key="12" icon={<FileDoneOutlined />}>
        نتائج الامتحانات
      </Menu.Item>
      <Menu.Item key="administativeDocs" icon={<FileDoneOutlined />}>
        الملفات الادارية
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
