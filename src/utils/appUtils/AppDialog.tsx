import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AppInputErrors from "@/errors/AppInputErrors";
import { useForm } from "react-hook-form"
import { DATE_FVM, GMSPER_WEEK_FVM, ITEM_FVM, PRICE_FVM, SELECT_GROCERYS } from "../constants";
import { useConfiggrocerylist } from "@/hooks/userHooks";

interface AppDialogProps {
  onClose: () => void;
}

interface FormValues{
  itemName: string;
  pricePerKg: number;
  requiredGmsPerWeek: number;
  date: string;
}

function AppDialog({ onClose }: AppDialogProps) {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { errors } = formState;
  const {submitGroceryData} = useConfiggrocerylist();

  function onSubmit(data: FormValues) {
    submitGroceryData(data);
    console.log("Data", data)
    reset();
  }

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[30vw] h-[65vh] bg-white p-4 rounded-md">
        <div className="flex justify-between items-center mb-4 text-2xl">
          <h1>{SELECT_GROCERYS}</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <AppInputErrors error={errors?.itemName?.message}>
            <Input {...register("itemName", { required: ITEM_FVM })} type="text" placeholder="Enter Item Name" />
          </AppInputErrors>
          <AppInputErrors error={errors?.pricePerKg?.message}>
            <Input {...register("pricePerKg", { required: PRICE_FVM })} type="number" placeholder="Enter your Price" />
          </AppInputErrors>
          <AppInputErrors error={errors?.requiredGmsPerWeek?.message}>
            <Input {...register("requiredGmsPerWeek", { required: GMSPER_WEEK_FVM })} type="number" placeholder="Enter Gms Per Week" />
          </AppInputErrors>
          <AppInputErrors error={errors?.date?.message}>
            <Input {...register("date", { required: DATE_FVM })} type="text" placeholder="Enter Date" />
          </AppInputErrors>
          <div className="grid grid-cols-2 gap-20 mt-10 ">
            <Button type="submit">Submit</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppDialog;
