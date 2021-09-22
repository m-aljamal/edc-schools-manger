import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Menu, Dropdown } from "antd";
import SingleBar from "./SingleBar";
export default function Bar_chart({
  jobTitle,
  classNumber,
  subject,
  typeOfDegree,
}) {
  const [clickedKey, setClickedKey] = useState("حسب المسمى الوظيفي");
  function handleMenuClick(e) {
    setClickedKey(e.key);
  }
  const totalClass = [
    {
      text: "حسب المسمى الوظيفي",
      value: "jobTitle",
      dataArray: jobTitle,
    },
    {
      text: "حسب الصفوف",
      value: "classNumber",
      dataArray: classNumber,
    },
    {
      text: "حسب المادة",
      value: "subject",
      dataArray: subject,
    },
    {
      text: "حسب الاختصاص",
      value: "typeOfDegree",
      dataArray: typeOfDegree,
    },
  ];

  const findClicked = totalClass.find((t) => t.text === clickedKey);
  const labels = findClicked.dataArray.map((l) => l._id[findClicked.value]);
  const data = findClicked.dataArray.map((d) => d.total);

  const menu = (
    <Menu onClick={handleMenuClick} className="text-right">
      {totalClass.map((c, i) => (
        <Menu.Item key={c.text}>
          <p>{c.text}</p>
        </Menu.Item>
      ))}
    </Menu>
  );

  const barData = {
    labels: labels,

    datasets: [
      {
        data: data,
        stack: 5,

        backgroundColor: [
          "rgba(76, 81, 191,0.8)",
          "rgba(255, 99, 132,0.8)",
          "rgba(239, 121, 0,0.8)",
          "rgba(61, 92, 5,0.8)",
          "rgba(0, 44, 240,0.8)",
          "rgba(216, 99, 251,0.8)",
          "rgba(248, 60, 60,0.8)",
          "rgba(250, 227, 16,0.3)",
          "rgba(159, 243, 156,0.3)",
          "rgba(75, 130, 167,0.3)",
          "rgba(174, 150, 230,0.8)",
        ],
      },
    ],
  };
  return (
    <>
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-gray-100 mb-1 text-xs font-semibold">
                  الموظفين
                </h6>
                <h2 className="text-white md:text-lg text-base font-semibold">
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <a className="ant-dropdown-link">
                      {clickedKey}
                      <i className="fas fa-caret-down mr-2"></i>
                    </a>
                  </Dropdown>
                </h2>
              </div>
            </div>
          </div>
          <SingleBar
            barData={barData}
            linsColor="rgba(255, 255, 255, 0.4)"
            fontColor="rgba(255,255,255,.7)"
            ticksColor="#ffffff"
          />
        </div>
      </div>
    </>
  );
}
