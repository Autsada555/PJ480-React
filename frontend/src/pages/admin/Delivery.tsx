import Navbar from "./navbar";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDollarSign } from "lucide-react";
import DSLOGO from "@/assets/DS-Logo.png";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
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

export function Delivery() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div>
      <Navbar />
      <div>
        <div className="absolute text-black text-[16px] font-bold font-['Inter'] left-[715px] top-[300px]">
          Confirm payment
        </div>
        <img
          src={DSLOGO}
          alt="dslogo"
          className="w-[220px] h-[220px]  ml-[665px] mt-[-20px]"
        />
        <div>
          <div className="w-[400px] h-[440px] bg-slate-100 mt-[-50px] ml-[585px] rounded-xl  border-[2px]"></div>
        </div>
        <div>
          <CircleDollarSign className="left-[760px] top-[250px] absolute w-[50px] h-[50px]" />
        </div>
        <Form>
          <div className=" w-full max-w-sm flex-col gap-1 left-[645px] top-[360px] absolute">
            <Label
              htmlFor="date"
              className="text-[14px] left-[3px] top-[-18px] font-['Inter'] font-Bold absolute"
            >
              วันที่จัดส่งสินค้า <span className="text-red-500 ">*</span>
            </Label>
          </div>
          <div className="mt-[-300px] ml-[-25px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal ",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label
              htmlFor="employee"
              className="text-[14px] left-[-95px] top-[423px] font-['Inter'] absolute w-full"
            >
              ชื่อพนักงานจัดส่ง <span className="text-red-500 ">*</span>
            </Label>
            <Select>
              <SelectTrigger className="w-[278px] left-[648px] top-[445px] h-[40px] font-['Inter'] absolute">
                <SelectValue placeholder="Choose employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="female">Jonh</SelectItem>
                  <SelectItem value="male">Smile</SelectItem>
                  <SelectItem value="others">Somsuk</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="left-[648px] top-[527px] absolute w-[278px]">
              <Label className="text-[14px]  top-[-23px] left-[4px] absolute ">
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
            <div className="left-[693px] top-[600px] absolute ">
              <Button
                variant="outline"
                className="bg-red-600 w-[80px] h-[30px] text-white"
              >
                Cancel{" "}
              </Button>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="left-[800px] top-[600px] w-[80px] h-[30px] absolute bg-green-600 text-white"
                >
                  Confirm 
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
        </Form>
      </div>
    </div>
  );
}
