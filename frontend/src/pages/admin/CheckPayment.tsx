import { useEffect, useState } from "react";
import Navbar from "../customer/navbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { OrderCheckPayment } from "@/interfaces";
import { GetAllOrder } from "@/services/https/Order";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { SquareCheck, XSquare } from "lucide-react";
import dayjs from "dayjs";
import { ImageViewer } from "@/components/ui/ImageViewer";

export function CheckPayment() {
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
                </div>

                <div className="flex-1 p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-2xl font-bold">
                            เช็คการจ่ายเงิน
                        </h1>
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="border border-gray-300 w-full bg-gray-200">
                            {/* <TableCaption>A list of your payment.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[10%] text-center text-black">รายการ</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">วันที่จัดส่ง</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">ชื่อผู้สั่งซื้อ</TableHead>
                                    <TableHead className="w-[20%] text-center text-black">สถานที่รับสินค้า</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">สลิปจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">การจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">เช็คการจ่ายเงิน</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.isArray(order) && order.length > 0 ? (
                                    order.map((order) => (
                                        <TableRow key={order.ID}>
                                            <TableCell className=" text-center">
                                                {order.ID || `customer ${order.ID}`}
                                            </TableCell>
                                            <TableCell className=" text-center">
                                                {order.DateDelivery ? dayjs(order.DateDelivery).format("DD/MM/YYYY") : "N/A"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {order.User.UserName}
                                            </TableCell>
                                            <TableCell className="text-center whitespace-pre">
                                                {order.Delivery}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <ImageViewer imageSrc={order.Eslip} />
                                            </TableCell>
                                            <TableCell className="text-center hidden md:table-cell">
                                                {order.StatusType.Name}
                                            </TableCell>
                                            <TableCell className="h-full border-2 border-black">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <SquareCheck className="text-green-500 hover:scale-110 cursor-pointer " />
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>คุณต้องการยกเลิกการสั่งซื้อนี้ใช่หรือไม่?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                หากมีการยกเลิกการสั่งที่จ่ายเงินแล้ว ทางร้านจะโอนเงินกลับตามเลขบัญชีของลูกค้า
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-red-600" >ยืนยัน</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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