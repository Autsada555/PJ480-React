import Navbar from "../customer/navbar";
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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
export function Order() {
    return (
       <div>
        <Navbar></Navbar>
        <div className="left-[176px] top-[125px] absolute text-black text-2xl font-bold font-['Inter']">
            My Order
        </div>
        <div>
        <Table className=" border-double border-4 border-gray-300 mt-[100px] w-[1200px] ml-[175px] bg-gray-200">
          <TableCaption>A list of your order.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12%] text-center text-black">MenuID</TableHead>
              <TableHead className="w-[20%] text-center text-black">Menu Image</TableHead>
              <TableHead className="w-[20%] text-center text-black">Menu Name</TableHead>
              <TableHead className="w-[11%] text-center text-black">Cost</TableHead>
              <TableHead className="w-[12%] text-center text-black">
                Quantity
              </TableHead>
              <TableHead className="w-[14%] text-center hidden md:table-cell text-black">
                Total
              </TableHead>
              <TableHead className="w-[11%] text-center text-black">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
        </Table>
        </div>
        <div>
            <div className="w-[300px] h-[180px] bg-slate-100 mt-[280px] ml-[1070px]  border-[1px]"></div>
        </div>
        <div className="mt-[-160px] ml-[715px]  text-black text-xl font-bold font-['Inter']">
            Order summary
        </div>
        <div className="mt-[10px] ml-[644px]  text-black text-[16px] font-bold font-['Inter']">
           Quantity :
        </div>
        <div className="mt-[10px] ml-[680px]  text-black text-[16px] font-bold font-['Inter']">
           Total Amount :
        </div>
        <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="left-[1240px] top-[675px] absolute bg-green-600 text-white w-[95px] text-[12px]"
                >
                  Confirm Order
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to confirm your order?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Yes, confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
       </div>
    )
}