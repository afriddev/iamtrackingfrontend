import * as React from "react";

import { cn } from "@/lib/utils";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePassword } from "react-icons/md";
import { FaAsterisk } from "react-icons/fa";
import { FiUser ,FiUserPlus} from "react-icons/fi";
import { MdOutlineEmail ,MdOutlinePhone} from "react-icons/md";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, mandatory, ...props }, ref) => {
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
            <RiLockPasswordLine className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
        case "OTP":
          return (
            <MdOutlinePassword className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
        case "FN":
          return (
            <FiUser className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
        case "LN":
          return (
            <FiUserPlus className="absolute left-2 top-[0.64rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
        case "EMAIL":
          return (
            <MdOutlineEmail className="absolute left-2 top-[0.7rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
        case "PHONE":
          return (
            <MdOutlinePhone className="absolute left-2 top-[0.7rem] h-[0.8rem] w-[0.8rem] text-primary" />
          );
      }
    }


    return (
      <div className="relative flex h-12 flex-col gap-[0.3rem]">
        {icon && getIcon(icon)}
        <div className="flex items-center gap-2">
          <input
          autoComplete="off"
            type={type}
            className={cn(
              `flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  disabled:opacity-50 ${icon && "pl-6"}`,
              className,
            )}
            ref={ref}
            {...props}
          />
          {mandatory && (
            <FaAsterisk className=" absolute  -right-4 h-2 w-2 text-destructive" />
          )}
        </div>
        <label className="pl-2 text-[10px] text-destructive ">{error}</label>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
