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
import { OrderCheckPayment, StatusDeliveryType} from "@/interfaces";
import { CheckDeliveryOrder, GetAllOrder, GetStatusDelivery  } from "@/services/https/Order";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast, ToastContainer } from "react-toastify";


export function Delivery() {
  const [order, setOrder] = useState<OrderCheckPayment[]>([]);
  const [statusdelivery, setStatusdelivery] = useState<StatusDeliveryType[]>([]);


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

  async function fetchStatusDelivery() {
    try {
      const res = await GetStatusDelivery();
      if (res) {
        setStatusdelivery(res);
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
    fetchStatusDelivery();
  }, []);

  const checkDeliveryOrder = async (id: number, status_delivery_type_id: number) => {
    try {
      const res = await CheckDeliveryOrder(id, status_delivery_type_id);
      console.log(id, status_delivery_type_id)
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
              การจัดส่งสินค้า
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
                  <TableHead className="w-[10%] text-center text-black">การสั่งซื้อ</TableHead>
                  <TableHead className="w-[10%] text-center text-black">การจัดส่ง</TableHead>
                  <TableHead className="w-[10%] text-center text-black">สถานะการจัดส่ง</TableHead>
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
                        {order.Menu.map(menu => { return menu["Name"] }).join("\r\n")}
                      </TableCell>
                      <TableCell className="text-center whitespace-pre border border-black">
                        {order.Delivery}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell border border-black">
                        {order.StatusPaymentType.ID === 1 ? <p className="text-yellow-500">{order.StatusPaymentType.Name}</p> :
                          order.StatusPaymentType.ID === 2 ? <p className="text-green-500">{order.StatusPaymentType.Name}</p> :
                            <p className="text-red-500">{order.StatusPaymentType.Name}</p>}
                      </TableCell>
                      <TableCell className="text-center border border-black">
                        {order.StatusOrderType.ID === 1 ? <p className="text-yellow-500">{order.StatusOrderType.Name}</p> :
                          order.StatusOrderType.ID === 2 ? <p className="text-green-500">{order.StatusOrderType.Name}</p> :
                            <p className="text-red-500">{order.StatusOrderType.Name}</p>}
                      </TableCell>
                      <TableCell className="text-center whitespace-pre border border-black">
                        {/* {order.StatusDeliveryType.Name} */}
                        {order.StatusDeliveryType.ID === 1 ? <p className="text-cyan-700">{order.StatusDeliveryType.Name}</p> :
                          order.StatusDeliveryType.ID === 2 ? <p className="text-orange-500">{order.StatusDeliveryType.Name}</p> :
                            order.StatusDeliveryType.ID === 3 ? <p className="text-lime-500">{order.StatusDeliveryType.Name}</p> :
                              <p className="text-green-500">{order.StatusDeliveryType.Name}</p>}
                      </TableCell>

                      <TableCell className="justify-center ">

                        <Select
                         onValueChange={(c) => checkDeliveryOrder(order.ID, Number(c))}
                        >
                          <SelectTrigger className="w-[180px] border-green-500">
                            <SelectValue placeholder="สถานะ" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusdelivery.map((statusdelivery) => (
                              <SelectItem value={statusdelivery.ID + ""}>{statusdelivery.Name}</SelectItem>
                            ))}
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
            </Table >
          </div >
        </div >
      </div >
    </div >

  )
}