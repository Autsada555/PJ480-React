import { useEffect, useState } from "react";
import Navbar from "../customer/navbar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { OrderCheckPayment } from "@/interfaces";
import { GetAllOrder } from "@/services/https/Order";
import dayjs from "dayjs";
import { ImageViewer } from "@/components/ui/ImageViewer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ReceiveOrder() {
    const [order, setOrder] = useState<OrderCheckPayment[]>([]);

    async function fetchOrder() {
        try {
            const res = await GetAllOrder();
            if (res) {
                setOrder(res);
                console.log(res);
            } else {
                console.error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    }
    useEffect(() => {
        fetchOrder();
    }, []);

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
                    <button className="w-full bg-gray-200 py-4 rounded hover:bg-gray-400">
                        <a href="receiveorder" className="block text-center">รับรายการสั่งสินค้า</a>
                    </button>
                </div>

                <div className="flex-1 p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-2xl font-bold">
                            รับรายการสั่งสินค้า
                        </h1>
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="border border-gray-300 w-full bg-gray-200">
                            {/* <TableCaption>A list of your payment.</TableCaption> */}
                            <TableHeader>
                                <TableRow className="border border-black">
                                    <TableHead className="w-[10%] text-center text-black">รายการ</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">วันที่จัดส่ง</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">ชื่อผู้สั่งซื้อ</TableHead>
                                    <TableHead className="w-[20%] text-center text-black">สถานที่รับสินค้า</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">สลิปจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">การจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">เช็คการจ่ายเงิน</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="">
                                {Array.isArray(order) && order.length > 0 ? (
                                    order.map((order) => (
                                        <TableRow key={order.ID}>
                                            <TableCell className=" text-center border border-black">
                                                {order.ID || `customer ${order.ID}`}
                                            </TableCell>
                                            <TableCell className=" text-center border border-black">
                                                {order.DateDelivery ? dayjs(order.DateDelivery).format("DD/MM/YYYY") : "N/A"}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                {order.User.UserName}
                                            </TableCell>
                                            <TableCell className="text-center whitespace-pre border border-black">
                                                {order.Delivery}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                <ImageViewer imageSrc={order.Eslip} />
                                            </TableCell>
                                            <TableCell className="text-center hidden md:table-cell border border-black">
                                                {order.StatusOrderType.Name}
                                            </TableCell>
                                            <TableCell className="justify-center flex">
                                                <Select>
                                                    <SelectTrigger className="w-[180px] border-green-500">
                                                        <SelectValue placeholder="สถานะ" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">จ่ายเงินเรียบร้อย</SelectItem>
                                                        <SelectItem value="dark">รอการเช็ค</SelectItem>
                                                        <SelectItem value="system">ยกเลิก</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={12} className="text-center">
                                            ไม่มีรายการที่สั่งซื้อ
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

    )
}