import { DatePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const FindAbcenseBySelectDate = ({ setAbcenceData, type }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setAbcenceData(null);
      if (isMounted) {
        if (date) {
          try {
            const res = await axios.get(`/api/absence-api/${type}/${date}`);
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
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [date]);
  return (
    <div style={{ display: "flex" }}>
      <p style={{ marginLeft: "10px" }}> اختر تاريخ الغياب:</p>
      <DatePicker
        onChange={(date, dateString) => setDate(dateString)}
        style={{ marginBottom: "20px" }}
        placeholder="اختر التاريخ"
      />
    </div>
  );
};
