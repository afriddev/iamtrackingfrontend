import { useMutation } from "@tanstack/react-query";
import { imageUplaodAPI, updateProfileImageAPI } from "../apiservices/api";
import { useGetMe } from "../utils/utils";
import { useAppContext } from "../utils/AppContext";
import { useGetAndSetUserData } from "./userHooks";

export function useProfileImageUplaod() {
  const { updateImageUrl, updatingImageUrl, settingUser } =
    useUpdateProfileImage();
  const key = "1aed1d376c24b1fcd746e2f521eb40b7";
  const {
    mutate: uplaodFile,
    isPending,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: ({ data }: { data: FormData }) => imageUplaodAPI(key, data),
    onSuccess(data) {
      updateImageUrl({ url: data?.data?.data?.display_url });
    },
  });
  return {
    isPending,
    data,
    isSuccess,
    uplaodFile,
    updatingImageUrl,
    settingUser,
  };
}

function useUpdateProfileImage() {
  const { getUserData, isPending: settingUser } = useGetAndSetUserData();
  const { emailId } = useGetMe();
  const { mutate: updateImageUrl, isPending: updatingImageUrl } = useMutation({
    mutationFn: ({ url }: { url: string }) =>
      updateProfileImageAPI({ url, emailId }),
    onSuccess(data) {
      if (data?.data?.message === "SUCCESS") {

        getUserData({
          emailId,
        });
      }
    },
  });

  return { updatingImageUrl, updateImageUrl, settingUser };
}

export function useSetLoading() {
  const { dispatch } = useAppContext();
  function setLaoding(loading: boolean) {
    dispatch({
      type: "setIsLoading",
      payload: loading,
    });
  }
  return { setLaoding };
}
