import { Progress } from "antd";

export default function DaysProgress({ dates }) {
  return (
    <div className="bg-white mx-4 p-4 shadow-lg mb-4 rounded text-center">
      <div className="">
        <h5 className="text-gray-500 font-bold text-base mb-2 ">
          {dates?.status}
        </h5>
        {dates?.dateEnd && (
          <Progress
            type="line"
            status="active"
            percent={dates?.percentage}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        )}
      </div>
      <div className="flex justify-between items-center mt-4 text-base">
        <p className="font-bold">
          {new Date(dates?.dateStart).toLocaleString("ar-Sy", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {dates?.dateEnd && (
          <p className="font-bold">
            {new Date(dates?.dateEnd).toLocaleString("ar-Sy", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
