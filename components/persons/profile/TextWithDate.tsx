import ShowDate from "../../shared/ShowDate";
export default function TextWithDate({ date, text }) {
  return (
    <div className="flex  gap-1 items-center">
      <p className="profileText">{text}</p>
      <ShowDate date={date} />
    </div>
  );
}
