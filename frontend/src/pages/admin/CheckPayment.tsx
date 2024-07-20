import Navbar from "./navbar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function CheckPayment() {
    return (
        <div>
            <Navbar />
            <div className="flex space-x-2">
                <div className="bg-slate-400 h-[800px] w-[250px]">
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="addmenu">Add Menu</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="management">Managment Menu</a></button>
                    <button className="bg-slate-300 h-[80px] w-[250px]"><a href="checkpayment">Check Payment</a></button>
                </div>
                <div className="left-[260px] top-[125px] absolute text-black text-2xl font-bold font-['Inter']">
                    Check Payment
                </div>
                <div>
                    <Table className=" border-double border-4 border-gray-300 mt-[100px] w-[1200px]  bg-gray-200">
                        <TableCaption>A list of your payment.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10%] text-center text-black">PaymentID</TableHead>
                                <TableHead className="w-[80%] text-center text-black">Payment Image</TableHead>
                                <TableHead className="w-[10%] text-center text-black">Confirm</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}