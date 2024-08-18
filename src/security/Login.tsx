import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LOGIN,
  LOGIN_TO_YOUR_ACCOUNT,
  PASSWORD,
  PASSWORD_ERROR,
  RESET_PASSWORD,
  SIGN_UP,
  TROUBLE_IN_LOGIN,
  USER_NAME,
  USER_NAME_ERROR,
  WELCOME,
} from "@/utils/constants";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";

interface LoginInterface {
  setPageIndex: (index: number) => void;
}

function Login({ setPageIndex }: LoginInterface) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function handlePasswordVisibleClick() {
    setPasswordVisible(passwordVisible ? false : true);
  }

  function handleUserNameChange(e: any) {
    const userName = e?.target?.value;
    setUserName(userName);
  }

  function handlePasswordChange(e: any) {
    const password = e?.target?.value;
    setPassword(password);
  }

  function handleLoginClick() {
    if (!userName) {
      setUserNameError(USER_NAME_ERROR);
    } else if (!password) {
      setPasswordError(PASSWORD_ERROR);
    } else {
      setUserNameError("");
      setPasswordError("");
    }
  }

  function handleSignUpClick() {
    setPageIndex(1);
  }

  return (
    <div className="flex h-[80vh] flex-col items-center justify-between p-2">
      <div className="h-[35vh]">
        <img src="login.png" className="h-full w-full object-fill" />
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <h1 className="text-[40px] font-semibold">{WELCOME}</h1>
        <h3 className="text-lg font-semibold">{LOGIN_TO_YOUR_ACCOUNT}</h3>
      </div>
      <div className="flex w-full  flex-col">
        <div className="mt-6 flex w-full flex-col gap-2 px-14">
          <Input
            className="pl-8"
            icon="EMAIL"
            value={userName}
            onChange={handleUserNameChange}
            placeholder={USER_NAME}
            error={userNameError}
            mandatory={
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName) ? false : true
            }
          />
          <div className="relative">
            <label
              className="absolute right-3 top-[0.44rem] z-[3] cursor-pointer"
              onClick={handlePasswordVisibleClick}
            >
              {passwordVisible ? (
                <LuEye className="h-[1.3rem] w-[1.3rem]" />
              ) : (
                <IoEyeOffOutline className="h-[1.3rem] w-[1.3rem]" />
              )}
            </label>
            <Input
              type={passwordVisible ? "text" : "password"}
              className="pl-8 pr-8"
              icon="PASSWORD"
              placeholder={PASSWORD}
              value={password}
              error={passwordError}
              onChange={handlePasswordChange}
              mandatory={password ? false : true}
            />
          </div>
        </div>
        <div className="mt-6 flex w-full items-center gap-6 px-16">
          <Button onClick={handleSignUpClick} className="w-full">
            {SIGN_UP}
          </Button>
          <Button className="w-full" onClick={handleLoginClick}>
            {LOGIN}
          </Button>
        </div>
      </div>
      <div>
        <label className="font-sans text-xs">{TROUBLE_IN_LOGIN}</label>
        <Button
          variant={"link"}
          className="-ml-3 font-sans  text-xs text-blue-600"
        >
          {RESET_PASSWORD}
        </Button>
      </div>
    </div>
  );
}
export default Login;
