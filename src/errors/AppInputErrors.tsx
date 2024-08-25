/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

interface AppInputErrorsInterface{
    children: ReactNode;
    error: any;
}
function AppInputErrors({children, error}:AppInputErrorsInterface) {
  return (
    <div className="h-14 relative">
        {children}
        <label className='text-destructive text-[8px] absolute pt-[0.35rem] left-2'>{error}</label>
    </div>
  )
}

export default AppInputErrors;