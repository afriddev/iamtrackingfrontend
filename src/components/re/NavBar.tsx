"use client";

import { useAppContext } from "@/app/utils/AppContext";
import { HELLO, LIMIT, SPENDS } from "@/app/utils/constants";
import { IoMdArrowDropup } from "react-icons/io";
import { PiCurrencyInr } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import ProfileIcon from "./ProfileIcon";

interface NavBarInterface {
  setPageNumber: (pageNumber: number) => void;
}

function NavBar({ setPageNumber }: NavBarInterface) {
  const { userData, todaySpendAmount } = useAppContext();
  const [prevAmount, stePrevAmount] = useState<boolean>(false);
  const balance = userData?.balance;
  const minimizedSpends = userData?.dailyLimit > todaySpendAmount;

  function handlePrevChange(value: boolean) {
    if (value && prevAmount) {
      stePrevAmount(false);
    } else {
      stePrevAmount(value);
    }
  }

  return (
    <nav>
      <ul className="flex w-full justify-between items-center">
        <ProfileIcon />
        <label className="text-lg font-mono flex items-center text-black gap-[0.15rem]">
          {HELLO}
          <span className="text-purple-900 font-semibold tracking-wider">
            {userData?.firstName}
          </span>
        </label>
        <div
          onBlur={() => {
            handlePrevChange(false);
          }}
          tabIndex={1}
          className="relative"
        >
          <div
            onClick={() => {
              handlePrevChange(true);
            }}
            className={`flex items-center gap-2 py-[0.1rem] border px-2 ${
              prevAmount ? "rounded-t-md" : "rounded-md"
            } border-zinc-50 shadow-md h-7 ${
              minimizedSpends ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <label className="flex items-center ">
              <PiCurrencyInr className="" />
              {balance}
            </label>
            {prevAmount ? (
              <IoMdArrowDropup className="w-6 h-6" />
            ) : (
              <IoMdArrowDropdown className="w-6 h-6" />
            )}
          </div>
          {prevAmount && (
            <div className=" w-full h-fit drop-shadow-2xl rounded-b-md bg-white p-2 text-[12px] absolute  ">
              <li className="flex flex-col">
                <div
                  className={` ${
                    todaySpendAmount >= userData?.dailyLimit
                      ? "text-red-500"
                      : "text-green-500"
                  } w-full flex items-center gap-2`}
                >
                  <label
                    className={`w-[12vw] flex justify-between items-center `}
                  >
                    {SPENDS}
                    <span className="text-black">{":"}</span>
                  </label>
                  <a>{todaySpendAmount}</a>
                </div>
                <div className="w-full flex items-center gap-2">
                  <label className="w-[12vw] flex justify-between items-center">
                    {LIMIT}
                    <span>{":"}</span>
                  </label>
                  <a>{userData?.dailyLimit}</a>
                </div>
              </li>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
