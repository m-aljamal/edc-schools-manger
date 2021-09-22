import useSWR from "swr";
import AddNewAbcence from "../abcence/AddNewAbcence";
export default function AddAbcence({ type }) {
  const apirul = `/api/names/${type}`;
  const { data } = useSWR(apirul, {
    dedupingInterval: 60000,
  });
  if (!data) return <p>الرجاء الانتظار</p>;
  return (
    <AddNewAbcence names={data} displaySheetMonth={new Date()} type={type} />
  );
}
