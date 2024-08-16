import * as React from "react";

import { cn } from "@/lib/utils";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    function getIcon(icon: string): React.ReactNode {
      switch (icon) {
        case "AMOUNT":
          return (
            <PiCurrencyInrBold className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary/50" />
          );
        case "USER":
          return (
            <FaUserAlt className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
        case "PASSWORD":
          return (
            <FaLock className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
      }
    }

    return (
      <div className="relative flex h-12 flex-col gap-[0.3rem]">
        {icon && getIcon(icon)}
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  shadow-xl ${icon && "pl-6"}`,
            className,
          )}
          ref={ref}
          {...props}
        />
        <label className="pl-2 text-xs text-destructive ">{error}</label>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
