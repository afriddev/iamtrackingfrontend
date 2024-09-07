import { CiFaceFrown } from "react-icons/ci";
import { NO_DATA_FOUND } from "../constants";
import { ReactNode } from "react";

interface TableInterface {
  data: any;
  headers: string[];
  keys: string[];
  cellWidth?: string;
  columnIndex?: number | undefined;
  column?: ReactNode;
}

function Table({
  data,
  headers,
  keys,
  columnIndex,
  column,
  cellWidth,
}: TableInterface) {
  return (
    <div className="">
      <div className="max-h-[70vh] w-full overflow-auto rounded-lg border border-black  ">
        {data?.length > 0 ? (
          <div>
            <div className="flex items-center justify-between px-2 py-2 text-xs">
              {headers?.map((header: string, index: number) => {
                return (
                  <div
                    className={`flex  ${index === 0 ? `w-[10vw] ` : `justify-center ${cellWidth}`}`}
                    key={index}
                  >
                    <label className="border-b border-black">{header}</label>
                  </div>
                );
              })}
            </div>
            {data?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 py-2 text-xs"
                >
                  {keys?.map((key: string, index1: number) => {
                    return index1 === 0 ? (
                      <div className={`flex w-[10vw]`} key={index1}>
                        <label className="rounded-md bg-black  px-2 py-1  text-white">
                          {index + 1}
                        </label>
                      </div>
                    ) : (columnIndex === 0 || columnIndex) &&
                      index1 === columnIndex ? (
                      column
                    ) : (
                      <div className={` flex ${cellWidth}   justify-center `}>
                        <label>{item[key] ?? "-"}</label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-2 p-3">
            <a>
              <CiFaceFrown className="h-12 w-12 text-destructive/60" />
            </a>
            <label className="pl-6 ">{NO_DATA_FOUND}</label>
          </div>
        )}
      </div>
    </div>
  );
}
export default Table;
