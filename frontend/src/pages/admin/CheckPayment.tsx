import Navbar from "../customer/navbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function CheckPayment() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row mt-[90px] space-y-5 md:space-y-0 md:space-x-4">
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
                    <div className="text-black text-2xl mb-5">
                        <h1 className="text-2xl font-bold">
                            Check Payment
                        </h1>
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="border border-gray-300 w-full bg-gray-200">
                            <TableCaption>A list of your payment.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center text-black">รายการ</TableHead>
                                    <TableHead className="text-center text-black">สลิปจ่ายเงิน</TableHead>
                                    <TableHead className="text-center text-black">เช็คการจ่ายเงิน</TableHead>
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