import React from "react";
import useSWR from "swr";
import SocialForm from "../persons/SocialForm";
import LoadingSpin from "../shared/LoadingSpin";

export default function StudentsSocialForm({ type, id, name, closeForm }) {
  const { data, error } = useSWR(`/api/socialForm/find/${id}`);
  if (error) {
    return <p>يوجد خطأ</p>;
  }
  if (!data) {
    return <LoadingSpin />;
  }

  return (
    <div>
      {data === "لايوجد استمارة لهاذا الطالب" ? (
        <SocialForm
          type={type}
          id={id}
          name={name}
          closeForm={closeForm}
          oldData={null}
          edit={false}
        />
      ) : (
        <SocialForm
          oldData={data}
          type={type}
          id={id}
          name={name}
          closeForm={closeForm}
          edit={true}
        />
      )}
    </div>
  );
}
