import { useToast } from "@/components/ui/use-toast"
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
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";


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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    loginUser(values)
  }
  function onSignUp() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(123)
  }

  const { toast } = useToast()
  const loginUser = async (values: z.infer<typeof formSchema>) => {
    let res = await LoginUser({ ...values });
    if (res.status) {
      toast({
        description: "Login successful",
      })
      console.log(res.message);
      localStorage.setItem("token", res.message);
      localStorage.setItem("id", res.message.User.UserType);
      setTimeout(() => {
        if (res.message.UserType.Name === 'customer') {
          navigate("/", { replace: true });
        }
        else if (res.message.UserType.Name === 'admin') {
          navigate("/addmenu", { replace: true });
        }
        else if (res.message.UserType.Name === 'delivery') {
          navigate("/delivery", { replace: true });
        }
        else if (res.message.UserType.Name === 'cash') {
          navigate("/", { replace: true });
        }
        else {
          navigate("/login", { replace: true });
        }

      }, 1500)
    } else {
      toast({
        description: res.message,
      })

    }
  };
  return (
    <div>
      <Toaster />

      <div className="  relative h-screen ">
        <div className="bg-[#01BD63] h-14"></div>
        <div className="absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2  h-fit w-96  ">
          <div className=" text-black text-xl font-bold font-['Inter'] left-[705px] top-[130px]">
            Welcome to ...
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
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input placeholder="username or email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="h-8  w-full  mt-4 bg-[#01BD63] hover:bg-[#01BD63] " type="submit">Login</Button>
              </form>
              <Button className="h-8  w-full  mt-4 bg-[#00301E] hover:bg-[#00301E] " onClick={onSignUp}>Sign up</Button>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
