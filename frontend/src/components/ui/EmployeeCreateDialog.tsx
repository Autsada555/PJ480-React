import { Button } from "@/components/ui/button";
// import Form from "@/components/ui/form";
import { UserPlus } from "lucide-react";
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

const EmployeeCreateDialog = () => {

    return(
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <UserPlus className="text-green-500 absolute top-4 left-12 hover:scale-110 cursor-pointer" />
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[480px] h-[80%] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Employee Data</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your Employee here. Click save when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button variant="secondary">Close</Button>
            </AlertDialogAction>
            <Button type="submit">Save changes</Button>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );

};
export default EmployeeCreateDialog;
