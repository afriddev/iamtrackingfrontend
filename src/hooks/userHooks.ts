import { useMutation } from "@tanstack/react-query";
import { getUserDataAPI } from "../apiservices/api";
import { useAppContext } from "../utils/AppContext";

export function useGetAndSetUserData() {
    const { dispatch } = useAppContext()
    const { isPending, data, mutate: getUserData } = useMutation({
        mutationFn: ({ emailId }: { emailId: string }) => getUserDataAPI(emailId),
        onSuccess(data) {
            if (data?.data?.message === "SUCCESS") {
                dispatch({
                    type: "setUser",
                    payload: data?.data?.user
                })
            }
            let todaySpendAmount = 0
            for (let index = 0; index < data?.data?.user?.todaySpends?.length; index++) {
                todaySpendAmount = todaySpendAmount + data?.data?.user?.todaySpends[index]
            }
            dispatch({
                type: "setTodaySpendAmount",
                payload: todaySpendAmount
            })


        },
    })
    return { isPending, data, getUserData }
}