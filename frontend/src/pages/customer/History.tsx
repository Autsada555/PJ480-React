import { OrderHistory } from "@/interfaces";
import Navbar from "./navbar";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CancelOrder, GetOrderByID } from "@/services/https/Order";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast, ToastContainer } from "react-toastify";


export function History() {
  const [order, setOrder] = useState<OrderHistory[]>([]);
  const [userid] = useState(Number(localStorage.getItem("userid")));

  async function fetchCustomer() {
    try {
      const res = await GetOrderByID(userid);
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
    fetchCustomer();
  }, []);

  const cancelOrder = async (id: number) => {
    try {
      const res = await CancelOrder(id);
      if (res.status) {
        toast.success("ยกเลิกสำเร็จ", {
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
      <div className="mt-[90px]">
        <div className="left-[176px] top-[125px] absolute text-black text-2xl font-bold font-['Inter']">
          ประวัติการสั่งซื้อ
        </div>
        <div>
          <Table className=" border-double border-4 border-gray-300 mt-[100px] w-[1200px] ml-[175px] bg-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%] text-center text-black">
                  รายการที่
                </TableHead>
                <TableHead className="w-[10%] text-center text-black">
                  วันที่จัดส่ง
                </TableHead>
                <TableHead className="w-[10%] text-center text-black">
                  จำนวนทั้งหมด
                </TableHead>
                <TableHead className="w-[14%] text-center text-black">
                  เมนู
                </TableHead>
                <TableHead className="w-[12%] text-center text-black">
                  ราคาที่ต้องจ่าย
                </TableHead>
                <TableHead className="w-[14%] text-center text-black">
                  สถานที่รับสินค้า
                </TableHead>
                <TableHead className="w-[14%] text-center hidden md:table-cell text-black">
                  สถานะการสั่งซื้อ
                </TableHead>
                <TableHead className="w-[18%] text-center hidden md:table-cell text-black">
                  สถานะการชำระเงิน
                </TableHead>
                <TableHead className="w-[15%] text-center text-black">
                  ยกเลิกการสั่งซื้อ
                </TableHead>
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
                      {`${order.Quantity} ชิ้น`}
                    </TableCell>
                    <TableCell className="text-center whitespace-pre">
                      {order.Menu.map(menu => { return menu["Name"] }).join("\r\n")}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.TotalAmount}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {order.Delivery}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {order.StatusOrderType.ID === 1 ? <p className="text-yellow-500">{order.StatusOrderType.Name}</p> :
                        order.StatusOrderType.ID === 2 ? <p className="text-green-500">{order.StatusOrderType.Name}</p> :
                          <p className="text-red-500">{order.StatusOrderType.Name}</p>}

                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {order.StatusPaymentType.ID === 1 ? <p className="text-yellow-500">{order.StatusPaymentType.Name}</p> :
                        order.StatusPaymentType.ID === 2 ? <p className="text-green-500">{order.StatusPaymentType.Name}</p> :
                          <p className="text-red-500">{order.StatusPaymentType.Name}</p>}
                    </TableCell>
                    <TableCell className="justify-center flex">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="mt-1 ml-2 px-3 py-1 text-white bg-red-500 rounded hover:scale-110 cursor-pointer">ยกเลิก</button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>คุณต้องการยกเลิกการสั่งซื้อนี้ใช่หรือไม่?</AlertDialogTitle>
                            <AlertDialogDescription>
                              หากมีการยกเลิกการสั่งที่ชำระเงินแล้ว ทางร้านจะโอนเงินกลับตามเลขบัญชีของลูกค้า
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600"
                              type="submit"
                              onClick={() => cancelOrder(order.ID)}
                            >
                              ยืนยัน
                            </AlertDialogAction>
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
  );
}
