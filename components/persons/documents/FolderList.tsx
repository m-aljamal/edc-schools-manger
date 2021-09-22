import { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../../shared/LoadingSpin";
import Folder from "./Folder";
import UpArrow from "./UpArrow";
import FolderContentList from "./FolderContenetList";
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
        <UpArrow
          name={folder?.name}
          onClick={() => setShowFiles({ show: false, id: "", name: "" })}
        />
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
          <FolderContentList
            setShowFolders={setShowFolders}
            folder={showfolders}
          />
        )}
      </div>
    </>
  );
};

export default FolderFiles;
