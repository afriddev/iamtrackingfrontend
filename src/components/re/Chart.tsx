"use client";
import { useAppContext } from "@/app/utils/AppContext";
import {
  BALANCE,
  SAVINGS,
  TODAY_LIMIT,
  TODAY_SPENDS,
  TODAY_STATISTICS,
} from "@/app/utils/constants";
import { dark } from "@mui/material/styles/createPalette";
import { BarChart, pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

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
  }, [pageIndex,userData]);

  function handlePageIndexChange() {
    switch (pageIndex) {
      case 0: {
        setPieData([
          {
            id: 0,
            value: userData?.dailyLimit,
            label: TODAY_LIMIT,
            color: "#7600b5",
          },
          {
            id:1,
            value: todaySpendAmount,
            label: TODAY_SPENDS,
            color: "#55f540",
          },
          {
            id:2,
            value: (userData?.dailyLimit - todaySpendAmount) >= 0?(userData?.dailyLimit - todaySpendAmount):(userData?.dailyLimit - todaySpendAmount) * -1,
            label: SAVINGS,
            color:
              todaySpendAmount >= userData?.dailyLimit ? "#f7746a" : "#55f540",
          },
        ]);
        break;
      }
      default: {
        throw new Error("wrong Page Index!");
      }
    }
  }

  return (
    <div className="w-[97vw] h-[30vh]">
      <div className="w-[97vw] drop-shadow-xl h-[30vh]">
        <PieChart
          className="w-[97vw] h-[30vh]"
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
                if(item?.id === 2 && (userData?.dailyLimit - todaySpendAmount) < 0){
                   return `- ${item?.value}`
                }
                return `+ ${item?.value}`
              },

              
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',

              fontSize:"15px"
            },
          }}
        />
      </div>
    </div>
  );
}
export default Chart;
