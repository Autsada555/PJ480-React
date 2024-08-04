import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { AlertTriangleIcon } from "lucide-react";

const EmployeeAlert = ({}) => {

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
          <Button type="submit" variant={"destructive"}>
          Yes! delete.
          </Button>
        </AlertDialogTrigger>
      </AlertDialogFooter>
    </AlertDialogContent>

  );

};
export default EmployeeAlert;
