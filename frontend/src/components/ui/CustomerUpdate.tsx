import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Gender, User } from "../../interfaces";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GetAllGender, UpdateCustomer } from "../../services/https/Customer";
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

interface Props {
  customers: User;
  onSave(): void;
}

const CustomerUpdate = ({ customers, onSave }: Props) => {
  const { toast } = useToast();
  const [gender, setGender] = useState<Gender[]>([]);

  // Initialize the form with default values from the customers prop
  const form = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateFormSchema),
    defaultValues: {
      FirstName: customers.FirstName,
      LastName: customers.LastName,
      GenderID: customers.Gender.ID,
      Phone: customers.Phone,
      Email: customers.Email,
      Address: customers.Address,
      District: customers.District,
      Province: customers.Province,
      Postcode: customers.Postcode
    },
  });

  useEffect(() => {
    async function fetchGender() {
      try {
        const res = await GetAllGender();
        if (res.ok) {
          setGender(res.data);
        } else {
          console.error("Failed to fetch gender options:", res.message);
        }
      } catch (error) {
        console.error("Error fetching gender options:", error);
      }
    }

    fetchGender();
  }, []); // No dependencies needed unless fetching when customerID changes

  const onValid: SubmitHandler<UserUpdateFormData> = async (formData: UserUpdateFormData) => {
    try {

      const res = await UpdateCustomer(formData);
      console.log(formData)
      if (res.status) {
        onSave();
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
    <div className="relative p-6">
      <div className="text-black text-xl font-bold font-['Inter'] mb-4">
        Overview
      </div>
      <div className="text-black text-3xl font-bold font-['Inter'] mb-8">
        User Profile
      </div>
      <div className="flex items-center">
        <div className="w-[348px] h-[380px] bg-slate-100 rounded-3xl border-[1px] mr-6"></div>
        <Avatar className="w-[122px] h-[122px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-6">
          <p className="text-[19px] text-gray-700">
            <span className="font-semibold">{customers.FirstName}</span>{" "}
            <span className="font-semibold">{customers.LastName}</span>
          </p>
          <Button
            className="mt-4 w-[160px] text-[17px] text-white bg-slate-500"
            variant="outline"
          >
            <Link to="/history">ประวัติการสั่งซื้อ</Link>
          </Button>
          <Button
            variant="outline"
            className="mt-4 w-[160px] text-[17px] text-white bg-red-700"
          >
            Log out
          </Button>
        </div>
      </div>
      <Tabs defaultValue="account" className="mt-8 w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Make changes to your account here. Click update when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="FirstName"
                  {...form.register("FirstName")}
                  className="text-[16px] w-full"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="LastName"
                  {...form.register("LastName")}
                  className="text-[16px] w-full"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(value) => form.setValue("GenderID", parseInt(value))}
                  defaultValue={String(customers.Gender.ID)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      {gender.map((gen) => (
                        <SelectItem key={gen.ID} value={String(gen.ID)}>
                          {gen.Name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={form.handleSubmit(onValid)} className="w-full">
                Update account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>
                Update your residential information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Address"
                  {...form.register("Address")}
                  className="text-[16px] w-full"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  placeholder="District"
                  {...form.register("District")}
                  className="text-[16px] w-full"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="Province"
                  {...form.register("Province")}
                  className="text-[16px] w-full"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  placeholder="Postcode"
                  {...form.register("Postcode")}
                  className="text-[16px] w-full"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={form.handleSubmit(onValid)} className="w-full">
                Update address
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerUpdate;
