import DSLOGO from '@/assets/DS-Logo.png';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { userFormSchema, UserFormData } from "@/validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Gender, UserType } from "../../interfaces";
import { useEffect, useState } from "react";
import {
  GetAllGender,
  GetAllUserType,
  CreateCustomer,
} from "../../services/https/Customer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Register() {
  const [gender, setGender] = useState<Gender[]>([]);
  const onSubmit: SubmitHandler<UserFormData> = async (formData: UserFormData) => {
    try {
      const res = await CreateCustomer(formData);
      console.log(formData);

      if (res.status) {
        toast.success("Customer created successfully", {
          position: "bottom-right",
          autoClose: 1500,
        });
      } else {
        toast.error(`Creation Failed: ${res.message}`, {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("An error occurred while creating the customer.", {
        autoClose: 1500,
      });
    }
  };
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

    fetchGender();
  }, []);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      GenderID: undefined,
      UserTypeID: undefined,
      Phone: "",
      Email: "",
      UserName: "",
      Password: "",
      Address: "",
      District: "",
      Province: "",
      Postcode: "",
    },
  });

  return (
    <div>
      <div className="bg-[#01BD63] h-14"></div>
      <div className=" flex justify-center h-24 my-2">
        <img src={DSLOGO} alt="dslogo" className="" />

      </div>
      <div className="relative h-screen mt-24">
        <div className="flex justify-center">
          <Carousel className="w-[330px]">
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-slate-100">
                      <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          <div>
                            <div className="left-[150px] top-[25px] absolute text-[18px] font-bold font-['Inter']">
                              Sign Up
                            </div>
                            <div className="w-full max-w-sm flex-col gap-1 left-[80px] top-[90px] absolute">
                              <FormField
                                name="UserName"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Username<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[80px] top-[160px] absolute">
                              <FormField
                                name="Email"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Email<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[80px] top-[230px] absolute">
                              <FormField
                                name="Password"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Password<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[415px] top-[70px] absolute">
                              <UserPlus className="w-[40px] h-[40px] ml-[95px] mt-[-65px]"></UserPlus>
                              <FormField
                                name="FirstName"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>FirstName<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[415px] top-[130px] absolute">
                              <FormField
                                name="LastName"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-10px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>LastName<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[415px] top-[190px] absolute">
                              <FormField
                                name="Phone"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-6px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Phone<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Label
                              className="text-[14px] left-[283px] top-[245px] font-['Inter'] absolute w-full"
                            >
                              Gender <span className="text-red-500 ">*</span>
                            </Label>
                            <Select>
                              <SelectTrigger className="w-[195px] left-[430px] top-[265px] h-[35px] font-['Inter'] absolute">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                {gender.map((u) => (
                                  <SelectItem key={u.ID} value={String(u.ID)}>
                                    {u.Name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[50px] absolute">
                              <FormField
                                name="Address"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Address<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[115px] absolute">
                              <FormField
                                name="Province"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Province<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[180px] absolute">
                              <FormField
                                name="District"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>District<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[245px] absolute">
                              <FormField
                                name="Postcode"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="text-[14px] left-[15px] top-[-16px] font-['Inter'] absolute">
                                    <FormLabel className='flex'>Postcode<span className="text-red-500 ">*</span></FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="left-[835px] top-[295px] absolute bg-green-600 text-white  w-[80px] h-[30px]"
                                >
                                  Submit
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Do you want to confirm the register?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction> <Button type="submit">Yes, Confirm</Button></AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <ToastContainer />

                          </div>
                    </form>
                      </Form>

                  </CardContent>
                </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
    </div >
  );
}
