import { useState } from "react";
import { Button } from "../ui/button";
import AppDialog from "@/utils/appUtils/AppDialog";
import { Input } from "@/components/ui/input";
import AppInputErrors from "@/errors/AppInputErrors";
import { useForm } from "react-hook-form";
import { useConfiggrocerylist } from "@/hooks/userHooks";
import Spinner from "@/utils/Spinner";
import { useToast } from "@/components/ui/use-toast";
import {
  ITEM_FVM,
  DATE_FVM,
  GMSPER_WEEK_FVM,
  ITEM_ADDED_SUCCESSFULLY,
  PRICE_FVM,
  SELECT_GROCERYS,
  ITEM_ADDED_FAILED,
} from "@/utils/constants";
import { FormValues } from "@/types/groceryDataTypes";

function TodayGrocery() {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { errors } = formState;
  const { submitGroceryData, isPending } = useConfiggrocerylist();
  const { toast } = useToast();

  function onSubmit(data: FormValues) {
    submitGroceryData(data, {
      onSuccess(response) {
        if (response?.data.message === "SUCCESS") {
          reset();
          toast({
            title: "SUCCESS",
            description: ITEM_ADDED_SUCCESSFULLY,
            variant: "constructive",
          });
          setShowDialog(false);
        }
        else{
          toast({
            title: "ERROR",
            description: ITEM_ADDED_FAILED,
            variant: "constructive",
          });
        }
      },
    });
  }

  return (
    <div>
      <Spinner loadingState={isPending} />
      <Button onClick={handleClick}>Add Today Grocery's</Button>
      {showDialog && (
        <AppDialog>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="h-[65vh] w-[90vw] rounded-md bg-white p-4 lg:w-[30vw]">
              <div className="mb-4 flex items-center justify-between text-2xl">
                <h1>{SELECT_GROCERYS}</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                <AppInputErrors error={errors?.itemName?.message}>
                  <Input
                    {...register("itemName", { required: ITEM_FVM })}
                    type="text"
                    placeholder="Enter Item Name"
                  />
                </AppInputErrors>
                <AppInputErrors error={errors?.pricePerKg?.message}>
                  <Input
                    {...register("pricePerKg", { required: PRICE_FVM })}
                    type="number"
                    placeholder="Enter your Price"
                  />
                </AppInputErrors>
                <AppInputErrors error={errors?.requiredGmsPerWeek?.message}>
                  <Input
                    {...register("requiredGmsPerWeek", {
                      required: GMSPER_WEEK_FVM,
                    })}
                    type="number"
                    placeholder="Enter Gms Per Week"
                  />
                </AppInputErrors>
                <AppInputErrors error={errors?.date?.message}>
                  <Input
                    {...register("date", { required: DATE_FVM })}
                    type="text"
                    placeholder="Enter Date"
                  />
                </AppInputErrors>
                <div className="mt-10 grid grid-cols-2 gap-20 ">
                  <Button type="submit">Submit</Button>
                  <Button onClick={() => setShowDialog(false)}>Close</Button>
                </div>
              </form>
            </div>
          </div>
        </AppDialog>
      )}
    </div>
  );
}

export default TodayGrocery;
