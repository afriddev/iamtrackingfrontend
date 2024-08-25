import { useEffect, useState } from "react";
import NavBar from "../reusable/NavBar";
import SetMonthLimit from "./SetMonthLimit";
import { useAppContext } from "../../utils/AppContext";
import {
  useGetAndSetUserData,
  useGetUserGroceryData,
  useRunJob,
} from "../../hooks/userHooks";
import Spinner from "../../utils/Spinner";
import TodayStatistics from "./TodayStatistics";
import { getLocalStorageItem, useGetMe } from "@/utils/utils";
import { CHARGES, GROCERY, SPENDS } from "@/utils/constants";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  const { userData, loggedIn } = useAppContext();
  const { getUserData, isPending } = useGetAndSetUserData();
  const { emailId } = useGetMe();
  const { runJob, isPending: runningJob } = useRunJob();
  const { getUserGroceryData, isPending: settingUserGroceryData } =
    useGetUserGroceryData();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (emailId || getLocalStorageItem("emailId") || loggedIn) {
      getUserData({
        emailId: emailId ?? (getLocalStorageItem("emailId") as never),
      });
      runJob(
        {
          emailId: emailId ?? (getLocalStorageItem("emailId") as never),
        },
        {
          onSuccess(data) {
            if (data?.data?.message === "AMOUNT_UPDATED") {
              getUserData({
                emailId: emailId as never,
              });
            }
          },
        },
      );
      getUserGroceryData({
        emailId: emailId ?? (getLocalStorageItem("emailId") as never),
      });
    }
  }, [loggedIn]);

  function handleTabIndex(index: number) {
    setTabIndex(index);
  }

  if (isPending || runningJob || settingUserGroceryData)
    return <Spinner loadingState={isPending} />;

  return (
    <div className="px-2 py-2">
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>

      {userData?.monthLimitAmount < 500 && (
        <div className="flex h-full min-h-[80vh] items-center justify-center">
          <SetMonthLimit />
        </div>
      )}

      <div>
        <div className="flex w-full justify-between gap-4 pb-3 pt-4">
          <div
            onClick={() => {
              handleTabIndex(0);
            }}
            className={`glass-shadow ${tabIndex === 0 && "bg-white"} flex w-full cursor-pointer items-center justify-center rounded py-2 text-center  drop-shadow-lg`}
          >
            {SPENDS}
            <div
              className={`${tabIndex === 0 && "absolute bottom-0 h-[0.15rem] w-full rounded-b-lg bg-primary "}`}
            ></div>
          </div>
          <div
            onClick={() => {
              handleTabIndex(1);
            }}
            className={`glass-shadow ${tabIndex === 1 && "bg-white"} flex w-full cursor-pointer items-center justify-center rounded py-2 text-center drop-shadow-lg`}
          >
            {GROCERY}
            <div
              className={`${tabIndex === 1 && "absolute bottom-0 h-[0.15rem] w-full rounded-b-lg bg-primary "}`}
            ></div>
          </div>
          <div
            onClick={() => {
              handleTabIndex(2);
            }}
            className={`glass-shadow ${tabIndex === 2 && "bg-white"} flex w-full cursor-pointer items-center justify-center rounded py-2 text-center  drop-shadow-lg`}
          >
            {CHARGES}
            <div
              className={`${tabIndex === 2 && "absolute bottom-0 h-[0.15rem] w-full rounded-b-lg bg-primary "}`}
            ></div>
          </div>
        </div>

        {userData?.monthLimitAmount >= 500 && tabIndex === 0 && <TodayStatistics />}
      </div>
    </div>
  );
}
export default HomePage;
