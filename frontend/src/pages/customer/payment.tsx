import Navbar from "./navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function Payment() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="left-[226px] top-[95px] absolute text-black text-xl font-bold font-['Inter']">
          Delivery
        </div>
        <div className="left-[226px] top-[430px] absolute text-black text-xl font-bold font-['Inter']">
          Payment
        </div>
        <div className="flex items-center space-x-2 left-[270px] top-[145px] absolute">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
          >
            รับสินค้าทีหน้าร้าน
          </label>
        </div>
        <div className="flex items-center space-x-2 left-[270px] top-[175px] absolute">
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
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[230px] absolute">
              <Label
                htmlFor="address"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Address
              </Label>
              <Input
                type="text"
                id="address"
                //   value={formData.address}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[850px] top-[230px] absolute">
              <Label
                htmlFor="district"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                District
              </Label>
              <Input
                type="text"
                id="district"
                //   value={formData.district}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[300px] absolute">
              <Label
                htmlFor="province"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Province
              </Label>
              <Input
                type="text"
                id="province"
                //   value={formData.province}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[850px] top-[300px] absolute">
              <Label
                htmlFor="postcast"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Postcast
              </Label>
              <Input
                type="text"
                id="postcast"
                //   value={formData.postcast}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[370px] absolute">
              <Label
                htmlFor="phone"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                Phone
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
            <div className="flex items-center space-x-2 left-[270px] top-[480px] absolute">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
              >
                ชำระด้วยเงินสด
              </label>
            </div>
            <div className="flex items-center space-x-2 left-[270px] top-[510px] absolute">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-[17px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-['Inter']"
              >
                ชำระด้วยการโอน (Mobile Banking)
              </label>
            </div>
            <div className=" w-full max-w-sm flex-col gap-1 left-[350px] top-[560px] absolute">
              <Label
                htmlFor="count"
                className="text-[16px] left-[3px] top-[-16px] absolute"
              >
                จำนวนเงินโอน <span className="text-red-500 ">*</span>
              </Label>
              <Input
                type="text"
                id="count"
                //   value={formData.count}
                //   onChange={handleChange}
                className="text-[16px] mt-2 w-full h-9"
              />
            </div>
            <Label className="left-[800px] top-[540px] absolute text-[16px]">ช่องทางการโอน <span className="text-red-500 ">*</span></Label>
            <Select>
              <SelectTrigger className="w-[400px] left-[800px] top-[565px] absolute">
                <SelectValue placeholder="โปรดเลือกช่องทางการโอน" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ช่องทางการโอน</SelectLabel>
                  <SelectItem value="khungthai">ธนาคารกรุงไทย</SelectItem>
                  <SelectItem value="scb">ธนาคารไทยพานิชย์ (SCB)</SelectItem>
                  <SelectItem value="k">ธนาคารกสิกรไทย</SelectItem>
                  <SelectItem value="khungthep">ธนาคารกรุงเทพ</SelectItem>
                  <SelectItem value="o">ธนาคารออมสิน</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="left-[800px] top-[640px] absolute w-[400px]"> 
                <Label className="text-[16px]  top-[-25px] left-[4px] absolute ">
                      สลีปการโอนเงิน <span className="text-red-500 ">*</span>
                </Label>
                    <Input
                    //   useForm={form}
                      type="file"
                      name="Image"
                      accept="image/*"
                      className="col-span-3 font-extralight"
                      placeholder="image"
                    />
            </div>
                <div classname ="left-[900px] top-[940px] absolute w-[400px]">
                    <Button>Confirm Transaction</Button>
                </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
