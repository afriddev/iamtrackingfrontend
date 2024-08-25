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
  GMSPER_WEEK_FVM,
  ITEM_ADDED_SUCCESSFULLY,
  PRICE_FVM,
  SELECT_GROCERYS,
  ITEM_ADDED_FAILED,
  ADD_ITEM,
  SUBMIT,
  CLOSE,
  ADD_GROCERY_ITEM,
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
        } else {
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
      <Button onClick={handleClick}>{ADD_ITEM}</Button>
      {showDialog && (
        <AppDialog title={ADD_GROCERY_ITEM}>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div>
                <AppInputErrors error={errors?.itemName?.message}>
                  <Input
                    {...register("itemName", { required: ITEM_FVM })}
                    type="text"
                    placeholder={ITEM_FVM}
                  />
                </AppInputErrors>
              </div>
              <div>
                <AppInputErrors error={errors?.pricePerKg?.message}>
                  <Input
                    {...register("pricePerKg", { required: PRICE_FVM })}
                    placeholder={PRICE_FVM}
                  />
                </AppInputErrors>
              </div>
              <div>
                <AppInputErrors error={errors?.requiredGmsPerWeek?.message}>
                  <Input
                    {...register("requiredGmsPerWeek", {
                      required: GMSPER_WEEK_FVM,
                    })}
                    placeholder={GMSPER_WEEK_FVM}
                  />
                </AppInputErrors>
              </div>
              <div className=" mt-6 grid grid-cols-2 gap-4 ">
                <Button type="submit">{SUBMIT}</Button>
                <Button onClick={() => setShowDialog(false)}>{CLOSE}</Button>
              </div>
            </form>
          </div>
        </AppDialog>
      )}
    </div>
  );
}

export default TodayGrocery;
