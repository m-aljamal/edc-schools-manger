import React, { useState } from "react";
import EditAbcenceForm from "./EditAbcenceForm";
import { FindAbcenseBySelectDate } from "./FindAbcenseBySelectDate";

const EditAbcence = ({ names, displaySheetMonth, setIsEdit, type }) => {
  const [abcenceData, setAbcenceData] = useState(null);

  return (
    <div>
      <FindAbcenseBySelectDate setAbcenceData={setAbcenceData} type={type} />
      {abcenceData && (
        <div>
          <EditAbcenceForm
            type={type}
            oldData={abcenceData}
            names={names}
            displaySheetMonth={displaySheetMonth}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
    </div>
  );
};

export default EditAbcence;
