import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HomePage from "./components/home/HomePage";
import { useAppContext } from "./utils/AppContext";
import Loading from "./utils/Loading";
import { useGetAndSetUserData } from "./hooks/userHooks";
import Login from "./security/Login";
import LoginMain from "./security/LoginMain";

export default function App() {
  const [pageindex, setPageIndex] = useState<number>(0);
  const { isLoading } = useAppContext()
  function handlePageIndexChange(pageNumber: number) {
    setPageIndex(pageNumber);
  }
  

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
        {(isLoading ) && <Loading />}
        <div className="relative font-mono">
          <div className="absolute  z-[1] h-[100vh] w-[100vw] ">
            <img src="beams.jpg" className="w-full h-full object-cover" />
          </div>
         <div className="z-[2] w-[100vw] relative top-1"><LoginMain /></div>

          {/* <div className="z-[2]  relative top-1  w-[100vw]">
            <HomePage setPageNumber={handlePageIndexChange} />
          </div>
           */}
        </div>
    </QueryClientProvider>
  );
}
