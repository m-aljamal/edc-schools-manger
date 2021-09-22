import React, { useState } from "react";
import TableSummary from "./TableSummary";
import { Menu } from "antd";
export default function EmpStuTableSummary({
  empData,
  emptotal,
  stuData,
  stuTotal,
  stuSocialData,

  stuHelthData,
}) {
  const [clickedKey, setClickedKey] = useState({
    value: "employeeByCertifcate",
    text: "اعداد الموظفين حسب التحصيل العلمي",
  });
  const tableData = {
    employeeByCertifcate: {
      data: empData,
      total: emptotal,
      type: "TypeOfCertifcate",
      tableHeadext: "الشهادة",
      text: "اعداد الموظفين حسب التحصيل العلمي",
    },
    studentsByClass: {
      data: stuData,
      total: stuTotal,
      type: "classNumber",
      tableHeadext: "الصف",
      text: "اعداد الطلاب حسب الصف",
    },
    studentsBySocial: {
      data: stuSocialData,
      total: stuTotal,
      type: "familySituation",
      tableHeadext: "الحالة",
      text: "الوضع الاجتماعي للطلاب",
    },
    studentsByHealth: {
      data: stuHelthData,
      total: stuTotal,
      type: "healthSituation",
      tableHeadext: "الحالة",
      text: "الوضع الصحي للطلاب",
    },
  };
  function handleMenuClick(e) {
    setClickedKey({
      text: tableData[e.key].text,
      value: e.key,
    });
  }
  const menu = (
    <Menu onClick={handleMenuClick} className="text-right">
      <Menu.Item key="employeeByCertifcate">
        <p>اعداد الموظفين حسب التحصيل العلمي</p>
      </Menu.Item>
      <Menu.Item key="studentsByClass">
        <p>اعداد الطلاب حسب الصف</p>
      </Menu.Item>
      <Menu.Item key="studentsBySocial">
        <p>الوضع الاجتماعي للطلاب</p>
      </Menu.Item>
      <Menu.Item key="studentsByHealth">
        <p>الوضع الصحي للطلاب</p>
      </Menu.Item>
    </Menu>
  );
  const td = tableData[clickedKey.value];

  return <TableSummary menu={menu} td={td} clickedKey={clickedKey} />;
}
