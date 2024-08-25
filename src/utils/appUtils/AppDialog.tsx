import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

interface AppDialogProps {
  children: ReactNode;
  title: string;
}

function AppDialog({ children, title }: AppDialogProps) {
  return (
    <div className="fixed top-0 z-[9999] flex h-[100vh] w-[100vw]  items-center  justify-center rounded-md bg-black bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
      <div className="z-[999] rounded-lg  max-h-[80vh] max-w-[90vw] border bg-white p-3 shadow-lg">
        <div className="z-[99] px-2 flex w-full items-center justify-between">
          <label className="text-xs">{title}</label>
          <GrClose className="h-5 w-5  shadow-xl bg-white rounded-md p-1" />
        </div>
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}

export default AppDialog;
