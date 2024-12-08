import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Navbar from "../customer/navbar";
import { Plus } from "@phosphor-icons/react";


export function Management() {
    return (
        <div>
        <Navbar />
        <div className="flex flex-col md:flex-row mt-[90px] space-y-5 md:space-y-0">
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
      
          <div className="flex-1 p-5">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-2xl font-bold">Management Menu</h1>
              <button className="p-2 bg-green-500 rounded-full hover:bg-green-700">
                <Plus size={24} color="white" />
              </button>
            </div>
      
            <div className="overflow-x-auto">
              <Table className="border border-gray-300 w-full bg-gray-100">
                <TableCaption>A list of your menu.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center text-black">เมนูที่</TableHead>
                    <TableHead className="text-center text-black">รูปภาพอาหาร</TableHead>
                    <TableHead className="text-center text-black">ชื่อเมนู</TableHead>
                    <TableHead className="text-center text-black">ราคา</TableHead>
                    <TableHead className="text-center text-black">คำอธิบายอาหาร</TableHead>
                    <TableHead className="text-center hidden md:table-cell text-black">วัตถุดิบ</TableHead>
                    <TableHead className="text-center hidden md:table-cell text-black">ประเภทของอาหาร</TableHead>
                    <TableHead className="text-center text-black">แก้ไขหรือลบ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      
    )
}