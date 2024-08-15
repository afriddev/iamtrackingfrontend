import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useAppContext } from "../../utils/AppContext";
import { SAVINGS, TODAY_LIMIT, TODAY_SPENDS } from "../../utils/constants";

interface ChartInterface {
  type: "PIE" | "normal";
}

function Chart({ type }: ChartInterface) {
  const { pageIndex, userData, todaySpendAmount } = useAppContext();
  const [series, setSeries] = useState<
    { data: number[]; color: string; label: string }[]
  >([]);
  const [pieData, setPieData] = useState<
    { id: number; value: number; label: string; color?: string }[]
  >([]);
  const [selectedChartType, setSelectedChartType] = useState<string[]>([]);

  useEffect(() => {
    handlePageIndexChange();
  }, [pageIndex, userData]);

  function handlePageIndexChange() {
    switch (pageIndex) {
      case 0: {
        const temp: {
          id: number;
          value: number;
          label: string;
          color?: string;
        }[] = [];
        temp.push({
          id: 0,
          value: userData?.dailyLimit,
          label: TODAY_LIMIT,
          color: "#7600b5",
        });
        if (todaySpendAmount > 1) {
          temp.push({
            id: 1,
            value: todaySpendAmount,
            label: TODAY_SPENDS,
            color: "#55f540",
          });
        }
        temp.push({
          id: 2,
          value:
            userData?.dailyLimit - todaySpendAmount >= 0
              ? parseFloat((userData?.dailyLimit - todaySpendAmount).toFixed(1))
              : parseFloat(((userData?.dailyLimit - todaySpendAmount) * -1).toFixed(1)),
          label: SAVINGS,
          color:
            todaySpendAmount >= userData?.dailyLimit ? "#f7746a" : "#55f540",
        });
        setPieData(temp);
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
        <PieChart
          className="h-[30vh] w-[97vw]"
          series={[
            {
              data: pieData,
              innerRadius: 25,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 15,
              cx: 120,
              type: "pie",
              arcLabel: (item) => {
                if (
                  item?.id === 2 &&
                  userData?.dailyLimit - todaySpendAmount < 0
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
      </div>
    </div>
  );
}
export default Chart;
