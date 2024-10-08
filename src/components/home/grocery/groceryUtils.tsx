import { groceryDataType } from "@/types/groceryDataTypes";
import {
  S_NO,
  ITEM_NAME,
  GMS,
  PRICE,
  COMPLETED,
  MISSED,
  EDIT,
} from "@/utils/constants";
import { Pencil, Trash } from "lucide-react";
import { ReactNode } from "react";
import { MdDone, MdHourglassBottom } from "react-icons/md";

export function getGroceryColumnData(
  index: number,
  handleCompleteClick: (id: string) => void,
  handleEditClick: (data:groceryDataType) => void,
  handleDeleteClick: (id: string) => void,
) {
  let columnIndex: number | undefined = index;
  let keys: string[] = [];
  let headers: string[] = [];
  if (index !== 0) {
    columnIndex = 4;
    keys = ["", "itemName", "requiredGmsPerWeek", "pricePerKg", ""];
    headers = [
      S_NO,
      ITEM_NAME,
      GMS,
      PRICE,
      index === 1 ? COMPLETED + " ?" : index === 3 ? COMPLETED : MISSED,
    ];
  } else {
    columnIndex = 4;
    keys = ["", "itemName", "requiredGmsPerWeek", "pricePerKg", ""];
    headers = [S_NO, ITEM_NAME, GMS, PRICE, EDIT];
  }

  function getColumn(data: any): ReactNode {
    let column;
    if (index === 0) {
      column = (
        <div className={` flex w-[20vw]  justify-center gap-2`}>
          <Pencil
            onClick={() => {
              handleEditClick(data);
            }}
            className="h-5 w-5 cursor-pointer rounded-sm bg-constructive p-[0.3rem]  text-constructive-foreground shadow-xl drop-shadow-xl"
          />
          <Trash
            onClick={() => {
              handleDeleteClick(data?.id);
            }}
            className="h-5 w-5 cursor-pointer rounded-sm bg-destructive/80 p-[0.25rem]  text-destructive-foreground shadow-xl drop-shadow-xl"
          />
        </div>
      );
    } else if (index === 1) {
      column = (
        <div className={` flex w-[20vw]  justify-center gap-2`}>
          <MdDone
            onClick={() => {
              handleCompleteClick(data?.id);
            }}
            className="h-5 w-5 cursor-pointer rounded-sm bg-constructive p-[0.15rem]  text-constructive-foreground shadow-xl drop-shadow-xl"
          />
          <MdHourglassBottom className="h-5 w-5 cursor-pointer rounded-sm bg-destructive/80 p-[0.15rem]  text-destructive-foreground shadow-xl drop-shadow-xl" />
        </div>
      );
    } else if (index === 2) {
      column = (
        <div className={` flex w-[20vw]  justify-center gap-2`}>
          <MdHourglassBottom className="h-5 w-5 cursor-pointer rounded-sm bg-destructive/80 p-[0.15rem]  text-destructive-foreground shadow-xl drop-shadow-xl" />
        </div>
      );
    } else if (index === 3) {
      column = (
        <div className={` flex w-[20vw]  justify-center gap-2`}>
          <MdDone className="h-5 w-5 cursor-pointer rounded-sm bg-constructive p-[0.15rem]  text-constructive-foreground shadow-xl drop-shadow-xl" />
        </div>
      );
    }
    return column;
  }

  return { columnIndex, keys, headers, getColumn };
}
