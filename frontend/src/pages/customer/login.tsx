import Navbar from "./navbar";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from 'lucide-react';
import DSLOGO from '@/assets/DS-Logo.png';


export function Login() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="absolute text-black text-xl font-bold font-['Inter'] left-[705px] top-[130px]">
          Welcome to ...
        </div>
        <img src={DSLOGO} alt="dslogo" className="w-[220px] h-[220px]  ml-[665px] mt-[20px]"/>
        <div>
          <div className="w-[340px] h-[320px] bg-slate-100 mt-[-50px] ml-[610px] rounded-sm  border-[1px]"></div>
        </div>
        <div>
        <CircleUserRound className="left-[760px] top-[280px] absolute w-[50px] h-[50px]"/>
        </div>
        <Form>
          <div className=" w-full max-w-sm flex-col gap-1 left-[670px] top-[360px] absolute">
            <Label
              htmlFor="usernameoremail"
              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] font-Bold absolute"
            >
              Username or Email <span className="text-red-500 ">*</span>
            </Label>
            <Input
              type="text"
              id="usernameoremail"
              //   value={formData.usernameoremail}
              //   onChange={handleChange}
              className="text-[16px] mt-2 w-[220px] h-8"
            />
          </div>
          <div className=" w-full max-w-sm flex-col gap-1 left-[670px] top-[420px] absolute">
            <Label
              htmlFor="usernameoremail"
              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] font-Bold absolute"
            >
              Password <span className="text-red-500 ">*</span>
            </Label>
            <Input
              type="text"
              id="usernameoremail"
              //   value={formData.usernameoremail}
              //   onChange={handleChange}
              className="text-[16px] mt-2 w-[220px] h-8"
            />
          </div>
          <Button
            variant="outline"
            className="left-[735px] top-[490px] absolute bg-green-600 text-white  w-[90px] h-[30px]"
          >
            Login
          </Button>
        </Form>
        <div>
        <div className="absolute text-black text-[10px] font-bold font-['Inter'] left-[705px] top-[560px]">
          You forget the password?
        </div>
        <Button
            variant="outline"
            className="left-[835px] top-[557px] absolute bg-red-600 text-white  text-[8px] w-[10px] h-[10px]"
          >
            Click !
          </Button>
        <div className="absolute text-black text-[10px] font-bold font-['Inter'] left-[705px] top-[595px]">
          If you don't have an account?
        </div>
        <Button
            variant="outline"
            className="left-[850px] top-[592px] absolute bg-gray-600 text-white  text-[8px] w-[14px] h-[10px]"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
