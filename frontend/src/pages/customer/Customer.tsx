import Navbar from "./navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Gender, UserID } from "../../interfaces";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";

import {
  GetAllGender,
  GetCustomerByID,
  UpdateCustomer,
} from "../../services/https/Customer";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { LogOutUser } from "@/services/https/login";
import { Textarea } from "@/components/ui/textarea";

export function Customer(): JSX.Element {
  const [gender, setGender] = useState<Gender[]>([]);
  const [customers, setCustomer] = useState<UserID>();
  const [userid] = useState(Number(localStorage.getItem("userid")));
  const navigate = useNavigate();
  const { toast } = useToast()


  useEffect(() => {
    async function fetchGender() {
      try {
        const res = await GetAllGender();
        setGender(res);
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    }

    async function fetchCustomer() {
      try {
        const res = await GetCustomerByID(userid);
        setCustomer(res);
      } catch (error) {
        console.error("Error fetching customer options:", error);
      }
    }

    fetchCustomer();
    fetchGender();
  }, []);

  useEffect(() => {
    if (customers) {
      console.log(customers);
      resetForm1(customers);
    }
  }, [customers]);

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    reset: resetForm1,
    setValue,
  } = useForm({
    defaultValues: customers ?? {},
  });

  const onSubmit = async (data: any) => {
    if (!data) alert("No data!");
    try {
      const res = await UpdateCustomer(data, userid);
      console.log(res);

      alert("อัพเดตข้อมูลเรียบร้อย");
    } catch (error) {
      console.log("Error", error);
    }
  };
  const LogOut = async () => {
    try {
      const res = await LogOutUser(`${window.localStorage.getItem("usertype")}`);
      if (res.status) {
        toast({
          description: "ออกจากระบบเสร็จสิ้น",
        })

        setTimeout(() => {
        }, 1500)
        navigate("/", { replace: true });
      } else {
        toast({
          variant: "destructive",
          description: "ออกจากระบบผิดพลาด",
        })
      }

    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <>
      <Navbar />
      <div >
        <div className="min-h-screen">
          {/* Header */}
          <div className="text-center py-32 mr-[880px]">
            <h1 className="text-xl text-black font-bold mr-16">Overview</h1>
            <h2 className="text-3xl text-black font-bold mt-1">Your Profile</h2>
          </div>

          {/* Profile Section */}
          <div className="flex items-center justify-center mr-[700px] mt-[-120px]">
            <div className="w-[348px] h-[380px] bg-slate-100 rounded-3xl border border-gray-300 shadow-lg relative p-6">
              {/* Avatar */}
              <div className="absolute top-[20px] left-[50%] transform -translate-x-1/2">
                <Avatar className="w-[120px] h-[120px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              {/* Name */}
              <div className="mt-[140px] text-center">
                <p className="text-lg font-semibold text-gray-700">
                  {customers?.FirstName} {customers?.LastName}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col items-center space-y-4">
                {/* History Button */}
                <Button
                  className="w-[160px] text-[17px] text-white bg-slate-500"
                  variant="outline"
                >
                  <Link to="/history">ประวัติคำสั่งซื้อ</Link>
                </Button>

                {/* Logout Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[160px] text-[17px] text-white bg-red-700"
                    >
                      ออกจากระบบ
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>คุณต้องการออกจากระบบใช่หรือไม่?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600" onClick={LogOut}>
                        ยืนยัน
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs
            defaultValue="account"
            className=" w-[500px] ml-[1040px] mt-[-710px] "
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">บัญชีผู้ใช้</TabsTrigger>
              <TabsTrigger value="address">ที่อยู่</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>รายละเอียดบัญชีผู้ใช้</CardTitle>
                  <CardDescription>
                    สามารถเปลี่ยนข้อมูลของคุณได้ที่นี่
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form
                    onSubmit={handleSubmitForm1(onSubmit)}
                  // className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
                  >
                    <div className="flex items-center space-y-3">
                      <Label htmlFor="firstname" className="w-1/4 mt-2">
                        ชื่อ
                      </Label>
                      <Input
                        id="firstname"
                        placeholder="ชื่อ"
                        {...registerForm1("FirstName")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>

                    <div className="flex items-center space-y-4">
                      <Label htmlFor="lastname" className="w-1/4 mt-2">
                        นามสกุล
                      </Label>
                      <Input
                        id="lastname"
                        placeholder="นามสกุล"
                        {...registerForm1("LastName")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="gender" className="w-1/4 mt-2">
                        เพศ
                      </Label>
                      <Select
                        value={String(customers?.Gender.ID)}
                        onValueChange={(value) =>
                          setValue("GenderID", parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="เลือกเพศ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>เพศ</SelectLabel>
                            {gender.map((g) => (
                              <SelectItem key={g.ID} value={String(g.ID)}>
                                {g.Name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="phone" className="w-1/4 mt-2">
                        เบอร์โทรศัพท์
                      </Label>
                      <Input
                        id="phone"
                        placeholder="เบอร์โทรศัพท์"
                        {...registerForm1("Phone")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="email" className="w-1/4 mt-2">
                        อีเมล
                      </Label>
                      <Input
                        id="email"
                        placeholder="อีเมล"
                        {...registerForm1("Email")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <CardFooter className="justify-center mt-6">
                      <Button type="submit" className="bg-green-600 mt-6">
                        อัพเดตข้อมูล
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>รายละเอียดที่อยู่</CardTitle>
                  <CardDescription>
                    สามารถเปลี่ยนข้อมูลที่อยู่ของคุณได้ที่นี่
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  {/* Address Form */}
                  <form
                    onSubmit={handleSubmitForm1(onSubmit)}
                  // className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
                  >
                    <div className="space-y-2 flex items-center">
                      <Label htmlFor="address" className="w-1/4 mt-2">
                        ที่อยู่
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="ที่อยู่"
                        {...registerForm1("Address")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <CardFooter className="justify-center">
                      <Button className="bg-green-600 mt-6" type="submit">
                        อัพเดตข้อมูลที่อยู่
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
