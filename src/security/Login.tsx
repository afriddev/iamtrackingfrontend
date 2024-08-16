import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    LOGIN,
  LOGIN_TO_YOUR_ACCOUNT,
  PASSWORD,
  SIGN_UP,
  USER_NAME,
  WELCOME,
} from "@/utils/constants";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  function handlePasswordVisibleClick() {
    setPasswordVisible(passwordVisible ? false : true);
  }

  return (
    <div className="flex flex-col items-center p-2">
      <div className="h-[35vh]">
        <img src="login.png" className="h-full w-full object-fill" />
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <h1 className="text-[40px] font-semibold">{WELCOME}</h1>
        <h3 className="text-lg font-semibold">{LOGIN_TO_YOUR_ACCOUNT}</h3>
      </div>
      <div className="mt-6 flex w-full flex-col px-14 gap-1">
        <Input className="pl-8" icon="USER" placeholder={USER_NAME} />
        <div className="relative">
          <label
            className="absolute right-3 top-[0.74rem] z-[3] cursor-pointer"
            onClick={handlePasswordVisibleClick}
          >
            {passwordVisible ? (
              <LuEye className="h-[0.8rem] w-[0.8rem]" />
            ) : (
              <IoEyeOffOutline className="h-[0.8rem] w-[0.8rem]" />
            )}
          </label>
          <Input
            type={passwordVisible ? "text" : "password"}
            className="pl-8 pr-8"
            icon="PASSWORD"
            placeholder={PASSWORD}
          />
        </div>
      </div>
      <div className="flex mt-6 gap-6 items-center px-16 w-full">
      <Button className="w-full">{SIGN_UP}</Button>
        <Button className="w-full" >{LOGIN}</Button>
        
      </div>
    </div>
  );
}
export default Login;
