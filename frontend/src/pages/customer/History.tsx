import Navbar from "./navbar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function History() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="left-[176px] top-[125px] absolute text-black text-2xl font-bold font-['Inter']">
         Order history
        </div>
        <div>
          <Table className=" border-double border-4 border-gray-300 mt-[100px] w-[1200px] ml-[175px] bg-gray-200">
            <TableCaption>A list of your order history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[13%] text-center text-black">
                  OrderID
                </TableHead>
                <TableHead className="w-[13%] text-center text-black">
                  Date
                </TableHead>
                <TableHead className="w-[20%] text-center text-black">
                  Menu Name
                </TableHead>
                <TableHead className="w-[14%] text-center text-black">
                 Total
                </TableHead>
                <TableHead className="w-[12%] text-center text-black">
                 Status
                </TableHead>
                <TableHead className="w-[14%] text-center hidden md:table-cell text-black">
                  Repeat
                </TableHead>
                <TableHead className="w-[14%] text-center text-black">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
