import Navbar from "../customer/navbar";
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
      <div className="mt-[95px] flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4">
        <div className="bg-gray-300 w-full md:w-[250px] h-fit md:h-[800px] p-4 space-y-4">
          <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
            <a href="management" className="block text-center">จัดการเมนู</a>
          </button>
          <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
            <a href="checkpayment" className="block text-center">เช็คการจ่ายเงิน</a>
          </button>
          <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
            <a href="listuser" className="block text-center">รายชื่อผู้ใช้งาน</a>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">User List</h1>
            <div>
                <EmployeeCreateDialog onCreated={fetchEmployee} />
            </div>
          </div>


          <div className="overflow-x-auto">
            <Table className="border border-gray-300 w-full bg-gray-200">
              <TableCaption>A list of User.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10%] text-center">ชื่อ</TableHead>
                  <TableHead className="w-[10%] text-center">นามสกุล</TableHead>
                  <TableHead className="w-[10%] text-center">เพศ</TableHead>
                  <TableHead className="w-[10%] text-center">ประเภทของอาหาร</TableHead>
                  <TableHead className="w-[10%] text-center">อีเมล</TableHead>
                  <TableHead className="w-[10%] text-center">เบอร์โทรศัพท์</TableHead>
                  <TableHead className="w-[10%] text-center">ที่อยู่</TableHead>
                  <TableHead className="w-[5%] text-center">แก้ไข</TableHead>
                  <TableHead className="w-[5%] text-center">ลบ</TableHead>
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
                      <TableCell className="text-center">
                        {customer.Gender?.Name}
                      </TableCell>
                      <TableCell className="text-center">
                        {customer.UserType?.Name}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        {customer.Email}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        {customer.Phone}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        {customer.Address}
                      </TableCell>
                      <TableCell className="relative text-center">
                        <EmployeeEdit
                          customers={customer}
                          onSave={fetchCustomer}
                        />
                      </TableCell>
                      <TableCell className="relative text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <XSquare className="text-red-500 hover:scale-110 cursor-pointer" />
                          </AlertDialogTrigger>
                          <EmployeeAlert
                            customerID={customer.ID}
                            onCancel={fetchCustomer}
                          />
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
    </div>

  );
}
