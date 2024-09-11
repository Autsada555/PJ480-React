import Navbar from "../customer/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Gender, User } from "../../interfaces";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GetAllGender, GetCustomer, UpdateCustomer } from "../../services/https/Customer";
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

import {
  userUpdateFormSchema,
  UserUpdateFormData,
} from "@/validator";
// import { get } from "http";

// interface Props {
//   customers: User;
//   onSave(): void;
// }
// export function Customer({ customers, onSave }: Props): JSX.Element {

export function Customer(): JSX.Element {
  const { toast } = useToast();
  const [gender, setGender] = useState<Gender[]>([]);
  const [customers, setCustomer] = useState<User>();

  const form = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateFormSchema),
    defaultValues: {
      FirstName: customers?.FirstName,
      LastName: customers?.LastName,
      GenderID: customers?.Gender.ID,
      UserTypeID: customers?.UserType.ID,
      Phone: customers?.Phone,
      Email: customers?.Email,
      Address: customers?.Address,
      District: customers?.District,
      Province: customers?.Province,
      Postcode: customers?.Postcode,
    },
  });

  useEffect(() => {
    async function fetchGender() {
      try {
        const res = await GetAllGender();
        if (res) {
          setGender(res);
        } else {
          console.error("Failed to fetch gender options:", res.message);
        }
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    }
    async function fetchCustomer() {
      try {
        const res = await GetCustomer();
        console.log(res);
        if (res) {
          setCustomer(res);
        } else {
          console.error("Failed to fetch customer options:", res.message);
        }
      } catch (error) {
        console.error("Error fetching customer options:", error);
      }
    }
    fetchGender();
    fetchCustomer();
    console.log(customers);
  }, []);
useEffect(() => {})
  const onValid: SubmitHandler<UserUpdateFormData> = async (formData) => {
    try {
      const res = await UpdateCustomer(formData);
      if (res.status) {
        // onSave();
        toast({
          title: "Update Successful",
          description: res.message,
          duration: 1500,
        });
      } else {
        toast({
          title: "Update Failed",
          description: "An error occurred while updating.",
          duration: 1500,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        duration: 1500,
      });
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
          <div className="w-[348px] h-[380px] bg-slate-100 mt-[122px] ml-[220px] rounded-3xl border-[1px]"></div>
          <div>
            <Avatar className="absolute left-[330px] top-[-350px] w-[122px] h-[122px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-[350px] left-[300px] flex">
            <p className="text-[19px] text-gray-700 space-x-4">
              <span className="font-semibold">{customers?.FirstName}</span>
              <span className="font-semibold">{customers?.LastName}</span>
            </p>
          </div>
          <div className="absolute top-[460px] left-[490px] flex">
            <Button
              className="flex w-[160px] text-[17px] text-white bg-slate-500"
              variant="outline"
            >
              <Link to="/history">ประวัติการสั่งซื้อ</Link>
            </Button>
          </div>
          <div className="absolute top-[530px] left-[490px] flex">
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
                    Make changes to your account here. Click update when
                    you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      placeholder="FirstName"
                      {...form.register("FirstName")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.FirstName}
                    />
                  </div>
                  <div className="space-y-8">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      placeholder="LastName"
                      {...form.register("LastName")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.LastName}
                    />
                  </div>
                  <div className="space-y-8">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      {...form.register("GenderID")}
                      onValueChange={(value) =>
                        form.setValue("GenderID", parseInt(value))
                      }
                      defaultValue={String(customers?.Gender.ID)}
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
                  <div className="space-y-8">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Phone"
                      {...form.register("Phone")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.Phone}
                    />
                  </div>
                  <div className="space-y-8">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Email"
                      {...form.register("Email")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.Email}
                    />
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button className="bg-green-600" onClick={form.handleSubmit(onValid)}>
                    Update Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address Details</CardTitle>
                  <CardDescription>
                    Make changes to your address here. Click update when
                    you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Address"
                      {...form.register("Address")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.Address}
                    />
                  </div>
                  <div className="space-y-8">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="District"
                      {...form.register("District")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.District}
                    />
                  </div>
                  <div className="space-y-8">
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      placeholder="Province"
                      {...form.register("Province")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.Province}
                    />
                  </div>
                  <div className="space-y-8">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input
                      id="postcode"
                      placeholder="Postcode"
                      {...form.register("Postcode")}
                      className="text-[16px] mt-2 w-full"
                      defaultValue={customers?.Postcode}
                    />
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button className="bg-green-600" onClick={form.handleSubmit(onValid)}>
                    Update Address
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
