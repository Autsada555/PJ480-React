import Navbar from "../customer/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Gender, UserID } from "../../interfaces";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"; // Import toast from react-toastify

import {
  GetAllGender,
  GetCustomerByID,
  UpdateCustomer,
} from "../../services/https/Customer";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { userUpdateFormSchema, UserUpdateFormData } from "@/validator";
import { Form } from "@/components/ui/form";
import { log } from "console";

export function Customer(): JSX.Element {
  const [gender, setGender] = useState<Gender[]>([]);
  const [customers, setCustomer] = useState<UserID>();
  const [open, setOpen] = useState(false);
  const [userid, setUserid] = useState(Number(localStorage.getItem("userid")));

  // const form = useForm<UserUpdateFormData>({
  //   resolver: zodResolver(userUpdateFormSchema),
  //   defaultValues: {
  //     FirstName: customers?.FirstName,
  //     LastName: customers?.LastName,
  //     GenderID: customers?.Gender.ID,
  //     Phone: customers?.Phone,
  //     Email: customers?.Email,
  //     Address: customers?.Address,
  //     District: customers?.District,
  //     Province: customers?.Province,
  //     Postcode: customers?.Postcode,
  //   },
  // });

  // const { register, setValue, reset } = useForm<UserUpdateFormData>({
  //   resolver: zodResolver(userUpdateFormSchema),
  //   defaultValues: {
  //     FirstName: customers?.FirstName,
  //     LastName: customers?.LastName,
  //     GenderID: customers?.Gender.ID,
  //     Phone: customers?.Phone,
  //     Email: customers?.Email,
  //     Address: customers?.Address,
  //     District: customers?.District,
  //     Province: customers?.Province,
  //     Postcode: customers?.Postcode,
  //   },
  // });

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
        const res = await GetCustomerByID(userid); // Fetch customer with ID 2
        setCustomer(res);
      } catch (error) {
        console.error("Error fetching customer options:", error);
      }
    }

    fetchCustomer();
    fetchGender();
  }, []);

  // หาก customers เปลี่ยนแปลง ให้รีเซ็ตค่าในฟอร์ม
  useEffect(() => {
    if (customers) {
      console.log(customers);
      resetForm1(customers); // ใช้ customers ทั้งหมดในการรีเซ็ตฟอร์ม
    }
  }, [customers]);

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    // formState: { errors: errorsForm1 },
    reset: resetForm1,
    setValue,
  } = useForm({
    defaultValues: customers ?? {}, // ใช้ค่า customers ถ้ามี
  });

  const onSubmit = async (data: any) => {
    // console.log(data);
    if (!data) alert("No data!");
    try {
      const res = await UpdateCustomer(data, userid);
      console.log(res);

      alert("อัพเดตแล้ว");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="left-[226px] top-[105px] absolute text-black text-xl font-bold font-['Inter']">
          Overview
        </div>
        <div className="left-[226px] top-[135px] absolute text-black text-3xl font-bold font-['Inter']">
          User Profile
        </div>
        <div>
          <div className="w-[348px] h-[380px] bg-slate-100 mt-[180px] ml-[220px] rounded-3xl border-[1px]"></div>
          <div className="">
            <Avatar className=" left-[320px] top-[-350px] w-[140px] h-[140px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-[390px] left-[330px] flex">
            <p className="text-[19px] text-gray-700 space-x-4">
              <span className="font-semibold">{customers?.FirstName}</span>
              <span className="font-semibold">{customers?.LastName}</span>
            </p>
          </div>
          <div className="absolute top-[440px] left-[310px] flex">
            <Button
              className="flex w-[160px] text-[17px] text-white bg-slate-500"
              variant="outline"
            >
              <Link to="/history">Order History</Link>
            </Button>
          </div>
          <div className="absolute top-[500px] left-[310px] flex">
            <Button
              variant="outline"
              className="flex w-[160px] text-[17px] text-white bg-red-700"
            >
              Log out
            </Button>
          </div>
        </div>
        <div>
          <Tabs
            defaultValue="account"
            className="absolute w-[500px] left-[740px] top-[132px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click update when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form
                    onSubmit={handleSubmitForm1(onSubmit)}
                    // className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
                  >
                    <div className="flex items-center space-y-3">
                      <Label htmlFor="firstname" className="w-1/4 mt-2">
                        First Name
                      </Label>
                      <Input
                        id="firstname"
                        placeholder="FirstName"
                        {...registerForm1("FirstName")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>

                    <div className="flex items-center space-y-4">
                      <Label htmlFor="lastname" className="w-1/4 mt-2">
                        Last Name
                      </Label>
                      <Input
                        id="lastname"
                        placeholder="LastName"
                        {...registerForm1("LastName")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="gender" className="w-1/4 mt-2">
                        Gender
                      </Label>
                      <Select
                        value={String(customers?.Gender.ID)}
                        onValueChange={(value) =>
                          setValue("GenderID", parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
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
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Phone"
                        {...registerForm1("Phone")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="email" className="w-1/4 mt-2">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="Email"
                        {...registerForm1("Email")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <CardFooter className="justify-center mt-6">
                      <Button type="submit" className="bg-green-600 mt-6">
                        Update Profile
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address Details</CardTitle>
                  <CardDescription>
                    Make changes to your address here. Click update when you're
                    done.
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
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="Address"
                        {...registerForm1("Address")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="district" className="w-1/4 mt-2">
                        District
                      </Label>
                      <Input
                        id="district"
                        placeholder="District"
                        {...registerForm1("District")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="province" className="w-1/4 mt-2">
                        Province
                      </Label>
                      <Input
                        id="province"
                        placeholder="Province"
                        {...registerForm1("Province")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-4 flex items-center">
                      <Label htmlFor="postcode" className="w-1/4 mt-2">
                        Postcode
                      </Label>
                      <Input
                        id="postcode"
                        placeholder="Postcode"
                        {...registerForm1("Postcode")}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <CardFooter className="justify-center">
                      <Button className="bg-green-600 mt-6" type="submit">
                        Update Address
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
