import { useState } from "react"
import { Button } from "../ui/button"
import AppDialog from "@/utils/appUtils/AppDialog"

function TodayGrocery() {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleClose() {
    setShowDialog(false);
  }

  return (
    <div>
      <Button onClick={handleClick}>Add Today Grocery's</Button>
      {showDialog && <AppDialog onClose={handleClose} />}
    </div>
  );
}

export default TodayGrocery;
