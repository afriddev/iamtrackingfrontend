import { useAppContext } from "../../utils/AppContext";
import {
  AMOOUNT_ERROR,
  AMOUNT,
  DATE,
  GROCERY,
  NO_DATA_FOUND,
  NORMAL,
  RESPONSE,
  S_NO,
  SPEND_AMOUNT,
  SPEND_TYPE,
  TODAY_STATISTICS,
  TRANSACTION_HISTORY,
  UPDATE,
} from "../../utils/constants";
import { CiSaveUp1 } from "react-icons/ci";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdTrendingDown } from "react-icons/md";
import Chart from "../re/Chart";
import { daysInThisMonth, getTodayDate, useGetMe } from "../../utils/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  useGetAndSetUserData,
  useUpdateDailySpendAMount,
} from "@/hooks/userHooks";
import Spinner from "@/utils/Spinner";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function TodayStatistics() {
  const { userData, todaySpendAmount } = useAppContext();
  const minimizedSpends =
    (userData?.monthLimitAmount / daysInThisMonth()) * getTodayDate() >
    todaySpendAmount;
  const [amountMessage, setAmountMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { isPending, updateDailySpendAmount } = useUpdateDailySpendAMount();
  const { getUserData, isPending: settingUserData } = useGetAndSetUserData();
  const { emailId } = useGetMe();
  const selectedTransactionType = [
    { key: "DAILY", name: "Daily" },
    { key: "DAY", name: "Day" },
  ];
  const [openTransactionType, setOpenTransactionType] =
    useState<boolean>(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] =
    useState<number>(0);
  const [selectedRadioButtonType, setSelectedRadioButtonType] = useState<
    "NORMAL" | "GROCERY"
  >("NORMAL");

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
          type: selectedRadioButtonType,
        },
        {
          onSuccess(data) {
            if (
              data?.data?.message === "SUCCESS" ||
              data?.data?.message === "DAILY_LIMIT_ERROR"
            ) {
              setAmount("");
              getUserData({ emailId });
            }
          },
        },
      );
    }
  }

  function handleTrasactionTypeClick() {
    setOpenTransactionType(openTransactionType ? false : true);
  }

  function handleChangeTransactionType(index: number) {
    setSelectedTransactionIndex(index);
    setOpenTransactionType(openTransactionType ? false : true);
  }

  function handleRadioButtonChange(value: "NORMAL" | "GROCERY") {
    setSelectedRadioButtonType(value);
  }

  return (
    <div>
      <Spinner loadingState={isPending || settingUserData} />
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

          <div className=" relative  flex items-center justify-evenly gap-4">
            <div className="absolute left-7 top-[3.3rem] z-[5]">
              <RadioGroup
                onValueChange={handleRadioButtonChange}
                defaultValue={selectedRadioButtonType}
                className="flex items-center gap-4 text-[10px]"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="NORMAL" id="r1" />
                  <label htmlFor="r1">{NORMAL}</label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="GROCERY" id="r2" />
                  <label htmlFor="r2">{GROCERY}</label>
                </div>
              </RadioGroup>
            </div>
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

          <div>
            <div className=" absolute right-6 z-[4] flex w-full flex-col items-end justify-end ">
              <div
                onClick={handleTrasactionTypeClick}
                className={`rounded-xs right-4  top-0 flex h-6 w-24 cursor-pointer items-center justify-between gap-2 bg-primary-foreground px-3 text-xs ${openTransactionType ? "rounded-t-md" : "rounded-md shadow-lg"}`}
              >
                {selectedTransactionType[selectedTransactionIndex]?.name}
                {openTransactionType ? (
                  <IoMdArrowDropup className="h-6 w-6" />
                ) : (
                  <IoMdArrowDropdown className="h-6 w-6" />
                )}
              </div>
              <div
                className="w-24"
                onClick={() => {
                  handleChangeTransactionType(
                    selectedTransactionIndex === 0 ? 1 : 0,
                  );
                }}
              >
                {openTransactionType && (
                  <div
                    className={`rounded-xs right-4  top-6 flex h-6 w-24 cursor-pointer items-center justify-between gap-2 rounded-b-md bg-border px-3 text-xs shadow-lg`}
                  >
                    {
                      selectedTransactionType[
                        selectedTransactionIndex === 0 ? 1 : 0
                      ]?.name
                    }
                  </div>
                )}
              </div>
            </div>
            <div className=" relative mt-10  max-h-[33vh] rounded-md border border-black pb-2 pt-6">
              <label className="absolute -top-[0.6rem] left-6 rounded-[0.1rem] bg-primary-foreground px-3 py-[0.1rem] text-[10px]  drop-shadow ">
                {TRANSACTION_HISTORY}
              </label>
              {(selectedTransactionIndex === 0
                ? userData?.todaySpends
                : userData?.monthlySpends
              )?.length > 0 ? (
                <div className="flex max-h-[29vh] flex-col  gap-2  px-2">
                  <div className="flex max-w-[90vw]  items-center justify-between text-xs">
                    <div className="w-10">
                      <div
                        className="w-fit
                    border-b border-black"
                      >
                        {S_NO}
                      </div>
                    </div>
                    <div className="flex w-20 items-center justify-center">
                      <div
                        className={`flex w-fit border-b border-black text-center  `}
                      >
                        {AMOUNT}
                      </div>
                    </div>
                    <div className="flex w-20 items-center justify-center">
                      <div className="w-fit border-b border-black">{DATE}</div>
                    </div>
                    {selectedTransactionIndex === 0 && (
                      <div className="flex w-32 items-center justify-center">
                        <div className={`w-fit  border-b border-black   `}>
                          {SPEND_TYPE}
                        </div>
                      </div>
                    )}
                    <div className="flex w-20 items-center justify-center">
                      <div className={`w-fit  border-b border-black   `}>
                        {RESPONSE}
                      </div>
                    </div>
                  </div>
                  <div className=" max-h-[32vh] overflow-auto">
                    <div className=" flex max-w-[90vw]  flex-col gap-3 pb-3">
                      {(selectedTransactionIndex === 0
                        ? userData?.todaySpends
                        : userData?.monthlySpends
                      )?.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center  justify-between text-xs "
                          >
                            <div className="w-10">
                              <div className=" w-fit rounded bg-primary p-1 px-2 text-xs text-primary-foreground">
                                {index + 1}
                              </div>
                            </div>
                            <div
                              className={` w-20  text-center font-semibold ${item?.response === "DAILY_LIMIT_ERROR" ? "text-destructive" : "text-constructive"}`}
                            >
                              {item?.amount}
                            </div>
                            <div className="w-20 font-semibold">
                              {item?.date}
                            </div>
                            {selectedTransactionIndex === 0 && (
                              <div
                                className={`w-32 text-center font-semibold  ${item?.response === "DAILY_LIMIT_ERROR" ? "text-destructive" : "text-constructive"}`}
                              >
                                {item?.type}
                              </div>
                            )}
                            <div
                              className={`w-20 text-center font-semibold ${item?.response === "DAILY_LIMIT_ERROR" ? "text-destructive" : "text-constructive"}`}
                            >
                              {item?.response === "DAILY_LIMIT_ERROR"?"Over Limit!":"Success"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <label className="pl-6 ">{NO_DATA_FOUND}</label>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default TodayStatistics;
