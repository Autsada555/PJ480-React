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
import Navbar from "./navbar"

export function Management() {
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
                    Management Menu
                </div>
                <div>
                    <Table className=" border-double border-4 border-gray-300 mt-[100px] w-[1200px]  bg-gray-200">
                        <TableCaption>A list of your menu.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[12%] text-center text-black">MenuID</TableHead>
                                <TableHead className="w-[20%] text-center text-black">Menu Image</TableHead>
                                <TableHead className="w-[20%] text-center text-black">Menu Name</TableHead>
                                <TableHead className="w-[11%] text-center text-black">Cost</TableHead>
                                <TableHead className="w-[12%] text-center text-black">Description</TableHead>
                                <TableHead className="w-[14%] text-center hidden md:table-cell text-black">Component</TableHead>
                                <TableHead className="w-[14%] text-center hidden md:table-cell text-black">Type spacific</TableHead>
                                <TableHead className="w-[11%] text-center text-black">Edit/Delete</TableHead>
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