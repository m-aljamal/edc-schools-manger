import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../shared/LoadingSpin";
 export default function FileList({ setShowFolders, folder }) {
  const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(`/api/drive/getFiles/${folder.id}`);
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    console.log("error", error);
  }

  // console.log(data);

  const handleView = async (id) => {
    setLoading(true);
    const { data } = await axios.get(`/api/drive/${id}/getfile`);
    if (data.webViewLink) {
      setLoading(false);
      window.open(data.webViewLink, "_blank");
    }
  };

  // driveId: "0AKK2FEcg3f53Uk9PVA"
  // id: "1CUaoHs_QmM5un6jfnCITR6NgDCc_xuZQ"
  // kind: "drive#file"
  // mimeType: "application/vnd.google-apps.folder"
  // name: "الفصل الأول"
  // teamDriveId: "0AKK2FEcg3f53Uk9PVA"

  // file

  //   driveId: "0AKK2FEcg3f53Uk9PVA"
  // id: "1ENSzWjm0FDzO9Gg2ZeVjbXIRalPIkxf1"
  // kind: "drive#file"
  // mimeType: "application/pdf"
  // name: "164821771.pdf"

  if (loading) {
    return <LoadingSpin />;
  }
  const fileIcon = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      name: "word",
      color: "blue",
    },
    "application/pdf": { name: "pdf", color: "red" },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      name: "excel",
      color: "green",
    },
    "image/jpeg": { name: "image", color: "gray" },
  };

  return (
    <>
      <div className="flex gap-10 items-center transform -translate-y-6 mt-4">
        <i
          className="fas fa-arrow-up cursor-pointer  text-lg "
          onClick={() => setShowFolders({ show: false, id: "", name: "" })}
        ></i>
        <p className="mr-2 font-bold text-gray-500">{folder?.name}</p>
      </div>

      <div className="lg:grid-cols-6 grid grid-cols-4 text-center gap-10 mt-10 ">
        {data?.map((d) => {
          const chooseIcon = fileIcon[d.mimeType];
          if (d.mimeType === "application/vnd.google-apps.folder") {
            return (
              <div>
                <i
                key={d.id}
                  onClick={() => setShowFiles({ show: true, id, name })}
                  className="fas fa-folder fa-3x text-gray-500 hover:text-gray-800 cursor-pointer"
                ></i>
                <p className=" overflow-hidden">{d.name}</p>
              </div>
            );
          } else {
            return (
              <div key={d?.id}>
                <i
                  onClick={() => handleView(d?.id)}
                  className={`far fa-file-${chooseIcon?.name} fa-3x  text-${chooseIcon?.color}-500
                hover:text-${chooseIcon?.color}-800 cursor-pointer`}
                ></i>
                <p className=" overflow-hidden">{d?.name}</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
