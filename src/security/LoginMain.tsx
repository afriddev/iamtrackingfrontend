import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

function LoginMain() {
  const [pageIndex, setPageIndex] = useState<number>(1);

  function handlePageIndexChange(index: number) {
    setPageIndex(index);
  }

  return (
    <div>
      {pageIndex === 0 && <Login setPageIndex={handlePageIndexChange} />}
      {pageIndex === 1 && <SignUp setPageIndex={handlePageIndexChange}/>}
    </div>
  );
}

export default LoginMain;
