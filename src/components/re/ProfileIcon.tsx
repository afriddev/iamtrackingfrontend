import { useProfileImageUplaod, useSetLoading } from "@/app/hooks/appHooks";
import { useAppContext } from "@/app/utils/AppContext";
import Spinner from "@/app/utils/Spinner";
import { BiUser } from "react-icons/bi";

interface ProfileIconInerface { }

function ProfileIcon({ }: ProfileIconInerface) {
  const { isPending, uplaodFile, updatingImageUrl, settingUser } =
    useProfileImageUplaod();
  const { userData } = useAppContext()



  function handleFileChange(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    uplaodFile({
      data: formData,
    });
  }

  function handleProfileClick() {
    document?.getElementById("FILE")?.click();
  }
  console.log(userData)



  return (
    <div className="relative">
      <Spinner loadingState={isPending || updatingImageUrl || settingUser} />
      <div onClick={handleProfileClick}>
        <div
          className="border border-purple-900 bg-purple-50
           rounded-full h-12 w-12 shadow-lg"
        >
          {!userData?.imageUrl ? (
            <BiUser className="w-full h-full p-2" />
          ) : (
            <img
              src={userData?.imageUrl}
              className="w-full h-full object-fill rounded-full"
            />
          )}
        </div>
        <input
          onChange={(e) => {
            if (e?.target?.files) handleFileChange(e?.target?.files[0]);
          }}
          type="file"
          className="hidden"
          id="FILE"
        />
      </div>
    </div>
  );
}
export default ProfileIcon;
