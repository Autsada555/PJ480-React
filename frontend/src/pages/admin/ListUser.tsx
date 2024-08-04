import Navbar from "./navbar";
// import EmployeeAlert from "@/components/ui/EmployeeAlert";
// import EmployeeCreateDialog from "@/components/ui/EmployeeCreateDialog";
// import EmployeeEdit from "@/components/ui/EmployeeEdit";

import {
  Table,
  TableBody,
  TableCaption,
  //   TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function ListUser() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="left-[176px] top-[125px] absolute text-black text-2xl font-bold font-['Inter']">
          A list of User
        </div>
        <div>
          <Table className=" border-double border-4 border-gray-300 mt-[100px] w-[1300px] ml-[135px] bg-gray-200">
            <TableCaption>A list of User.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%] text-center">FirstName</TableHead>
                <TableHead className="w-[10%] text-center">LastName</TableHead>
                <TableHead className="w-[10%] text-center">Gender</TableHead>
                <TableHead className="w-[10%] text-center">UserType</TableHead>

                <TableHead className="w-[10%] text-center">Email</TableHead>
                <TableHead className="w-[10%] text-center">Phone</TableHead>

                <TableHead className="w-[10%] text-center">Address</TableHead>
                <TableHead className="w-[10%] text-center">District</TableHead>
                <TableHead className="w-[10%] text-center">Province</TableHead>
                <TableHead className="w-[10%] text-center">Postcode</TableHead>

                <TableHead className="w-[5%] text-center">Edit</TableHead>
                <TableHead className="w-[5%] text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
