import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useAppContext } from "../../utils/AppContext";
import { SAVINGS, LIMIT, SPENDS } from "../../utils/constants";

interface ChartInterface {
  chartType: "PIE";
  page: "STATISTICS";
}

function Chart({ chartType, page }: ChartInterface) {
  const { pageIndex, userData, todaySpends } = useAppContext();
  const [pieData, setPieData] = useState<
    { id: number; value: number; label: string; color?: string }[]
  >([]);

  useEffect(() => {
    handlePageIndexChange();
  }, [pageIndex, userData]);

  function handlePageIndexChange() {
    switch (pageIndex) {
      case 0: {
        if (chartType === "PIE" && page === "STATISTICS") {
          const temp: {
            id: number;
            value: number;
            label: string;
            color?: string;
          }[] = [];
          temp.push({
            id: 0,
            value: Math.floor(userData?.dailyLimit),
            label: `${LIMIT} (${Math.floor(userData?.dailyLimit)})`,
            color: "#7600b5",
          });
          if (todaySpends > 1) {
            temp.push({
              id: 1,
              value: todaySpends,
              label: `${SPENDS} (${todaySpends})`,
              color: "#55f540",
            });
          }
          temp.push({
            id: 2,
            value: Math.floor(
              userData?.dailyLimit - todaySpends >= 0
                ? parseFloat((userData?.dailyLimit - todaySpends).toFixed(1))
                : parseFloat(
                    ((userData?.dailyLimit - todaySpends) * -1).toFixed(1),
                  ),
            ),
            label: `${SAVINGS} (${Math.floor(
              userData?.dailyLimit - todaySpends >= 0
                ? (`+${parseFloat((userData?.dailyLimit - todaySpends).toFixed(1))}` as unknown as number)
                : (`-${parseFloat(((userData?.dailyLimit - todaySpends) * -1).toFixed(1))}` as unknown as number),
            )})`,
            color: todaySpends >= userData?.dailyLimit ? "#f7746a" : "#55f540",
          });
          setPieData(temp);
        }
        break;
      }
      default: {
        throw new Error("wrong Page Index!");
      }
    }
  }

  return (
    <div className="h-[30vh] w-[97vw]">
      <div className="h-[30vh] w-[97vw] drop-shadow-xl">
        {chartType === "PIE" && (
          <PieChart
            className="h-[30vh] w-[97vw]"
            series={[
              {
                data: pieData,
                innerRadius: 25,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 15,
                cx: 100,
                type: "pie",
                arcLabel: (item) => {
                  if (
                    item?.id === 2 &&
                    userData?.dailyLimit - todaySpends < 0
                  ) {
                    return `- ${item?.value}`;
                  }
                  return `+ ${item?.value}`;
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: "15px",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Chart;
