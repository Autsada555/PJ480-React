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
import { OrderCheckPayment, StatusOrderType, StatusPaymentType } from "@/interfaces";
import { DeliveryOrder, GetAllOrder, ReceiveOrder } from "@/services/https/Order";
import dayjs from "dayjs";
import { ImageViewer } from "@/components/ui/ImageViewer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CheckPaymentTypeID, GetStatusOrder, GetStatusPayment } from "@/services/https/Payment";
import { toast, ToastContainer } from "react-toastify";
import { Bag, CheckCircle, Package, Receipt, TrolleySuitcase, Truck } from "@phosphor-icons/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export function CheckPayment() {
    const [order, setOrder] = useState<OrderCheckPayment[]>([]);
    const [statuspayment, setStatuspayment] = useState<StatusPaymentType[]>([]);
    const [statusorder, setStatusorder] = useState<StatusOrderType[]>([]);


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

    async function fetchStatusPay() {
        try {
            const res = await GetStatusPayment();
            if (res) {
                setStatuspayment(res);
                console.log(res);
            } else {
                console.error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    }

    async function fetchStatusOrder() {
        try {
            const res = await GetStatusOrder();
            if (res) {
                setStatusorder(res);
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
        fetchStatusPay();
        fetchStatusOrder();
    }, []);

    const checkPayment = async (id: number, status_payment_type_id: number) => {
        try {
            const res = await CheckPaymentTypeID(id, status_payment_type_id);
            if (res.status) {
                toast.success("เปลี่ยนสถานะสำเร็จ", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(res.message || "เกิดข้อผิดพลาด", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error during order cancellation:", error);
            toast.error("มีบางอย่างผิดพลาด", {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    const checkOrder = async (id: number, status_order_type_id: number) => {
        try {
            const res = await ReceiveOrder(id, status_order_type_id);
            if (res.status) {
                toast.success("เปลี่ยนสถานะสำเร็จ", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(res.message || "เกิดข้อผิดพลาด", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error during order cancellation:", error);
            toast.error("มีบางอย่างผิดพลาด", {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    const deliveryOrder = async (id: number) => {
        try {
            const res = await DeliveryOrder(id);
            if (res.status) {
                toast.success("เตรียมจัดส่งสำเร็จ", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(res.message || "เกิดข้อผิดพลาด", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error during order cancellation:", error);
            toast.error("มีบางอย่างผิดพลาด", {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };
    return (
        <div>
            <Navbar />
            <ToastContainer />
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
                        <a href="delivery" className="block text-center">การจัดส่งสินค้า</a>
                    </button>
                </div>

                <div className="flex-1 p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-2xl font-bold">
                            เช็คการจ่ายเงิน & รับการสั่งซื้อ
                        </h1>
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="border border-gray-300 w-full bg-gray-200">
                            <TableHeader>
                                <TableRow className="border border-black">
                                    <TableHead className="w-[10%] text-center text-black">รายการ</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">วันที่จัดส่ง</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">ชื่อผู้สั่งซื้อ</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">เมนู</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">สถานที่รับสินค้า</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">สลิปจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">การจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">การสั่งซื้อ</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">การจัดส่ง</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">เตรียมจัดส่ง</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">เช็คการจ่ายเงิน</TableHead>
                                    <TableHead className="w-[10%] text-center text-black">เช็คการสั่งซื้อ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="border-collapse border border-black">
                                {Array.isArray(order) && order.length > 0 ? (
                                    order.map((order) => (
                                        <TableRow key={order.ID} className="border border-black">
                                            <TableCell className="text-center border border-black">
                                                {order.ID || `customer ${order.ID}`}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                {order.DateDelivery ? dayjs(order.DateDelivery).format("DD/MM/YYYY") : "N/A"}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                {order.User.UserName}
                                            </TableCell>
                                            <TableCell className="text-center whitespace-pre border border-black">
                                                {order.Menu.map((menu) => menu["Name"]).join("\r\n")}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                {order.Delivery}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                <ImageViewer imageSrc={order.Eslip} />
                                            </TableCell>
                                            <TableCell className="text-center hidden md:table-cell border border-black">
                                                {order.StatusPaymentType.ID === 1 ? (
                                                    <p className="text-yellow-500 flex justify-center"><Receipt size={20} />{order.StatusPaymentType.Name}</p>
                                                ) : order.StatusPaymentType.ID === 2 ? (
                                                    <p className="text-green-500 flex justify-center"><CheckCircle size={20} />{order.StatusPaymentType.Name}</p>
                                                ) : (
                                                    <p className="text-red-500 flex justify-center"><Bag size={20} />{order.StatusPaymentType.Name}</p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                {order.StatusOrderType.ID === 1 ? (
                                                   <p className="text-yellow-500 flex justify-center"><Receipt size={20} />{order.StatusOrderType.Name}</p>
                                                ) : order.StatusOrderType.ID === 2 ? (
                                                    <p className="text-green-500 flex justify-center"><CheckCircle size={20} />{order.StatusOrderType.Name}</p>
                                                ) : (
                                                    <p className="text-red-500 flex justify-center"><Bag size={20} />{order.StatusOrderType.Name}</p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                {order.StatusDeliveryType.ID === 1 ? (
                                                    <p className="text-cyan-700 flex justify-center"><Receipt size={20} />{order.StatusDeliveryType.Name}</p>
                                                ) : order.StatusDeliveryType.ID === 2 ? (
                                                    <p className="text-orange-500 flex justify-center"><TrolleySuitcase size={20} />{order.StatusDeliveryType.Name}</p>
                                                ) : order.StatusDeliveryType.ID === 3 ? (
                                                    <p className="text-lime-500 flex justify-center"><Truck size={20} />{order.StatusDeliveryType.Name}</p>
                                                ) : (
                                                    <p className="text-green-500 flex justify-center"><CheckCircle size={20} />{order.StatusDeliveryType.Name}</p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center border border-black">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        {order.StatusDeliveryType.ID === 2 ? (
                                                            <button
                                                                disabled
                                                                className="mt-1 ml-2 px-3 py-1 text-white bg-orange-500 rounded "
                                                            >
                                                                <Package size={32} />
                                                            </button>
                                                        ) : order.StatusDeliveryType.ID === 3 ? (
                                                            <button
                                                                disabled
                                                                className="mt-1 ml-2 px-3 py-1 text-white bg-lime-500 rounded "
                                                            >
                                                                <Package size={32} />
                                                            </button>
                                                        ) : order.StatusDeliveryType.ID === 4 ? (
                                                            <button
                                                                disabled
                                                                className="mt-1 ml-2 px-3 py-1 text-white bg-green-500 rounded "
                                                            >
                                                                <Package size={32} />
                                                            </button>
                                                        ) : (
                                                            <button className="mt-1 ml-2 px-3 py-1 text-white bg-cyan-700 rounded hover:scale-110 cursor-pointer">
                                                                <Package size={32} />
                                                            </button>
                                                        )}
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                คุณต้องการเตรียมจัดส่งคำสั่งซื้อนี้ใช่หรือไม่?
                                                            </AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className="bg-green-600"
                                                                type="submit"
                                                                onClick={() => deliveryOrder(order.ID)}
                                                            >
                                                                ยืนยัน
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                            <TableCell className="border border-black">
                                                <Select onValueChange={(c) => checkPayment(order.ID, Number(c))}>
                                                    <SelectTrigger className="w-[180px] border-green-500">
                                                        <SelectValue placeholder="สถานะ" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statuspayment.map((statuspayment) => (
                                                            <SelectItem key={statuspayment.ID} value={statuspayment.ID + ""}>
                                                                {statuspayment.Name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="border border-black">
                                                <Select onValueChange={(c) => checkOrder(order.ID, Number(c))}>
                                                    <SelectTrigger className="w-[180px] border-green-500">
                                                        <SelectValue placeholder="สถานะ" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusorder.map((statusorder) => (
                                                            <SelectItem key={statusorder.ID} value={statusorder.ID + ""}>
                                                                {statusorder.Name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={12} className="text-center border border-black">
                                            ไม่มีรายการที่สั่งซื้อ
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table >
                    </div >
                </div >
            </div >
        </div >

    )
}