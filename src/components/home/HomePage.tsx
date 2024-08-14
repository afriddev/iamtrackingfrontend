import { useEffect } from "react";
import NavBar from "../re/NavBar";
import SetMonthLimit from "./SetMonthLimit";
import { useAppContext } from "../../utils/AppContext";
import { useGetAndSetUserData } from "../../hooks/userHooks";
import Spinner from "../../utils/Spinner";
import TodayStatistics from "./TodayStatistics";

interface HomePageInterface {
  setPageNumber: (pageNumber: number) => void;
}

function HomePage({ setPageNumber }: HomePageInterface) {
  const { userData } = useAppContext();
  const { getUserData, isPending } = useGetAndSetUserData();

  useEffect(() => {
    getUserData({
      emailId: "369afrd@gmail.com",
    });
  }, []);

  if (isPending) return <Spinner loadingState={isPending} />

  return (  
    <div className="px-2 py-2 ">
      <div className=" p-1">
        <NavBar setPageNumber={setPageNumber} />
      </div>
      
      {
          userData?.monthLimitAmount < 500  && <div className="h-full flex items-center justify-center min-h-[80vh]">
          <SetMonthLimit />
        </div> 
        }
      
      <div>
        {
          userData?.monthLimitAmount >= 500 && <TodayStatistics />
        }
      </div>

    </div>
  );
}
export default HomePage;
