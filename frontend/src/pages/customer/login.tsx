import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CircleUserRound } from 'lucide-react';
import DSLOGO from '@/assets/DS-Logo.png';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginUser } from "../../services/https/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast,ToastContainer } from "react-toastify";


const formSchema = z.object({
  EmailOrUsername: z.string(),
  password: z.string().min(0, { message: "6" }).max(50),
})

export function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      EmailOrUsername: "",
      password: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values)
  }
  function onRegister() {
    navigate("/register", { replace: true });
  }

  const loginUser = async (values: z.infer<typeof formSchema>) => {
    let res = await LoginUser({ ...values });
    console.log(res);
    try {
    if (res.status) {
      toast.success("เข้าสู่ระบบสำเร็จ", {
        position: "bottom-right",
        autoClose: 3000,
      })
      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.usertypeid);
      localStorage.setItem("userid", res.userid);
      localStorage.setItem("usertype", res.usertype);
      setTimeout(() => {
        if (res.usertypeid === 100) {
          navigate("/home", { replace: true });
        }
        else if (res.usertypeid === 200) {
          navigate("/addmenu", { replace: true });
        }
        else if (res.usertypeid === 202) {
          navigate("/delivery", { replace: true });
        }
        else if (res.usertypeid === 201) {
          navigate("/cash", { replace: true });
        }
        else {
          navigate("/", { replace: true });
        }

      }, 3000)
    } else {
      toast.error("อีเมลหรือชื่อผู้ใช้หรือรหัสผิดพลาด", {
        position: "bottom-right",
        autoClose: 3000,
      })
    }
  } catch (error) {
    console.error("Error during customer creation:", error);
    toast.error("มีบางอย่างผิดพลาด", {
      autoClose: 3000,
    });
  }

  };

const [isPasswordVisible, setIsPasswordVisible] = useState(false);

const togglePasswordVisibility = () => {
  setIsPasswordVisible(prevState => !prevState);
};
return (
  <div>
     <ToastContainer />
    <div className="  relative h-screen ">
      <div className="bg-[#01BD63] h-14"></div>
      <div className="absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2  h-fit w-96  ">
        <div className=" text-black text-xl font-bold font-['Inter'] left-[705px] top-[130px]">
          <p>ยินดีต้อนรับสู่</p>
          <p>DISEASE SPACIFIC DELIGHT FOODS</p>
        </div>
        <div className=" flex justify-center h-24 my-2">
          <img src={DSLOGO} alt="dslogo" className="" />

        </div>
        <div className="flex flex-col bg-slate-100 content-center rounded-sm p-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <CircleUserRound className="ml-[50%]  transform -translate-x-1/2  w-[50px] h-[50px]" />
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
              <FormField
                control={form.control}
                name="EmailOrUsername"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>ชื่อผู้ใช้งานหรืออีเมล</FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อผู้ใช้งานหรืออีเมล" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="รหัสผ่าน"
                          {...field}
                          className="w-full pr-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                        >
                          {isPasswordVisible ? "ซ่อน" : "แสดง"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="h-8  w-full  mt-4 bg-[#01BD63] hover:bg-[#47e699] " type="submit">ล็อกอิน</Button>
            </form>
            <Button className="h-8  w-full  mt-4 bg-[#00301E] hover:bg-[#174937]" onClick={onRegister}>สมัครสมาชิก</Button>

          </Form>
        </div>
      </div>
    </div>
  </div>
);
}
