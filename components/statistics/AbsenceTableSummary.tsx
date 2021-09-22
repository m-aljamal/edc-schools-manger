import { useState } from "react";
import { Menu } from "antd";
import TableSummary from "./TableSummary";
const AbsenceTableSummary = ({
  totalAbsence,
  absenceOfYear,
  absenceByReason,
  absenceByNameAndReson,
}) => {
  const [clickedKey, setClickedKey] = useState({
    value: "totalAbsenceOfYear",
    text: `اسماء الغياب  `,
  });
  const tableData = {
    totalAbsenceOfYear: {
      data: absenceOfYear,
      total: totalAbsence,
      type: "name",
      tableHeadext: "الاسم",
      text: `اسماء الغياب `,
    },
    totalabsenceByReason: {
      data: absenceByReason,
      total: totalAbsence,
      type: "name",
      tableHeadext: "سبب الغياب",
      text: `الغياب حسب السبب`,
    },
    absenceByNameAndReson: {
      data: absenceByNameAndReson,
      total: totalAbsence,
      type: "name",
      type2: "reason",
      tableHeadext: "الاسم",
      text: `اسم الغياب مع السبب`,
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
      <Menu.Item key="totalAbsenceOfYear">
        <p> اسماء الغياب</p>
      </Menu.Item>
      <Menu.Item key="totalabsenceByReason">
        <p>الغياب حسب السبب</p>
      </Menu.Item>
      <Menu.Item key="absenceByNameAndReson">
        <p>اسم الغياب مع السبب</p>
      </Menu.Item>
    </Menu>
  );
  const td = tableData[clickedKey.value];

  return <TableSummary td={td} menu={menu} clickedKey={clickedKey} />;
};
export default AbsenceTableSummary;
