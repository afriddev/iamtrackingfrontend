
import { useState } from "react";
import { CiSaveUp1 } from "react-icons/ci";
import { PiCurrencyInrBold } from "react-icons/pi";
import { AMOOUNT_ERROR, MONTHLY_AMOUNT_ZERO_DISC, SET_MONTHLY_AMOUNT, UPDATE } from "../../utils/constants";

function SetMonthLimit() {
  const [monthAmount, setMonthAmount] = useState<number>();
  const [amountMessage, setAmountMessage] = useState<string>("")

  function handleChange(e: any) {
    const value = e?.target?.value;
    const number = /^\d+$/.test(value)
    if (number) {
      setAmountMessage("")
      setMonthAmount(parseInt(value));
    }
    else {
      setAmountMessage(AMOOUNT_ERROR)
    }
  }

  return (
    <div>
      <div className=" flex flex-col w-full mt-6 items-center justify-center">
        <img src="setMonthlyAmount.png" />
        <label className=" px-4 text-xl text-center ">
          {MONTHLY_AMOUNT_ZERO_DISC}
        </label>
      </div>
      <div className=" flex items-center mt-4 justify-evenly gap-4">
        <div className=" relative h-14">
          <PiCurrencyInrBold className="w-4 left-1 h-4 text-zinc-400 absolute top-2" />
          <div className="w-[50vw] flex flex-col">
            <input
              onChange={handleChange}
              placeholder={SET_MONTHLY_AMOUNT}
              className="shadow-lg text-sm outline-none border-none py-2 pl-6 w-[50vw] rounded-md hover:shadow-2xl"
            />
            <label className=" text-xs text-red-500">{amountMessage}</label>
          </div>
        </div>
        <button className="-mt-5 rounded-md shadow-xl font-semibold bg-purple-800 flex items-center text-white py-2 px-6 gap-2 hover:shadow-2xl  hover:scale-105  ">
          {UPDATE}
          <CiSaveUp1 className="w-7 h-7 " />
        </button>
      </div>
    </div>
  );
}
export default SetMonthLimit;
