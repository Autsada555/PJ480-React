import { useState, useEffect, useContext } from "react";
import Navbar from "./navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import Qrcode from "@/assets/Qrcode.jpg";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentFormSchema, PaymentFormData } from "@/validator";
import { GetCustomerByID } from "../../services/https/Customer";
import { CartContext } from "@/components/ui/cartContext";
import { toast, ToastContainer } from "react-toastify";
import WarningBanner from "@/components/ui/warning";
import { CreateOrder } from "@/services/https/Order";
import { MenuInterface, Order, UserID } from "@/interfaces";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "@/components/ui/uploadimage";

export function Payment(): JSX.Element {
  const [customer, setCustomer] = useState<UserID | null>(null);
  const [userid] = useState(Number(localStorage.getItem("userid")));
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const [images, setImages] = useState<string>("");
  const { getMenus, getQuantity, getTotal } = useContext(CartContext);
  const [formData, setFormData] = useState({
    // id: NumberConstructor,
    quantity: 0,
    totalamount: 0,
    datedelivery: new Date(),
    eslip: '',
    delivery: '',
    menu: [] as MenuInterface[],
    statusordertypeid: 1,
    statuspaymenttypeid: 1,
    statusdeliverytypeid: 1,
    userid: 0,
    user: ''
  });


  const { register, reset } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await GetCustomerByID(userid);
        if (res) {
          setCustomer(res);
          reset({ Address: res.Address });
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    }

    fetchCustomer();
  }, [reset]);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const customerData: Order = {
        Quantity: getQuantity(),
        TotalAmount: getTotal(),
        DateDelivery: date!,
        Eslip: images,
        Delivery: formData.delivery,
        Menu: getMenus(),
        StatusOrderTypeID: formData.statusordertypeid,
        StatusPaymentTypeID: formData.statuspaymenttypeid,
        StatusDeliveryTypeID: formData.statusdeliverytypeid,
        UserID: userid,
      };
      console.log("Submitted data:", customerData);

      const res = await CreateOrder(customerData);
      console.log("Customer creation response:", res);

      if (res.status) {
        toast.success("บันทึกเรียบร้อย", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/customer", { replace: true });

        }, 3000);
      }

      else {
        toast.error(`มีบางอย่างผิดพลาด: ${res.message}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during customer creation:", error);
      toast.error("มีบางอย่างผิดพลาด", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const [selectedOption, setSelectedOption] = useState<"store-pickup" | "home-delivery" | null>(null);

  const handleOptionChange = (option: "store-pickup" | "home-delivery") => {
    setSelectedOption((prev) => (prev === option ? null : option)); // Toggle selection
    console.log("123212");
  };

  return (
    <div className=" w-svw">
      <Navbar />
      <ToastContainer />
      <div className="mt-[100px]">
        <div>
          <WarningBanner message={"กรุณาสั่งอาหารก่อน 1 วัน เนื่องจากทางร้านจะต้องเตรียมวัตถุดิบ"} />
        </div>
        <form className="flex flex-col items-center" onSubmit={onSubmit}>
          <h2 className="ml-[-510px] text-xl font-semibold">Delivery</h2>
          <div className="flex">
            <div className="mt-5">
              <div>
                <div className="flex">
                  <Checkbox
                    id="store-pickup"
                    checked={selectedOption === "store-pickup"}
                    onCheckedChange={() => handleOptionChange("store-pickup")}
                    name="delivery"
                    onClick={() => setFormData((value) => {
                      value.delivery = "รับสินค้าทีหน้าร้าน"
                      return value
                    })}
                  />
                  <Label htmlFor="store-pickup">รับสินค้าทีหน้าร้าน</Label>
                </div>
                <div className="flex mt-3">
                  <Checkbox
                    id="home-delivery"
                    checked={selectedOption === "home-delivery"}
                    onCheckedChange={() => handleOptionChange("home-delivery")}
                    name="delivery"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        delivery: (document.getElementById("address") as HTMLTextAreaElement)?.value || "",
                      }))
                    }
                  />
                  <Label htmlFor="home-delivery">จัดส่งสินค้าตามที่อยู่</Label>
                </div>
              </div>
              <div className="mt-5">
                <Label htmlFor="address">Address (ที่อยู่)</Label>
                <Textarea
                  id="address"
                  {...register("Address")}
                  className="mt-1 w-[300px]"
                />
              </div>
            </div>
            <div>
              <Label>Date</Label>
              <div className="mt-2">
                <div
                  className={cn(
                    "w-[280px] md:w-auto justify-center font-normal  border rounded-2xl",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className=" ml-[125px]" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mt-2"
                  disabled={(day) => day < new Date()} 
                />
              </div>
            </div>
          </div>

          <h2 className="ml-[-510px] text-xl font-semibold">Payment</h2>
          <div className="flex ">
              <div className="ml-[-70px] mt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Checkbox
                      id="bank-transfer"
                    />
                  </AlertDialogTrigger>
                  <Label htmlFor="bank-transfer">โอนเงินผ่านธนาคาร</Label>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bank Transfer</AlertDialogTitle>
                      <AlertDialogDescription>
                        คุณสามารถชำระเงินผ่านช่องทางนี้และทำการบันทึกสลิปการโอนเงินเพื่อใช้เป็นหลักฐาน
                      </AlertDialogDescription>
                      <img src={Qrcode} alt="QR code" className="w-full mt-4" />
                      <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction>ตกลง</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

            <div className="ml-[250px]">
              <Label htmlFor="upload-image">อัพโหลดใบเสร็จจ่ายเงิน</Label>
              <ImageUpload setData={setImages}/>
            </div>

          </div>

          <div>
            <Button type="submit" className="w-full mt-5 md:w-auto">
              บันทึกการสั่งซื้อ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
