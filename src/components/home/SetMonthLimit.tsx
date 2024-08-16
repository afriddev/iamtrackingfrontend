import {  useState } from "react";
import { CiSaveUp1 } from "react-icons/ci";
import {
  AMOOUNT_ERROR,
  MONTH_AMOUNT_LIMIT,
  MONTHLY_AMOUNT_ZERO_DISC,
  SET_MONTHLY_AMOUNT,
  UPDATE,
} from "../../utils/constants";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useGetAndSetUserData, useSetMonthlyAmount } from "@/hooks/userHooks";
import Spinner from "@/utils/Spinner";
import { useGetMe } from "@/utils/utils";

function SetMonthLimit() {
  const [amountMessage, setAmountMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { isPending, setMonthlyAmount } =
    useSetMonthlyAmount();
    const {getUserData,isPending:settingUserData} = useGetAndSetUserData()
  const {emailId} = useGetMe()

  function handleChange(e: any) {
    const value = e?.target?.value;
    const number = /^\d+$/.test(value);
    if (number || value === "") {
      setAmountMessage("");
      setAmount(value === "" ? "" : parseInt(value) as never);
    } else {
      setAmountMessage(AMOOUNT_ERROR);
    }
  }

  function handlesetAmount() {
    if (!amountMessage) {
      if (parseInt(amount) < 500) setAmountMessage(MONTH_AMOUNT_LIMIT)
      else {
        setAmountMessage("")
        setMonthlyAmount({
          amount: amount as unknown as number,
        },{
          onSuccess(data) {
            if (data?.data?.message === "SUCCESS") {
              getUserData({ emailId });
            }
          },
        });
      }
    }
  }


  return (
    <div>
      <Spinner loadingState={isPending || settingUserData} />
      <div className=" mt-6 flex w-full flex-col items-center justify-center">
        <img src="setMonthlyAmount.png" />
        <label className=" px-4 text-center text-xl ">
          {MONTHLY_AMOUNT_ZERO_DISC}
        </label>
      </div>
      <div className=" mt-4 flex items-center justify-evenly gap-4">
        <div className="w-[50vw]">
          <Input
            value={amount}
            onChange={handleChange}
            placeholder={SET_MONTHLY_AMOUNT}
            error={amountMessage}
            icon="AMOUNT"
          />
        </div>
        <Button onClick={handlesetAmount}>
          <CiSaveUp1 className="-mt-1 h-6 w-6 pr-1 " />
          {UPDATE}
        </Button>
      </div>
    </div>
  );
}
export default SetMonthLimit;
