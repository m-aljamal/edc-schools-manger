import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Menu, Dropdown } from "antd";
import SingleBar from "./SingleBar";
export default function Bar_chart_division({
  empDivision,
  empTotalClass,
  stuDivision,
  stuTotalClass,
}) {
  const [type, setType] = useState("المدرسين");
  const arrayDivision = type === "المدرسين" ? empDivision : stuDivision;
  const totalClass = type === "المدرسين" ? empTotalClass : stuTotalClass;
  const [clickedKey, setClickedKey] = useState(totalClass[0] || "");
  useEffect(() => {
    setClickedKey(totalClass[0]);
  }, [type]);
  function handleMenuClick(e) {
    setClickedKey(e.key);
  }
  function handleMenuClickType(e) {
    setType(e.key);
  }

  const di = arrayDivision.filter((d) => d._id.classNumber === clickedKey);
  const labels = di.map((sub) => sub._id["division"]);
  const data = di.map((sub) => sub.total);

  const typeMenu = (
    <Menu onClick={handleMenuClickType} className="text-right">
      <Menu.Item key={"المدرسين"}>
        <p>المدرسين</p>
      </Menu.Item>
      <Menu.Item key={"الطلاب"}>
        <p>الطلاب</p>
      </Menu.Item>
    </Menu>
  );

  const classMenu = (
    <Menu onClick={handleMenuClick} className="text-right">
      {totalClass.map((c) => (
        <Menu.Item key={c}>
          <p>{c}</p>
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
      <div className="w-full xl:w-4/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-gray-800 mb-1 text-xs font-semibold">
                  <Dropdown
                    overlay={typeMenu}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <a className="ant-dropdown-link">
                      {type}
                      <i className="fas fa-caret-down mr-2"></i>
                    </a>
                  </Dropdown>
                </h6>
                <h2 className="mt-2 text-gray-800 md:text-lg text-base font-semibold">
                  <Dropdown
                    overlay={classMenu}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <a className="ant-dropdown-link">
                      الصف {clickedKey}
                      <i className="fas fa-caret-down mr-2"></i>
                    </a>
                  </Dropdown>
                </h2>
              </div>
            </div>
          </div>
          <SingleBar
            barData={barData}
            linsColor="rgba(33, 37, 41, 0.3)"
            fontColor="#363535"
            ticksColor="#363535"
          />
          {/* <div className="p-4 flex-auto">
            <div className="relative" style={{ height: "350px" }}>
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    mode: "index",
                    intersect: false,
                  },
                  hover: {
                    mode: "nearest",
                    intersect: true,
                  },
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          fontColor: "#363535",
                          fontFamily: "Tajawal",
                          fontSize: 13,
                        },
                        display: true,
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          fontColor: "#363535",
                          precision: 0,
                        },
                        display: true,
                        scaleLabel: {
                          display: false,
                        },
                        gridLines: {
                          borderDash: [3],
                          borderDashOffset: [3],
                          drawBorder: false,
                          color: "rgba(33, 37, 41, 0.3)",
                          zeroLineColor: "rgba(33, 37, 41, 0.3)",
                          zeroLineBorderDash: [3],
                          zeroLineBorderDashOffset: [3],
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
