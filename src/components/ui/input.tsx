import * as React from "react"

import { cn } from "@/lib/utils"
import { PiCurrencyInrBold } from "react-icons/pi"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,error,icon, ...props }, ref) => {

    function getIcon(icon:string):React.ReactNode{
      switch(icon){
        case "AMOUNT":
          return <PiCurrencyInrBold className="w-[0.8rem] top-[0.64rem] left-2 h-[0.8rem] text-primary/50 absolute" />
      }
    }

    return (
      <div  className="h-12 flex flex-col gap-[0.3rem] relative"> 
        {
          icon && getIcon(icon)
        }
        <input
        type={type}
        className={cn(
          `flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${icon && "pl-6"}`,
          className
        )}
        ref={ref}
        {...props}
      />
      <label className="text-destructive pl-2 text-xs ">{error}</label>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
