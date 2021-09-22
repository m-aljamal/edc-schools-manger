import { DatePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import setDate from "../../utils/setDate";
export const FindAbcenseByDate = ({
  setAbcenceData,
  type,
  schoolId,
  isAdmin,
}) => {
  const [selecteddate, setSetDate] = useState(setDate(new Date()));

  useEffect(() => {
    (async () => {
      setAbcenceData(null);
      if (selecteddate) {
        try {
          const res = await axios.get(
            `/api/statistics/findAbcenseByDate/${type}/${selecteddate}`,
            { headers: { schoolId } }
          );

          if (!res.data) {
            setAbcenceData(null);
            return message.info(`لايوجد غياب في هذا التاريخ`);
          }
          if (res.status === 200) setAbcenceData(res.data);
        } catch (error) {
          setAbcenceData(null);
          message.error(error.response?.data?.error);
        }
      }
    })();
  }, [selecteddate, schoolId]);
  const dateFormat = "YYYY/MM/DD";
  return (
    <div style={{ display: "flex" }}>
      <p style={{ marginLeft: "10px" }}>اختر تاريخ الغياب:</p>
      <DatePicker
        defaultValue={moment(selecteddate, dateFormat)}
        onChange={(date, dateString) => setSetDate(setDate(dateString))}
        style={{ marginBottom: "20px" }}
        placeholder="اختر التاريخ"
      />
    </div>
  );
};
