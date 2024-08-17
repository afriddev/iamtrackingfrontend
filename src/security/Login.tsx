import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LOGIN,
  LOGIN_TO_YOUR_ACCOUNT,
  PASSWORD,
  RESET_PASSWORD,
  SIGN_UP,
  TROUBLE_IN_LOGIN,
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
    <div className="flex h-[90vh] flex-col items-center justify-between p-2">
      <div className="h-[35vh]">
        <img src="login.png" className="h-full w-full object-fill" />
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <h1 className="text-[40px] font-semibold">{WELCOME}</h1>
        <h3 className="text-lg font-semibold">{LOGIN_TO_YOUR_ACCOUNT}</h3>
      </div>
      <div className="flex w-full  flex-col">
        <div className="mt-6 flex w-full flex-col gap-1 px-14">
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
        <div className="mt-6 flex w-full items-center gap-6 px-16">
          <Button className="w-full">{SIGN_UP}</Button>
          <Button className="w-full">{LOGIN}</Button>
        </div>
      </div>
      <div>
        <label className="text-xs font-sans">
          {TROUBLE_IN_LOGIN}
          {" :"}
          
        </label>
        <Button variant={"link"} className="-ml-3 text-blue-600  font-sans text-xs">{RESET_PASSWORD}</Button>
      </div>
    </div>
  );
}
export default Login;
