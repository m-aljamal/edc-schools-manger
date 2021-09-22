import { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../shared/LoadingSpin";
import FolderFiles from "./FolderFiles";

export default function TeacherDocList() {
  const { data, error } = useSWR("/api/drive", { dedupingInterval: 60000 });
 
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    console.log("error", error);
  }
  const showFiles = {
    show: true,
    id: data[0].id,
    name: data[0].name,
  };
  return (
    <>
      <FolderFiles folder={showFiles} setShowFiles={null} />
    </>
  );
}
