import { Button } from "@/components/ui/button";
import { DeleteCustomer } from "../../services/https/Customer";

import {
  // AlertDialog,
  AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangleIcon } from "lucide-react";

interface Props {
  customerID: number;
  onCancel(): void;
}
const EmployeeAlert = ({ customerID, onCancel }: Props) => {
  async function handleCancel() {
    const res = await DeleteCustomer(customerID);
    if (res.status) {  // Check the status property
      onCancel();
    } else {
      // Handle the case where the status is false, if needed
      console.error("Failed to delete customer:", res.message);
    }
  }
  return (
    <AlertDialogContent className=" sm:max-w-[320px]">
      <AlertDialogHeader className=" items-center sm:text-center">
        <AlertTriangleIcon className="text-red-500 h-16 w-16" />
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will delete all employee data.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="sm:justify-between">
        <AlertDialogAction asChild>
          <Button variant="secondary">No, don't delete.</Button>
        </AlertDialogAction>
        <AlertDialogTrigger asChild>
          <Button type="submit" variant={"destructive"} onClick={handleCancel}>
            Yes! delete.
          </Button>
        </AlertDialogTrigger>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
export default EmployeeAlert;
