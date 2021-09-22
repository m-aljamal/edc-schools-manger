import { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../shared/LoadingSpin";
import FileList from "./FileList";
const FolderFiles = ({ folder, setShowFiles }) => {
  const [showfolders, setShowFolders] = useState({
    show: false,
    id: "",
    name: "",
  });
  const { data, error } = useSWR(`/api/drive/getFolderFiles/${folder.id}`);
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    console.log("error", error);
  }

  return (
    <>
      {setShowFiles && (
        <div className="flex gap-10 items-center transform -translate-y-6">
          <i
            className="fas fa-arrow-up cursor-pointer  text-lg "
            onClick={() => setShowFiles({ show: false, id: "", name: "" })}
          ></i>
          <p className="mr-2 font-bold text-gray-500">{folder?.name}</p>
        </div>
      )}

      <div>
        {!showfolders.show ? (
          <div className="lg:grid-cols-6 grid grid-cols-4 text-center gap-10 ">
            {data.map((d) => (
              <Folder
                id={d.id}
                name={d.name}
                key={d.id}
                setShowFiles={setShowFolders}
              />
            ))}
          </div>
        ) : (
          <FileList setShowFolders={setShowFolders} folder={showfolders} />
        )}
      </div>
    </>
  );
};

export default FolderFiles;
