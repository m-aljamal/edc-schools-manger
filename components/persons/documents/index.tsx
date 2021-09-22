import { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../../shared/LoadingSpin";
import FolderList from "./FolderList";
import Folder from "./Folder";
export default function DocsList() {
  const { data, error } = useSWR("/api/drive", { dedupingInterval: 60000 });

  const [showFiles, setShowFiles] = useState({
    show: false,
    id: "",
    name: "",
  });
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    console.log("error", error);
  }

  return (
    <>
      <div>
        {!showFiles.show ? (
          <div className="lg:grid-cols-6 grid grid-cols-4 text-center gap-10 ">
            {data.map((d) => (
              <Folder
                id={d.id}
                name={d.name}
                key={d.id}
                setShowFiles={setShowFiles}
              />
            ))}
          </div>
        ) : (
          <FolderList folder={showFiles} setShowFiles={setShowFiles} />
        )}
      </div>
    </>
  );
}
