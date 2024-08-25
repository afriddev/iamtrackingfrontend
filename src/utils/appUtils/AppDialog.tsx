import { ReactNode } from "react";

interface AppDialogProps {
  children: ReactNode;
}

function AppDialog({ children }: AppDialogProps) {

  return (
    <div>
    {
      children 
    }
    </div>
  );
}

export default AppDialog;

