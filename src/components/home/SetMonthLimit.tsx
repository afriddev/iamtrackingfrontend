import { useState } from "react";
import {
  AMOUNT_ERROR,
  AMOUNT_SET_SUCCESS,
  BACK,
  ENTER_MONTHLY_CHARGES,
  ENTER_MONTHLY_EXTRA_SPENDS,
  ENTER_MONTHLY_GROCERY_AMOUNT,
  MONTH_AMOUNT_LIMIT,
  MONTHLY_AMOUNT_ZERO_DISC,
  NEXT,
  SET_MONTHLY_AMOUNT,
  UPDATE,
} from "../../utils/constants";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  useGetAndSetUserData,
  useGetUserGroceryData,
  useSetMonthlyAmount,
} from "@/hooks/userHooks";
import Spinner from "@/utils/appUtils/Spinner";
import { useGetMe } from "@/utils/utils";
import { useForm } from "react-hook-form";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import { CiSaveUp1 } from "react-icons/ci";
import { useToast } from "../ui/use-toast";

function SetMonthLimit() {
  const [amountMessage, setAmountMessage] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { isPending, setMonthlyAmount } = useSetMonthlyAmount();
  const { getUserData, isPending: settingUserData } = useGetAndSetUserData();
  const { emailId } = useGetMe();
  const { getUserGroceryData, isPending: gettingUserGroceryData } =
    useGetUserGroceryData();

  const { register, handleSubmit } = useForm();
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();


  function handleChange(e: any) {
    const value = e?.target?.value;
    const number = /^\d+$/.test(value);
    if (number || value === "") {
      setAmountMessage("");
      setAmount(value === "" ? "" : (parseInt(value) as never));
    } else {
      setAmountMessage(AMOUNT_ERROR);
    }
  }

  function handlesetAmount(e: any) {
    setAmountMessage("");
    setMonthlyAmount(e, {
      onSuccess(data) {
        if (data?.data?.message === "SUCCESS") {
          getUserData({ emailId: emailId as never });
          getUserGroceryData({ emailId: emailId as never });
          toast({
            title: "SUCCESS",
            description:AMOUNT_SET_SUCCESS,
            variant: "constructive",
          });
        }
      },
    });
  }

  function handleNextClick(e: any) {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
      setAmount("");
      setAmountMessage("");
    } else if (step === 2) {
      setStep(3);
      setAmount("");
      setAmountMessage("");
    } else {
      console.log(e);
      handlesetAmount(e);
    }
  }
  function handleBackClick() {
    setStep(step - 1);
    setAmountMessage("");
  }

  return (
    <div>
      <Spinner
        loadingState={isPending || settingUserData || gettingUserGroceryData}
      />

      <form
        className="flex w-full flex-col"
        onSubmit={handleSubmit(handleNextClick)}
      >
        <div className=" flex w-full flex-col items-center justify-center">
          <img src="setMonthlyAmount.png" />
        </div>

        {step !== 4 && (
          <div className="flex w-full flex-col items-center">
            <label className=" mb-6 px-4 text-center text-xl ">
              {step === 0
                ? MONTHLY_AMOUNT_ZERO_DISC
                : step === 1
                  ? ENTER_MONTHLY_CHARGES
                  : step === 2
                    ? ENTER_MONTHLY_GROCERY_AMOUNT
                    : ENTER_MONTHLY_EXTRA_SPENDS}
            </label>
            {step !== 0 && (
              <div className="mb-4 w-full px-10">
                <Input
                  value={amount}
                  placeholder={SET_MONTHLY_AMOUNT}
                  error={amountMessage}
                  icon={
                    step === 1 ? "TRANSPORT" : step === 2 ? "RICE" : "MONTH"
                  }
                  {...register(
                    step === 0
                      ? "notRequired"
                      : step === 1
                        ? "monthLyCharges"
                        : step === 2
                          ? "monthLyGroceryAmount"
                          : "monthLySpends",
                    {
                      required: step === 0 ? false : true,
                      pattern: /^\d+$/,
                      onChange: handleChange,
                    },
                  )}
                />
              </div>
            )}
            <div className="mt-3 flex w-full items-center gap-4 px-10">
              {step > 0 && (
                <Button
                  type="button"
                  onClick={handleBackClick}
                  className="w-full"
                >
                  <GrCaretPrevious className="-mt-[0.15rem] mr-1 h-3 w-3  text-primary-foreground" />
                  {BACK}
                </Button>
              )}
              <Button className="w-full">
                {step !== 3 && NEXT }
                {step !== 3 &&  <GrCaretNext className="-mt-[0.15rem] ml-1 h-3 w-3  text-primary-foreground" />}
                {
                  step === 3 && <><CiSaveUp1 className="-mt-1 h-6 w-6 pr-1 " />
                  {UPDATE}</>
                }
               
              </Button>
            </div>
          </div>
        )}
        {/* 
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
        </div> */}
      </form>
    </div>
  );
}
export default SetMonthLimit;
