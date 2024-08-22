import { useEffect } from "react";
import NavBar from "../re/NavBar";
import SetMonthLimit from "./SetMonthLimit";
import { useAppContext } from "../../utils/AppContext";
import { useGetAndSetUserData, useGetUserGroceryData, useRunJob } from "../../hooks/userHooks";
import Spinner from "../../utils/Spinner";
import TodayStatistics from "./TodayStatistics";
import { getLocalStorageItem, useGetMe } from "@/utils/utils";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  const { userData } = useAppContext();
  const { getUserData, isPending } = useGetAndSetUserData();
  const { emailId } = useGetMe();
  const { runJob,isPending:runningJob} = useRunJob() 
  const {getUserGroceryData,isPending:settingUserGroceryData} = useGetUserGroceryData()

  useEffect(() => {
    
    if (emailId || getLocalStorageItem("emailId")) {
      getUserData({
        emailId:emailId ?? getLocalStorageItem("emailId") as never
      });
      runJob({
        emailId:emailId ?? getLocalStorageItem("emailId") as never
      }, {
        onSuccess(data) {
          if (data?.data?.message === "AMOUNT_UPDATED") {
            getUserData({
              emailId:emailId  as never
            });
        
          }
          
        },
      })
      getUserGroceryData({
        emailId:emailId ?? getLocalStorageItem("emailId") as never
      })
    }

  }, []);

  if (isPending || runningJob || settingUserGroceryData) return <Spinner loadingState={isPending} />;

  return (
    <div className="px-2 py-2 ">
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>

      {userData?.monthLimitAmount < 500 && (
        <div className="flex h-full min-h-[80vh] items-center justify-center">
          <SetMonthLimit />
        </div>
      )}

      <div>{userData?.monthLimitAmount >= 500 && <TodayStatistics />}</div>
    </div>
  );
}
export default HomePage;
