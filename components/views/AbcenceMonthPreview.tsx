import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MonthTable from "../abcence/AbcenceMonthTable";
import axios from "axios";
import useSWR from "swr";

export default function AbcenceMonthPreview({ schoolId, type }) {
  const [displaySheetMonth, setdisplayMonthSheet] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);
  const apiurl = `/api/names/${type}`;
  const res = schoolId
    ? useSWR([apiurl, schoolId], feacher)
    : useSWR(apiurl, {
        dedupingInterval: 60000,
      });

  const monthAbsenceUrl = `/api/absence-api/${type}/month/${displaySheetMonth}`;

  const { data } = schoolId
    ? useSWR([monthAbsenceUrl, schoolId], feacher)
    : useSWR(monthAbsenceUrl, {
        dedupingInterval: 60000,
      });
  const handleLastMonth = () => {
    setdisplayMonthSheet((current) => {
      const prev = new Date(current.setMonth(current.getMonth() - 1));

      return prev;
    });
  };
  const handNextMonth = () => {
    setdisplayMonthSheet((current) => {
      const prev = new Date(current.setMonth(current.getMonth() + 1));
      return prev;
    });
  };
  useEffect(() => {
    if (!data) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);
  return (
    <div className="container mt-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold md:text-lg text-base">
          جدول الغياب لتاريخ:
          <span className="mr-4 text-pink-900">
            {displaySheetMonth.toLocaleDateString("ar-SY", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </h2>
        <div>
          <Button
            type="primary"
            onClick={handleLastMonth}
            icon={<RightOutlined />}
            className="ml-4"
            loading={loading}
          />
          <Button
            type="primary"
            onClick={handNextMonth}
            icon={<LeftOutlined />}
            loading={loading}
          />
        </div>
      </div>

      <MonthTable
        names={res.data}
        absenceListByMonth={data}
        displaySheetMonth={displaySheetMonth}
      />
    </div>
  );
}
