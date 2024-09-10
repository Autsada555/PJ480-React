import Navbar from "./navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Qrcode from "@/assets/Qrcode.jpg";

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
export function Payment() {
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
        <div className="flex items-center space-x-2 left-[270px] top-[165px] absolute">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
          >
            รับสินค้าทีหน้าร้าน
          </label>
        </div>
        <div className="flex items-center space-x-2 left-[270px] top-[195px] absolute">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
          >
            จัดส่งสินค้าตามที่อยู่
          </label>
        </div>
        <Form>
          <div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[245px] absolute">
              <Label
                htmlFor="address"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Address (ที่อยู่)
              </Label>
              <Input
                type="text"
                id="address"
                //   value={formData.address}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[850px] top-[245px] absolute">
              <Label
                htmlFor="district"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                District (อำเภอ)
              </Label>
              <Input
                type="text"
                id="district"
                //   value={formData.district}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[320px] absolute">
              <Label
                htmlFor="province"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Province (จังหวัด)
              </Label>
              <Input
                type="text"
                id="province"
                //   value={formData.province}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[850px] top-[320px] absolute">
              <Label
                htmlFor="postcode"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Postcode (รหัสไปรษณีย์)
              </Label>
              <Input
                type="text"
                id="postcode"
                //   value={formData.postcode}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[395px] absolute">
              <Label
                htmlFor="phone"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Phone (เบอร์โทร)
              </Label>
              <Input
                type="text"
                id="phone"
                //   value={formData.phone}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 left-[270px] top-[510px] absolute">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
              >
                ชำระด้วยเงินสด
              </label>
            </div>
            <div className="flex items-center space-x-2 left-[270px] top-[540px] absolute">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Checkbox id="terms" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to pay by transfer?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="text-[17px] font-['Inter']">
                      คุณสามารถชำระเงินผ่านช่องทางนี้และทำการบันทึกสลีปการโอนเงินเพื่อใช้เป็นหลักฐานด้วยนะคะ </div> <br></br>                    
                        <img
                          src={Qrcode}
                          alt="qrcode"
                          // className="w-[200px] h-[200px]"
                        />
                        <div className="  ml-[150px]">
                         ชื่อบัญชี : DS-Delighth<br></br>
                         ธนาคาร : ไทยพานิชย์ (SCB)<br></br>
                         เลขที่บัญชี : 123-456-7890
                         </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <label
                htmlFor="terms"
                className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
              >
                ชำระด้วยการโอน (Mobile Banking)
              </label>
            </div>

            <div className="left-[580px] top-[600px] absolute ">
              <Button
                variant="outline"
                className="bg-red-600 w-[160px] text-white"
              >
                Cancel{" "}
              </Button>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="left-[800px] top-[600px] absolute bg-green-600 text-white"
                >
                  Confirm Transaction
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to confirm the transaction?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>            
          </div>
        </Form>
      </div>
    </div>
  );
}