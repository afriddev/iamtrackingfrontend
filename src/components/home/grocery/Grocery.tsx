import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import AppDialog from "@/utils/appUtils/AppDialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  useConfigGroceryData,
  useGetConfigureGroceryData,
  useCompleteGrceryData,
  useDeleteGrceryData,
  useGetAndSetUserData,
} from "@/hooks/userHooks";
import Spinner from "@/utils/appUtils/Spinner";
import { useToast } from "@/components/ui/use-toast";
import {
  ITEM_FVM,
  GMSPER_WEEK_FVM,
  ITEM_ADDED_SUCCESSFULLY,
  PRICE_FVM,
  ITEM_ADDED_FAILED,
  ADD_ITEM,
  CLOSE,
  ADD_GROCERY_ITEM,
  ADD,
  REQUEST_SUCCESS,
  EDIT_GGROCERY_ITEM,
  DELETED_ITEM_SUCCESS,
  REQUEST_FAILED,
  EDIT,
} from "@/utils/constants";
import { groceryDataType } from "@/types/groceryDataTypes";
import { X } from "lucide-react";
import { useAppContext } from "@/utils/AppContext";
import Table from "@/utils/appUtils/Table";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { getGroceryColumnData } from "./groceryUtils";
import { useGetMe } from "@/utils/utils";

function Grocery() {
  const [showDialog, setShowDialog] = useState(false);
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<groceryDataType>();
  const { errors } = formState;
  const { configureGroceryData, isPending } = useConfigGroceryData();
  const { toast } = useToast();
  const {
    getConfigureGroceryData,
    isPending: gettingConfigureData,
    groceryData: groceryAPIData,
  } = useGetConfigureGroceryData();
  const {
    totalGroceryData,
    dailyGroceryData,
    missedGroceryData,
    completedroceryData,
  } = useAppContext();
  const [selectedGroceryData, setSelectedGrocerData] =
    useState(totalGroceryData);
  const [selectedGroceryIndex, setSelectedGrocerIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const groceryFilters = [
    { name: "Total", index: 0 },
    { name: "Today", index: 1 },
    { name: "Missed", index: 2 },
    { name: "Completed", index: 3 },
  ];

  const { columnIndex, keys, headers, getColumn } = getGroceryColumnData(
    selectedGroceryIndex,
    handleCompleteClick,
    handleEditClick,
    handleDeleteClick,
  );

  const { isPending: completeData, setCompleteGroceryData } =
    useCompleteGrceryData();
  const [dialogTitle, setDialogTitle] = useState<string>(ADD_GROCERY_ITEM);

  const { deleteGroceryData, isPending: deletinggroceryData } =
    useDeleteGrceryData();
  const { getUserData, isPending: gettingUserData } = useGetAndSetUserData();
  const { emailId } = useGetMe();

  useEffect(() => {
    if (totalGroceryData?.length === 0 && !groceryAPIData?.data) {
      getConfigureGroceryData();
    }
    if (totalGroceryData?.length > 0) {
      setSelectedGrocerData(totalGroceryData);
    }
  }, [totalGroceryData]);

  useEffect(() => {
    setSelectedGrocerIndex(0);
    setSelectedGrocerData(totalGroceryData);
  }, [
    totalGroceryData,
    dailyGroceryData,
    missedGroceryData,
    completedroceryData,
  ]);

  function handleClick() {
    setShowDialog(true);
  }

  function onSubmit(data: groceryDataType) {
    configureGroceryData(data, {
      onSuccess(response) {
        if (response?.data.message === "SUCCESS") {
          reset();
          toast({
            title: "SUCCESS",
            description: ITEM_ADDED_SUCCESSFULLY,
            variant: "constructive",
          });
          reset();
          getConfigureGroceryData();
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

  function closeDialog() {
    setShowDialog(false);
    setDialogTitle(ADD_GROCERY_ITEM);
  }

  function handleSetSelectedGroceryData(index: number) {
    switch (index) {
      case 0:
        setSelectedGrocerData(totalGroceryData);
        setOpened(false);
        setSelectedGrocerIndex(index);
        break;

      case 1:
        setSelectedGrocerData(dailyGroceryData);
        setSelectedGrocerIndex(index);
        setOpened(false);
        break;

      case 2:
        setSelectedGrocerData(missedGroceryData);
        setSelectedGrocerIndex(index);
        setOpened(false);
        break;

      case 3:
        setSelectedGrocerData(completedroceryData);
        setSelectedGrocerIndex(index);
        setOpened(false);
        break;
    }
  }

  function handleOpen() {
    setOpened(!opened);
  }

  function handleCompleteClick(id: string) {
    setCompleteGroceryData(
      {
        id,
      },
      {
        onSuccess(data) {
          if (data?.data?.message === "SUCCESS") {
            reset();
            toast({
              title: "SUCCESS",
              description: REQUEST_SUCCESS,
              variant: "constructive",
            });
            getConfigureGroceryData();
            handleSetSelectedGroceryData(0);
            getUserData({
              emailId: emailId as never,
            });
          }
        },
      },
    );
  }

  function handleEditClick(data: groceryDataType) {
    setValue("itemName", data?.itemName);
    setValue("pricePerKg", data?.pricePerKg);
    setValue("requiredGmsPerWeek", data?.requiredGmsPerWeek);
    setValue("id", data?.id);

    setDialogTitle(EDIT_GGROCERY_ITEM);
    setShowDialog(true);
  }

  function handleDeleteClick(id: string) {
    deleteGroceryData(
      {
        id,
      },
      {
        onSuccess(data: any) {
          if (data?.data?.message === "SUCCESS") {
            toast({
              title: "SUCCESS",
              description: DELETED_ITEM_SUCCESS,
              variant: "constructive",
            });
            getConfigureGroceryData();
          } else {
            toast({
              title: "ERROR",
              description: REQUEST_FAILED,
              variant: "destructive",
            });
          }
        },
      },
    );
  }

  if (gettingConfigureData)
    return <Spinner loadingState={gettingConfigureData} />;

  return (
    <div>
      <Spinner
        loadingState={
          isPending || completeData || deletinggroceryData || gettingUserData
        }
      />
      <div className="flex w-full items-center justify-between px-2">
        <div
          tabIndex={1}
          onBlur={() => {
            setOpened(false);
          }}
          className="relative text-xs"
        >
          <div
            onClick={handleOpen}
            className={`-mt-[0.2rem] flex w-[25vw] cursor-pointer items-center justify-between  bg-white  px-2 py-[0.2rem] shadow-lg ${opened ? "rounded-t-md" : "rounded-md"}`}
          >
            {selectedGroceryIndex === 0
              ? "Total"
              : selectedGroceryIndex === 1
                ? "Today"
                : selectedGroceryIndex === 2
                  ? "Missed"
                  : "completed"}

            {opened ? (
              <IoMdArrowDropup className="h-4 w-4" />
            ) : (
              <IoMdArrowDropdown className="h-4 w-4" />
            )}
          </div>
          {opened && (
            <div className="absolute flex w-[25vw] flex-col  items-center rounded-lg shadow-md">
              {groceryFilters?.map((item, index) => {
                return (
                  item?.index !== selectedGroceryIndex && (
                    <div
                      onClick={() => {
                        handleSetSelectedGroceryData(item?.index);
                      }}
                      className={`flex w-full cursor-pointer justify-center bg-zinc-100 py-1 ${index === groceryFilters?.length - 1 && "rounded-b-md"}`}
                      key={index}
                    >
                      {item?.name}
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>

        <Button onClick={handleClick}>{ADD_ITEM}</Button>
      </div>
      <div className="mt-1 px-2">
        <Table
          columnIndex={columnIndex}
          cellWidth="w-[20vw]"
          column={(data: any) => {
            return getColumn(data);
          }}
          data={selectedGroceryData}
          headers={headers}
          keys={keys}
        />
      </div>

      {showDialog && (
        <AppDialog closeMe={closeDialog} title={dialogTitle}>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[70vw] flex-col gap-3"
            >
              <div>
                <Input
                  error={errors?.itemName?.message}
                  {...register("itemName", { required: ITEM_FVM })}
                  type="text"
                  placeholder={ITEM_FVM}
                  icon="RICE"
                />
              </div>
              <div>
                <Input
                  error={errors?.pricePerKg?.message}
                  {...register("pricePerKg", {
                    required: PRICE_FVM,
                    pattern: /^\d+$/,
                  })}
                  placeholder={PRICE_FVM}
                  icon="AMOUNT"
                />
              </div>
              <div>
                <Input
                  error={errors?.requiredGmsPerWeek?.message}
                  icon="WEIGHT"
                  {...register("requiredGmsPerWeek", {
                    required: GMSPER_WEEK_FVM,
                    pattern: /^\d+$/,
                  })}
                  placeholder={GMSPER_WEEK_FVM}
                />
              </div>
              <div className=" mt-6 grid grid-cols-2 gap-4 ">
                <Button
                  variant={"ghost"}
                  onClick={() => setShowDialog(false)}
                  className="flex items-center shadow-xl "
                >
                  <X className="-mt-1 h-5 w-5 pr-1" />
                  {CLOSE}
                </Button>
                <Button type="submit">
                  {dialogTitle === ADD_GROCERY_ITEM ? ADD : EDIT}
                </Button>
              </div>
            </form>
          </div>
        </AppDialog>
      )}
    </div>
  );
}

export default Grocery;
