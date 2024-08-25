import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HomePage from "./components/home/HomePage";
import { useAppContext } from "./utils/AppContext";
import Loading from "./utils/Loading";
import { useGetAndSetUserData } from "./hooks/userHooks";
import LoginMain from "./security/LoginMain";
import { Toaster } from "@/components/ui/toaster";
import { getLocalStorageItem } from "./utils/utils";


export default function App() {
  const queryClient = new QueryClient();
  const [pageindex, setPageIndex] = useState<number>(0);
  const { isLoading } = useAppContext();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  const { loggedIn } = useAppContext();
  const [emailid, setEmailId] = useState<string | null>(
    getLocalStorageItem("emailId"),
  );
  useEffect(() => {
    if (loggedIn || emailid) {
      setUserLoggedIn(true);
    }
    else{
      setUserLoggedIn(false)
    }
  }, [loggedIn]);

  function handlePageIndexChange(pageNumber: number) {
    setPageIndex(pageNumber);
  }

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading && <Loading />}
      {<Toaster />}
      <div className="relative font-mono">
        <div className="absolute  z-[1] h-[100vh] w-[100vw] ">
          <img src="beams.jpg" className="h-full w-full object-cover" />
        </div>
        {!userLoggedIn && (
          <div className="relative top-1 z-[2] w-[100vw]">
            <LoginMain />
          </div>
        )}

        {userLoggedIn && (
          <div className="relative  top-1 z-[2]  w-[100vw]">
            <HomePage setPageNumber={handlePageIndexChange} />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
