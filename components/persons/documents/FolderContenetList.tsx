import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../../shared/LoadingSpin";
import Folder from "./Folder";
import UpArrow from "./UpArrow";
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
    <div className="mt-3">
      <UpArrow
        name={folder?.name}
        onClick={() => setShowFolders({ show: false, id: "", name: "" })}
      />

      <div className="lg:grid-cols-6 grid grid-cols-4 text-center gap-10 mt-10 ">
        {data?.map((folder) => {
          const chooseIcon = fileIcon[folder.mimeType];
          if (folder.mimeType === "application/vnd.google-apps.folder") {
            return (
              <div key={folder.id}>
                <Folder
                  id={folder.id}
                  name={folder.name}
                  key={folder.id}
                  setShowFiles={setShowFolders}
                />
              </div>
            );
          } else {
            return (
              <div key={folder?.id}>
                {folder.name}
                {/* <i
                  onClick={() => handleView(d?.id)}
                  className={`far fa-file-${chooseIcon?.name} fa-3x  text-${chooseIcon?.color}-500
                hover:text-${chooseIcon?.color}-800 cursor-pointer`}
                ></i>
                <p className=" overflow-hidden">{d?.name}</p> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
