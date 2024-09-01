import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLoginUser, useSendOtp } from "@/hooks/userHooks";
import { useAppContext } from "@/utils/AppContext";
import {
  BACK,
  INVALID_EMAIL_ID,
  INVALID_OTP,
  LOGGED_IN_SUCCESS,
  LOGIN,
  LOGIN_TO_YOUR_ACCOUNT,
  OTP,
  OTP_SEND_SUCCESS,
  PASSWORD,
  PASSWORD_ERROR,
  RESET_PASSWORD,
  SIGN_UP,
  TROUBLE_IN_LOGIN,
  USER_NAME,
  USER_NAME_ERROR,
  WELCOME,
} from "@/utils/constants";
import Spinner from "@/utils/appUtils/Spinner";
import { getErrorDescription, setLocalStorageItem } from "@/utils/utils";
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
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState<number | undefined>();
  const [otpError, setOtpError] = useState("");
  const { isPending, sendOtp } = useSendOtp();
  const [loginOtp, setLoginOtp] = useState<number>();
  const { toast } = useToast();
  const { isPending: loggingUser, loginUser } = useLoginUser();
  const { dispatch } = useAppContext();

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
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName)) {
        setUserNameError("");
        if (step === 0) {
          sendOtp(
            {
              emailId: userName,
              method: "LOGIN",
            },
            {
              onSuccess(data) {
                if (data?.data?.message === "SUCCESS") {
                  setLoginOtp(data?.data?.otp);
                  setStep(1);
                  if (data?.data?.message === "SUCCESS") {
                    toast({
                      title: "SUCCESS",
                      description: OTP_SEND_SUCCESS,
                      variant: "constructive",
                    });
                  } else {
                    toast({
                      title: "ERROR",
                      description: getErrorDescription(data?.data?.message),
                      variant: "destructive",
                    });
                  }
                }
              },
            },
          );
        } else {
          if (otp?.toString() === loginOtp?.toString()) {
            setOtpError("");
            loginUser(
              {
                emailId: userName,
                password:btoa(password),
              },
              {
                onSuccess(data) {
                  if (data?.data?.message === "SUCCESS") {
                    setLocalStorageItem("emailId", userName);
                    setUserNameError("");
                    setPasswordError("");
                    setOtp(undefined);
                    toast({
                      title: "SUCCESS",
                      description: LOGGED_IN_SUCCESS,
                      variant: "constructive",
                    });
                    dispatch({
                      type: "setLoggedIn",
                      payload: true,
                    });
                  } else {
                    toast({
                      title: "ERROR",
                      description: getErrorDescription(data?.data?.message),
                      variant: "destructive",
                    });
                  }
                },
              },
            );
          } else {
            console.log(otp,loginOtp)
            setOtpError(INVALID_OTP);
          }
        }
      } else {
        setUserNameError(INVALID_EMAIL_ID);
      }
    }
  }

  function handleSignUpClick() {
    setPageIndex(1);
  }

  function handleBackClick() {
    setStep(0);
    setOtp(undefined);
  }
  function handleOtpChange(e: any) {
    const otpValue = e?.target?.value?.replace(/\D/g, "");
    setOtp(otpValue);
    if (otpValue?.length !== 6) {
      setOtpError(INVALID_OTP);
    } else {
      setOtpError("");
    }
  }

  return (
    <div className="flex h-[80vh] flex-col items-center justify-between p-2">
      <Spinner loadingState={isPending || loggingUser} />
      <div className="h-[35vh]">
        <img src="login.png" className="h-full w-full object-fill" />
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <h1 className="text-[40px] font-semibold">{WELCOME}</h1>
        <h3 className="text-lg font-semibold">{LOGIN_TO_YOUR_ACCOUNT}</h3>
      </div>
      <div className="flex w-full  flex-col">
        {step === 0 && (
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
        )}

        {step === 1 && (
          <div className="mt-6 flex w-full flex-col gap-3 px-14">
            <Input
              className="pl-8"
              icon="OTP"
              placeholder={OTP}
              error={otpError}
              mandatory={otp && otp.toString()?.length === 6 ? false : true}
              onChange={handleOtpChange}
              value={otp ?? ""}
            />
          </div>
        )}
        <div className="mt-6 flex w-full items-center gap-6 px-16">
          <Button
            onClick={() => {
              if (step === 0) {
                handleSignUpClick();
              } else {
                handleBackClick();
              }
            }}
            className="w-full"
          >
            {step == 0 ? SIGN_UP : BACK}
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
