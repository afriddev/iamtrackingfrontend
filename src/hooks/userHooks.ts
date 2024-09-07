import { useMutation } from "@tanstack/react-query";
import {
  createUserAPI,
  configureGroceryDataAPI,
  getUserDataAPI,
  getUserGroceryDataAPI,
  loginUserAPI,
  runJobAPI,
  sendOtpAPI,
  setMonthlyAmountAPI,
  updateDailySpendAmountAPI,
  getConfiguredGroceryDataAPI,
  setCompleteGroceryDataAPI
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
      let totalSpendAmount = 0;
      let todaySpends = 0;
      for (
        let index = 0;
        index < data?.data?.user?.todaySpends?.length;
        index++
      ) {
        totalSpendAmount =
          totalSpendAmount + data?.data?.user?.todaySpends[index]?.amount;
        todaySpends =
          todaySpends + data?.data?.user?.todaySpends[index]?.amount;
      }
      for (
        let index = 0;
        index < data?.data?.user?.dailySpends?.length;
        index++
      ) {
        totalSpendAmount =
          totalSpendAmount + data?.data?.user?.dailySpends[index]?.amount;
      }

      dispatch({
        type: "setTotalSpendAmount",
        payload: {
          totalSpendAmount,
          balance: data?.data?.user?.monthLimitAmount - totalSpendAmount,
          todaySpends,
        },
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
    mutationFn: (amount: any) =>
      setMonthlyAmountAPI({ emailId: emailId as never, ...amount }),
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
    }) =>
      updateDailySpendAmountAPI({ emailId: emailId as never, amount, type }),
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
    mutationFn: ({ emailId }: { emailId: string }) => runJobAPI(emailId),
  });
  return { runJob, isPending, data };
}

export function useGetUserGroceryData() {
  const { dispatch } = useAppContext();
  const {
    mutate: getUserGroceryData,
    isPending,
    data,
  } = useMutation({
    mutationFn: ({ emailId }: { emailId: string }) =>
      getUserGroceryDataAPI(emailId),
    onSettled(data) {
      if (data?.data?.userGroceryData?.monthLyLimit > 0) {
        dispatch({
          type: "setGroceryData",
          payload: data?.data?.userGroceryData,
        });
      }
    },
  });
  return { getUserGroceryData, isPending, data };
}

export function useConfigGroceryData() {
  const { emailId } = useGetMe();
  const { mutate: configureGroceryData, isPending } = useMutation({
    mutationFn: (data: any) =>
      configureGroceryDataAPI({
        emailId: emailId as never,
        itemName: data.itemName,
        pricePerKg: data.pricePerKg,
        requiredGmsPerWeek: data.requiredGmsPerWeek,
      }),
  });
  return { configureGroceryData, isPending };
}

export function useGetConfigureGroceryData() {
  const { emailId } = useGetMe();
  const { dispatch } = useAppContext();
  const {
    mutate: getConfigureGroceryData,
    isPending,
    data: groceryData,
  } = useMutation({
    mutationFn: () =>
      getConfiguredGroceryDataAPI({
        emailId: emailId as never,
      }),
    onSuccess(data) {
      if (data?.data) {
        dispatch({
          type: "setGroceryData",
          payload: data?.data,
        });
      }
    },
  });
  return { getConfigureGroceryData, isPending, groceryData };
}
export function useCompleteGrceryData() {
  const { emailId } = useGetMe();
  const { dispatch } = useAppContext();
  const {
    mutate: setCompleteGroceryData,
    isPending,
    data
  } = useMutation({
    mutationFn: ({id}:{id:string}) =>setCompleteGroceryDataAPI({
        emailId: emailId as never,
        id
      }),
    onSuccess(data) {
      if (data?.data) {
        dispatch({
          type: "setGroceryData",
          payload: data?.data,
        });
      }
    },
  });
  return { setCompleteGroceryData, isPending, data };
}

