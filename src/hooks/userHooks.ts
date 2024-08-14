import { useMutation } from "@tanstack/react-query";
import { getUserDataAPI, setMonthlyAmountAPI } from "../apiservices/api";
import { useAppContext } from "../utils/AppContext";
import { useGetMe } from "@/utils/utils";

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
          todaySpendAmount + data?.data?.user?.todaySpends[index];
      }
      dispatch({
        type: "setTodaySpendAmount",
        payload: todaySpendAmount,
      });
    },
  });

  console.log(isPending)


  return { isPending, data, getUserData };
}

export function useSetMonthlyAmount() {
  const { emailId } = useGetMe();
  const { getUserData, isPending: settingUserData } = useGetAndSetUserData();
  const {
    isPending,
    data,
    mutate: setMonthlyAmount,
  } = useMutation({
    mutationFn: ({ amount }: { amount: number }) =>
      setMonthlyAmountAPI({ emailId, amount }),
    onSuccess(data) {
      if (data?.data?.message === "SUCCESS") {
        getUserData({ emailId });
      }
    },
  });
  return {
    isPending,
    setMonthlyAmount,
    data,
    settingUserData,
  };
}
