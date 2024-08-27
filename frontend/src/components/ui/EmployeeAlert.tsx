import { Button } from "@/components/ui/button";
import { DeleteCustomer } from "../../services/https/Customer";

import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangleIcon } from "lucide-react";

interface Props {
  customerID: number;
  onCancel(): void;
}

const EmployeeAlert = ({ customerID, onCancel }: Props) => {
  async function handleCancel() {
    try {
      const res = await DeleteCustomer(customerID);
      if (res.status) {  // Adjust this based on your actual response structure
        onCancel();
      } else {
        // Handle the case where the status is false, if needed
        console.error("Failed to delete customer:", res.message);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error occurred while deleting customer:", error);
    }
  }

  return (
    <AlertDialogContent className="sm:max-w-[320px]">
      <AlertDialogHeader className="items-center sm:text-center">
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
        <Button type="button" variant={"destructive"} onClick={handleCancel}>
          Yes! Delete.
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default EmployeeAlert;
