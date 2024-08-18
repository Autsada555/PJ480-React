import Navbar from "./navbar";
import EmployeeAlert from "@/components/ui/EmployeeAlert";
import EmployeeCreateDialog from "@/components/ui/EmployeeCreateDialog";
import EmployeeEdit from "@/components/ui/EmployeeEdit";
import { useEffect, useState } from "react";
import { XSquare } from "lucide-react";
import { User } from "../../interfaces";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GetAllCustomer } from "../../services/https/Customer";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ListUser() {
  const [customer, setCustomer] = useState<User[]>([]);
  async function fetchCustomer() {
    try {
      const res = await GetAllCustomer();
      if (res) {
        setCustomer(res);
        console.log(res);
      } else {
        console.error('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  }
  useEffect(() => {
    fetchCustomer();
  }, []);

  function fetchEmployee(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className=" ml-[135px] mt-[25px] absolute text-black text-2xl font-bold font-['Inter']">
          A list of User
        </div>
        <div>
          <EmployeeCreateDialog onCreated={fetchEmployee} />
          <Table className=" border-double border-4 border-gray-300 mt-[40px] w-[1300px] ml-[135px] bg-gray-200">
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
            <TableBody>
              {Array.isArray(customer) && customer.length > 0 ? (
                customer.map((customer) => (
                  <TableRow key={customer.ID}>
                    <TableCell className="font-medium text-center">
                      {customer.FirstName || `customer ${customer.ID}`}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {customer.LastName || `customer ${customer.ID}`}
                    </TableCell>
                    <TableCell className=" text-center">
                      {customer.Gender?.Name}
                    </TableCell>
                    <TableCell className=" text-center">
                      {customer.UserTypeID}
                    </TableCell>
                    <TableCell className=" text-center hidden md:table-cell">
                      {customer.Email}
                    </TableCell>
                    <TableCell className=" text-center hidden md:table-cell">
                      {customer.Phone}
                    </TableCell>
                    <TableCell className=" text-center hidden md:table-cell">
                      {customer.Address}
                    </TableCell>
                    <TableCell className=" text-center hidden md:table-cell">
                      {customer.District}
                    </TableCell>
                    <TableCell className=" text-center hidden md:table-cell">
                      {customer.Province}
                    </TableCell>
                    <TableCell className=" text-center hidden md:table-cell">
                      {customer.Postcode}
                    </TableCell>
                    <TableCell className=" relative">
                      <EmployeeEdit
                        customers={customer}
                        onSave={fetchCustomer}
                      ></EmployeeEdit>
                    </TableCell>
                    <TableCell className=" relative">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <XSquare className="text-red-500 abs-center hover:scale-110 cursor-pointer" />
                        </AlertDialogTrigger>
                        <EmployeeAlert
                          customerID={customer.ID}
                          onCancel={fetchCustomer}
                        ></EmployeeAlert>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
