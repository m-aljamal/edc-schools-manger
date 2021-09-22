 import { Bar } from "react-chartjs-2";
 
export default function SingleBar({ barData, linsColor, fontColor,ticksColor }) {
    return (
        <div className="p-4 flex-auto">
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
                      fontColor: ticksColor,
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
                      fontColor: fontColor,
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
                      color: linsColor,
                      zeroLineColor: linsColor,
                      zeroLineBorderDash: [3],
                      zeroLineBorderDashOffset: [3],
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    )
}
