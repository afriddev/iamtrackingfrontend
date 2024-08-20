import { useMutation } from "@tanstack/react-query";
import {
  createUserAPI,
  getUserDataAPI,
  loginUserAPI,
  runJobAPI,
  sendOtpAPI,
  setMonthlyAmountAPI,
  updateDailySpendAmountAPI,
} from "../apiservices/api";
import { useAppContext } from "../utils/AppContext";
import { useGetMe } from "@/utils/utils";
import { createUserType } from "@/types/userTypes";

export function useGetAndSetUserData() {
  const { dispatch } = useAppContext();
  const {
    isPending,
    data,
    mutate: getUserData,
  } = useMutation({
    mutationFn: ({ emailId }: { emailId: string }) => getUserDataAPI(emailId),
    onSuccess(data) {
      if (data?.data?.message === "SUCCESS") {
        dispatch({
          type: "setUser",
          payload: data?.data?.user,
        });
      }
      let todaySpendAmount = 0;
      for (
        let index = 0;
        index < data?.data?.user?.todaySpends?.length;
        index++
      ) {
        todaySpendAmount =
          todaySpendAmount + data?.data?.user?.todaySpends[index]?.amount;
      }
      dispatch({
        type: "setTodaySpendAmount",
        payload: todaySpendAmount,
      });
    },
  });

  return { isPending, data, getUserData };
}

export function useSetMonthlyAmount() {
  const { emailId } = useGetMe();
  const {
    isPending,
    data,
    mutate: setMonthlyAmount,
  } = useMutation({
    mutationFn: ({ amount }: { amount: number }) =>
      setMonthlyAmountAPI({ emailId:emailId as never, amount }),
  });
  return {
    isPending,
    setMonthlyAmount,
    data,
  };
}

export function useUpdateDailySpendAMount() {
  const { emailId } = useGetMe();
  const {
    isPending,
    mutate: updateDailySpendAmount,
    data,
  } = useMutation({
    mutationFn: ({
      amount,
      type,
    }: {
      amount: number;
      type: "GROCERY" | "NORMAL";
    }) => updateDailySpendAmountAPI({ emailId:emailId as never, amount, type }),
  });
  return {
    isPending,
    data,
    updateDailySpendAmount,
  };
}

export function useSendOtp() {
  const {
    mutate: sendOtp,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ method, emailId }: { method: string; emailId: string }) =>
      sendOtpAPI({ emailId, method }),
  });
  return { sendOtp, isPending, data };
}

export function useCreateUser() {
  const {
    mutate: createUser,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ data }: { data: createUserType }) => createUserAPI(data),
  });
  return { createUser, isPending, data };
}
export function useLoginUser() {
  const {
    mutate: loginUser,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({
      emailId,
      password,
    }: {
      emailId: string;
      password: string;
    }) => loginUserAPI({ emailId, password }),
  });
  return { loginUser, isPending, data };
}

export function useRunJob() {
  const {
    mutate: runJob,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({
      emailId,
    }: {
      emailId: string;
    }) => runJobAPI(emailId),
  });
  return { runJob, isPending, data };
}
