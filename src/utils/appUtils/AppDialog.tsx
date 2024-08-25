import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

interface AppDialogProps {
  children: ReactNode;
  title: string;
  closeMe: () => void;
}

function AppDialog({ children, title, closeMe }: AppDialogProps) {
  return (
    <div className="fixed top-0 z-[9999] flex h-[100vh] w-[100vw]  items-center  justify-center rounded-md bg-black bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
      <div className="z-[999] max-h-[80vh]  max-w-[90vw] rounded-lg border bg-white p-3 shadow-lg">
        <div className="z-[99] flex w-full items-center justify-between px-2">
          <label className="text-xs">{title}</label>
          <GrClose
            onClick={closeMe}
            className="h-5 w-5 cursor-pointer  rounded-md bg-white p-1 shadow-xl"
          />
        </div>
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}

export default AppDialog;
