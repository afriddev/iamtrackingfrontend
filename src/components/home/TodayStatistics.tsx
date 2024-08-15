import { useAppContext } from "../../utils/AppContext";
import {
  AMOOUNT_ERROR,
  AMOUNT,
  DATE,
  RESPONSE,
  S_NO,
  SPEND_AMOUNT,
  TODAY_STATISTICS,
  TRANSACTION_HISTORY,
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
  const { isPending, updateDailySpendAmount } = useUpdateDailySSpendAMount();

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
      updateDailySpendAmount(
        {
          amount: amount as unknown as number,
        },
        {
          onSuccess(data) {
            if (
              data?.data?.message === "SUCCESS" ||
              data?.data?.message === "DAILY_LIMIT_ERROR"
            ) {
              setAmount("");
            }
          },
        },
      );
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
          <div className="relative mt-5  flex flex-col items-center justify-center gap-6">
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
          {
            userData?.todaySpends?.length > 0 && <div className=" relative mt-4 max-h-[33vh] rounded-md border border-black pb-2 pt-6">
              <label className="absolute -top-[0.6rem] left-6 rounded-[0.1rem] bg-primary-foreground px-3 py-[0.1rem] text-[10px]  drop-shadow ">
                {TRANSACTION_HISTORY}
              </label>
              <div className="flex max-h-[29vh] flex-col  gap-2  px-2">
                <div
                  className="flex items-center  justify-between text-xs max-w-[90vw]"
                >
                  <div className="w-10"><div className="w-fit border-b border-black">
                    {S_NO}
                  </div></div>
                  <div className="w-10">
                    <div
                      className={`flex w-fit border-b border-black items-start justify-start text-left `}
                    >
                      {AMOUNT}
                    </div>
                  </div>
                  <div className="w-20 flex items-center justify-center">
                    <div className="w-fit border-b border-black">{DATE}</div>
                  </div>
                  <div className="w-32 flex items-center justify-center">
                    <div
                      className={`w-fit  border-b border-black   `}
                    >
                      {RESPONSE}
                    </div>
                  </div>
                </div>
                <div className=" overflow-auto max-h-[32vh]">
                  <div className=" flex flex-col  gap-3 pb-3 max-w-[90vw]">

                    {userData?.todaySpends?.map(
                      (
                        item: { amount: number; date: string; response: string },
                        index: number,
                      ) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center  justify-between text-xs "
                          >
                            <div className="w-10">
                              <div className=" rounded w-fit bg-primary p-1 px-2 text-xs text-primary-foreground">
                                {index + 1}
                              </div>
                            </div>
                            <div
                              className={` w-10  text-center ${item?.response === "DAILY_LIMIT_ERROR" ? "text-destructive" : "text-constructive"}`}
                            >
                              {item?.amount}
                            </div>
                            <div className="w-20">{item?.date}</div>
                            <div
                              className={`w-32 text-center ${item?.response === "DAILY_LIMIT_ERROR" ? "text-destructive" : "text-constructive"}`}
                            >
                              {item?.response}
                            </div>
                          </div>
                        );
                      },
                    )}

                  </div></div>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
}
export default TodayStatistics;
