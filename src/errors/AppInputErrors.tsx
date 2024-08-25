/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

interface AppInputErrorsInterface{
    children: ReactNode;
    error: any;
}
function AppInputErrors({children, error}:AppInputErrorsInterface) {
  return (
    <div className="h-[10vh]">
        {children}
        <label className='text-destructive text-sm h-7'>{error}</label>
    </div>
  )
}

export default AppInputErrors;