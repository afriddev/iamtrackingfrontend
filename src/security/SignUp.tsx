import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CREATE_ACCOUNT,
  EMAIL_ID,
  EMAIL_ID_ERROR,
  FIRST_NAME,
  FIRST_NAME_ERROR,
  LAREADY__HAVE_ACCOUNT,
  LAST_NAME,
  LOGIN,
  MOBILE_NUMBER,
  NEXT,
  PASSWORD,
  PASSWORD_DONT_MATCH,
  PASSWORD_ERROR,
  SIGN_UP,
} from "@/utils/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignUpInterface {
  setPageIndex: (index: number) => void;
}

function SignUp({ setPageIndex }: SignUpInterface) {
  const [step, setStep] = useState<number>(0);
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function handleLoginClick() {
    setPageIndex(0);
  }

  function handleSignUpClick(e: any) {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      console.log(e);
    }
  }

  return (
    <div className="flex h-[80vh] flex-col items-center justify-between p-2">
      <div className="mt-10 h-[30vh]">
        <img src="createAccount.png" className="h-full w-full object-fill" />
      </div>
      <div className="mt-4 flex w-full flex-col items-center">
        <h1 className="text-[40px] font-semibold">{CREATE_ACCOUNT}</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignUpClick)} className="w-full">
        <div className="flex w-full  flex-col">
          <div className="w-full">
            {step === 0 && (
              <div className="mt-6 flex  w-full flex-col gap-3 px-14">
                <Input
                  className="pl-8"
                  icon="FN"
                  placeholder={FIRST_NAME}
                  error={errors?.FN?.message as never}
                  mandatory={true}
                  {...register("FN", {
                    required: FIRST_NAME_ERROR,
                  })}
                />
                <Input
                  className="pl-8"
                  icon="LN"
                  placeholder={LAST_NAME}
                  {...register("LN", {
                    required: false,
                  })}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            {step === 1 && (
              <div className="mt-6 flex  w-full flex-col gap-3 px-14">
                <Input
                  className="pl-8"
                  icon="EMAIL"
                  placeholder={EMAIL_ID}
                  error={errors?.email?.message as never}
                  mandatory={true}
                  {...register("email", {
                    required: EMAIL_ID_ERROR,
                  })}
                />
                <Input
                  className="pl-8"
                  icon="PHONE"
                  placeholder={MOBILE_NUMBER}
                  {...register("phone", {
                    required: false,
                  })}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            {step === 2 && (
              <div className="mt-6 flex  w-full flex-col gap-3 px-14">
                <Input
                  className="pl-8"
                  icon="PASSWORD"
                  placeholder={PASSWORD}
                  error={errors?.passwordone?.message as never}
                  mandatory={true}
                  {...register("passwordone", {
                    required: PASSWORD_ERROR,
                  })}
                />
                <Input
                  className="pl-8"
                  icon="PASSWORD"
                  placeholder={PASSWORD}
                  mandatory={true}
                  error={errors?.passwordtwo?.message as never}
                  {...register("`passwordtwo`", {
                    required: PASSWORD_ERROR,
                  })}
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex w-full items-center gap-6 px-16">
            <Button className="w-full">{step === 2 ? SIGN_UP : NEXT}</Button>
          </div>
        </div>
      </form>
      <div>
        <label className="font-sans text-xs">{LAREADY__HAVE_ACCOUNT}</label>
        <Button
          onClick={handleLoginClick}
          variant={"link"}
          className="-ml-3 font-sans  text-xs text-blue-600"
        >
          {LOGIN}
        </Button>
      </div>
    </div>
  );
}

export default SignUp;

{
  /* <div className="relative">
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
            />
          </div> */
}
