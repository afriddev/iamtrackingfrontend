import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateUser, useSendOtp } from "@/hooks/userHooks";
import { createUserType } from "@/types/userTypes";
import {
  ACCOUNT_CREATED_SUCCESS,
  CREATE_ACCOUNT,
  EMAIL_ID,
  EMAIL_ID_ERROR,
  FIRST_NAME,
  FIRST_NAME_ERROR,
  INVALID_EMAIL_ID,
  INVALID_OTP,
  LAREADY__HAVE_ACCOUNT,
  LAST_NAME,
  LOGIN,
  MOBILE_NUMBER,
  NEXT,
  OTP,
  OTP_SEND_SUCCESS,
  PASSWORD,
  PASSWORD_DONT_MATCH,
  PASSWORD_ERROR,
  SIGN_UP,
} from "@/utils/constants";
import Spinner from "@/utils/Spinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { useToast } from "@/components/ui/use-toast";
import { getErrorDescription } from "@/utils/utils";

interface SignUpInterface {
  setPageIndex: (index: number) => void;
}

interface FormDataInterface {
  FN: string;
  LN: string;
  email: string;
  phone: string;
  passwordone: string;
  passwordtwo: string;
  otp: string;
}

function SignUp({ setPageIndex }: SignUpInterface) {
  const [step, setStep] = useState<number>(0);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState,
    watch,
    setValue,
  } = useForm<FormDataInterface>();
  const { errors } = formState;
  const { sendOtp, isPending } = useSendOtp();
  const [signUpOtp, setSignUpOtp] = useState<number | undefined>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { createUser, isPending: creatingUser } = useCreateUser();
  const { toast } = useToast();

  function handlePasswordVisibleClick() {
    setPasswordVisible(passwordVisible ? false : true);
  }

  function handleLoginClick() {
    setPageIndex(0);
  }

  function handleSignUpClick(e: any) {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      if (!getValues("email"))
        setError("email", {
          type: "manual",
          message: EMAIL_ID_ERROR,
        });
      else setStep(2);
    } else if (step === 2) {
      sendOtp(
        {
          method: "SIGNUP",
          emailId: getValues("email"),
        },
        {
          onSuccess(data) {
            if (data?.data?.message === "SUCCESS") {
              setSignUpOtp(parseInt(data?.data?.otp));
              setStep(3);
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
    } else if (step === 3) {
      console.log(signUpOtp);
      if (parseInt(e?.otp) === signUpOtp) {
        const userData: createUserType = {
          emailId: e?.email,
          firstName: e?.FN,
          lastName: e?.LN,
          password: e?.passwordtwo,
          mobileNumber: e?.phone,
        };
        createUser(
          {
            data: userData,
          },
          {
            onSuccess(data) {
              if (data?.data?.message === "SUCCESS") {
                toast({
                  title: "SUCCESS",
                  description: ACCOUNT_CREATED_SUCCESS,
                  variant: "constructive",
                });
                setTimeout(()=>{handleLoginClick();},500)
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
        setValue("otp", "");
        setError("otp", {
          type: "manual",
          message: INVALID_OTP,
        });
      }
    }
  }

  function checkEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const emailId = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailId)) {
      clearErrors("email");
    } else {
      setError("email", {
        type: "manual",
        message: INVALID_EMAIL_ID,
      });
    }
    setValue("email", emailId);
  }

  function handleOtpChange(e: any) {
    const otp = e?.target?.value?.replace(/\D/g, "");
    setValue("otp", otp);
    if (otp?.length !== 6) {
      setError("otp", {
        type: "manual",
        message: INVALID_OTP,
      });
    } else {
      clearErrors("otp");
    }
  }

  return (
    <div className="flex h-[80vh] flex-col items-center justify-between p-2">
      <Spinner loadingState={isPending || creatingUser} />
      <div className="mt-10 h-[30vh]">
        <img src="createAccount.png" className="h-full w-full object-fill" />
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <h1 className="text-[40px] font-semibold">{CREATE_ACCOUNT}</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignUpClick)} className="w-full">
        <div className="flex w-full flex-col">
          <div className="w-full">
            {step === 0 && (
              <div className="mt-6 flex w-full flex-col gap-3 px-14">
                <Input
                  className="pl-8"
                  icon="FN"
                  placeholder={FIRST_NAME}
                  error={errors?.FN?.message}
                  mandatory={
                    watch("FN") && watch("FN")?.length > 2 ? false : true
                  }
                  {...register("FN", {
                    required: FIRST_NAME_ERROR,
                    minLength: 3,
                  })}
                />
                <Input
                  className="pl-8"
                  icon="LN"
                  mandatory={watch("LN") ? false : undefined}
                  placeholder={LAST_NAME}
                  {...register("LN")}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            {step === 1 && (
              <div className="mt-6 flex w-full flex-col gap-3 px-14">
                <Input
                  className="pl-8"
                  icon="EMAIL"
                  placeholder={EMAIL_ID}
                  error={errors?.email?.message}
                  mandatory={
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watch("email"))
                      ? true
                      : false
                  }
                  value={getValues("email")}
                  onChange={checkEmail}
                />
                <Input
                  className="pl-8"
                  icon="PHONE"
                  placeholder={MOBILE_NUMBER}
                  mandatory={watch("phone") ? false : undefined}
                  {...register("phone")}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            {step === 2 && (
              <div className="mt-6 flex w-full flex-col gap-3 px-14">
                <div>
                  <Input
                    className="pl-8"
                    icon="PASSWORD"
                    placeholder={PASSWORD}
                    error={errors?.passwordone?.message}
                    mandatory={!watch("passwordone") ? true : false}
                    type="input "
                    {...register("passwordone", {
                      required: PASSWORD_ERROR,
                    })}
                  />
                </div>
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
                    className="pl-8"
                    icon="PASSWORD"
                    placeholder={PASSWORD}
                    error={errors?.passwordtwo?.message}
                    mandatory={
                      watch("passwordtwo") !== watch("passwordone") ||
                      !watch("passwordtwo")
                        ? true
                        : false
                    }
                    type={passwordVisible ? "text" : "password"}
                    {...register("passwordtwo", {
                      required: PASSWORD_ERROR,
                      validate: (value) =>
                        value === watch("passwordone") || PASSWORD_DONT_MATCH,
                    })}
                  />{" "}
                </div>
              </div>
            )}
          </div>
              {step === 3 && (
                <div className="mt-6 flex w-full flex-col gap-3 px-14">
                  <Input
                    className="pl-8"
                    icon="OTP"
                    placeholder={OTP}
                    error={errors?.otp?.message}
                    mandatory={
                      watch("otp") && watch("otp")?.length === 6 ? false : true
                    }
                    onChange={handleOtpChange}
                    value={getValues("otp") ?? ""}
                  />
                </div>
              )}

          <div className="mt-8 flex w-full items-center gap-6 px-16">
            <Button className="w-full" type="submit">
              {step === 3 ? SIGN_UP : NEXT}
            </Button>
          </div>
        </div>
      </form>
      <div>
        <label className="font-sans text-xs">{LAREADY__HAVE_ACCOUNT}</label>
        <Button
          onClick={handleLoginClick}
          variant={"link"}
          className="-ml-3 font-sans text-xs text-blue-600"
        >
          {LOGIN}
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
