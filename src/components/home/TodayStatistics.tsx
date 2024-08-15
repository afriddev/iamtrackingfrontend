import { useAppContext } from "../../utils/AppContext";
import {
  AMOOUNT_ERROR,
  SPEND_AMOUNT,
  TODAY_STATISTICS,
  UPDATE,
} from "../../utils/constants";
import { CiSaveUp1 } from "react-icons/ci";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdTrendingDown } from "react-icons/md";
import Chart from "../re/Chart";
import { daysInThisMonth, getTodayDate } from "../../utils/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUpdateDailySSpendAMount } from "@/hooks/userHooks";
import Spinner from "@/utils/Spinner";


function TodayStatistics() {
  const { userData, todaySpendAmount } = useAppContext();
  const minimizedSpends =
    (userData?.monthLimitAmount / daysInThisMonth()) * getTodayDate() >
    todaySpendAmount;
  const [amountMessage, setAmountMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { isPending, updateDailySpendAmount } = useUpdateDailySSpendAMount()

  function handleChange(e: any) {
    const value = e?.target?.value;
    const number = /^\d+$/.test(value);
    if (number || value === "") {
      setAmountMessage("");
      setAmount(value === "" ? "" : (parseInt(value) as never));
    } else {
      setAmountMessage(AMOOUNT_ERROR);
    }
  }

  function updateDailySpendAmmount() {
    if (!amountMessage) {
      updateDailySpendAmount({
        amount: amount as unknown as number,
      }, {
        onSuccess(data) {
          if (data?.data?.message === "SUCCESS" || data?.data?.message === "DAILY_LIMIT_ERROR") {
            setAmount("")
          }
        },
      });
    }

  }

  return (
    <div>
      <Spinner loadingState={isPending} />
      {userData?.monthLimitAmount >= 500 && (
        <div className="flex w-full flex-col">
          <div className="mt-5 w-fit">
            <label className="flex items-center gap-2 rounded-md border border-black px-4 py-1 font-semibold shadow-lg drop-shadow-xl">
              {TODAY_STATISTICS}{" "}
              {minimizedSpends ? (
                <IoTrendingUpSharp className="h-6 w-6 text-green-600" />
              ) : (
                <MdTrendingDown className="h-6 w-6 text-red-600 " />
              )}
            </label>
          </div>
          <div className="mt-5 relative  flex flex-col items-center justify-center gap-6">
            <Chart chartType="PIE" page="STATISTICS" />

          </div>

          <div className=" mt-4 flex items-center justify-evenly gap-4">
            <div className="w-[50vw]">
              <Input
                value={amount}
                onChange={handleChange}
                placeholder={SPEND_AMOUNT}
                error={amountMessage}
                icon="AMOUNT"
              />
            </div>
            <Button onClick={updateDailySpendAmmount}>
              <CiSaveUp1 className="-mt-1 h-6 w-6 pr-1 " />
              {UPDATE}
            </Button>
          </div>
          <div className="max-h-[40vh]">
            {
              userData?.todaySpends?.map((amount: number, index: number) => {
                return <div key={index}>{amount}</div>
              })
            }
          </div>
        </div>
      )}
    </div>
  );
}
export default TodayStatistics;
