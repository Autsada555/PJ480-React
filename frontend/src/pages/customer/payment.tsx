import Navbar from "./navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Qrcode from "@/assets/Qrcode.jpg";
import { useEffect, useState } from "react";
import { UserID } from "../../interfaces";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { paymentFormSchema, PaymentFormData } from "@/validator";
import { GetCustomerByID } from "../../services/https/Customer";
import { CreatePayment } from "../../services/https/Payment";

export function Payment(): JSX.Element {
  const [customer, setCustomer] = useState<UserID | null>(null);
  const [paymentType, setPaymentType] = useState<string | null>(null);
  const [deliveryType, setDeliveryType] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const userid = localStorage.getItem('userid');
        const res = await GetCustomerByID(Number(userid)); 
        if (res) {
          setCustomer(res);
          reset({
            Phone: res.Phone,
            Address: res.Address,
          });
        } else {
          console.error("Failed to fetch customer:", res.message);
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    }

    fetchCustomer();
  }, [reset]);

  const onSubmit: SubmitHandler<PaymentFormData> = async (formData) => {
    const PaymentFormData = {
      ...formData,
      PaymentType: paymentType,
      DeliveryType: deliveryType,
    };

    if (deliveryType === "Store Pickup") {
      console.log("Store Pickup selected");
      PaymentFormData.Address = "Store Address"; 
    } else if (deliveryType === "Home Delivery") {
      console.log("Home Delivery selected");
    }

    if (paymentType === "Bank Transfer") {
      console.log("Payment by Bank Transfer");
    }

    try {
      const result = await CreatePayment(PaymentFormData);
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="left-[226px] top-[110px] absolute text-black text-xl font-bold font-['Inter']">
          Delivery
        </div>
        <div className="left-[226px] top-[460px] absolute text-black text-xl font-bold font-['Inter']">
          Payment
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2 left-[270px] top-[165px] absolute">
            <Checkbox
              id="store-pickup"
              checked={deliveryType === "Store Pickup"}
              onCheckedChange={(checked) =>
                setDeliveryType(checked ? "Store Pickup" : null)
              }
            />
            <label
              htmlFor="store-pickup"
              className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
            >
              รับสินค้าทีหน้าร้าน
            </label>
          </div>
          <div className="flex items-center space-x-2 left-[270px] top-[195px] absolute">
            <Checkbox
              id="home-delivery"
              checked={deliveryType === "Home Delivery"}
              onCheckedChange={(checked) =>
                setDeliveryType(checked ? "Home Delivery" : null)
              }
            />
            <label
              htmlFor="home-delivery"
              className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
            >
              จัดส่งสินค้าตามที่อยู่
            </label>
          </div>

            <div className="w-full max-w-sm flex-col gap-1 left-[350px] top-[245px] absolute">
              <Label
                htmlFor="address"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Address (ที่อยู่)
              </Label>
              <Textarea 
                id="address"
                {...register("Address")}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
           
          <div className="flex items-center space-x-2 left-[270px] top-[510px] absolute">
            <Checkbox
              id="cash-payment"
              checked={paymentType === "Cash"}
              onCheckedChange={(checked) =>
                setPaymentType(checked ? "Cash" : null)
              }
            />
            <label
              htmlFor="cash-payment"
              className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
            >
              ชำระด้วยเงินสด
            </label>
          </div>
          <div className="flex items-center space-x-2 left-[270px] top-[540px] absolute">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Checkbox
                  id="bank-transfer"
                  checked={paymentType === "Bank Transfer"}
                  onCheckedChange={(checked) =>
                    setPaymentType(checked ? "Bank Transfer" : null)
                  }
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {/* Do you want to pay by transfer? */}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="text-[17px] font-['Inter']">
                      คุณสามารถชำระเงินผ่านช่องทางนี้และทำการบันทึกสลีปการโอนเงินเพื่อใช้เป็นหลักฐานด้วยนะครับ
                    </div>
                  </AlertDialogDescription>
                  <img src={Qrcode} alt="QR code" className="w-full" />
                  <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction>ตกลง</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
            <label
              htmlFor="bank-transfer"
              className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
            >
              โอนเงินผ่านธนาคาร
            </label>
          </div>

          <div className="w-full max-w-sm flex-col gap-1 left-[270px] top-[650px] absolute">
          <Button type="submit">บันทึกการสั่งซื้อ</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
