"use client";
import { useGetAndSetUserData } from "@/app/hooks/userHooks";
import { useAppContext } from "@/app/utils/AppContext";
import { SPEND_AMOUNT, TODAY_STATISTICS, UPDATE } from "@/app/utils/constants";
import Spinner from "@/app/utils/Spinner";
import { daysInThisMonth, getTodayDate } from "@/app/utils/utils";
import { useEffect } from "react";
import { CiSaveUp1 } from "react-icons/ci";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdTrendingDown } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import Chart from "../re/Chart";
import NavBar from "../re/NavBar";
import SetMonthLimit from "./SetMonthLimit";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  const { userData, todaySpendAmount } = useAppContext();
  const minimizedSpends =
    (userData?.monthLimitAmount / daysInThisMonth()) * getTodayDate() >
    todaySpendAmount;
  const { data, getUserData, isPending } = useGetAndSetUserData();

  useEffect(() => {
    getUserData({
      emailId: "369afrd@gmail.com",
    });
  }, []);

  return (
    <div className="px-2 py-2 ">
      <Spinner loadingState={isPending} />
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>
      <div className="h-full flex items-center justify-center min-h-[80vh]">
        {userData?.monthLimitAmount < 500 && <SetMonthLimit />}
      </div>
      {userData?.monthLimitAmount >= 500 && (
        <div className="flex flex-col w-full">
          <div className="mt-5 w-fit">
            <label className="flex items-center gap-2 font-semibold shadow-lg drop-shadow-xl px-4 py-1 rounded-md border border-black">
              {TODAY_STATISTICS}{" "}
              {minimizedSpends ? (
                <IoTrendingUpSharp className="text-green-600 h-6 w-6" />
              ) : (
                <MdTrendingDown className="text-red-600 h-6 w-6 " />
              )}
            </label>
          </div>
          <div className="mt-5 flex flex-col items-center justify-center gap-6">
            <Chart type="PIE" />
          </div>
          <div className=" flex items-center justify-evenly gap-4">
            <div className="relative">
              <PiCurrencyInrBold className="w-4 left-1 h-4 text-zinc-400 absolute top-3" />
              <input
                placeholder={SPEND_AMOUNT}
                className="shadow-lg outline-none border-none py-2 pl-6 w-[50vw] rounded-md hover:shadow-2xl"
                type="number"
              />
            </div>
            <button className="rounded-md shadow-xl font-semibold bg-purple-800 flex items-center text-white py-2 px-6 gap-2 hover:shadow-2xl  hover:scale-105  ">
              {UPDATE}
              <CiSaveUp1 className="w-7 h-7 " />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default HomePage;
