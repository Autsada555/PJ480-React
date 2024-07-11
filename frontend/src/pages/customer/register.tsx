import Navbar from "./navbar";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

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
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Register() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Navbar />
      <div>
        <div className="absolute text-black text-xl font-bold font-['Inter'] left-[705px] top-[130px]">
          Sign Up from
        </div>
        <div className="w-[40px] h-[40px] bg-slate-200 ml-[600px] mt-[120px] border-[1px]"></div>
        <div className="w-[40px] h-[40px] bg-slate-200 ml-[750px] mt-[-40px] border-[1px]"></div>
        <div className="w-[40px] h-[40px] bg-slate-200 ml-[900px] mt-[-40px] border-[1px]"></div>
        <div className="h-[1px] bg-black mt-[-20px] w-[110px] ml-[640px]"></div>
        <div className="h-[1px] bg-black mt-[1px] w-[110px] ml-[790px]"></div>
        <div className="ml-[605px] mt-[50px]">
          <Carousel setApi={setApi} className="w-[330px]">
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-slate-100">
                      <Form>
                        <div>
                          <div className="left-[150px] top-[25px] absolute text-[18px] font-bold font-['Inter']">
                            Sign Up
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[70px] top-[90px] absolute">
                            <Label
                              htmlFor="username"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Username <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="username"
                              //   value={formData.username}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[70px] top-[160px] absolute">
                            <Label
                              htmlFor="email"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Email <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="email"
                              //   value={formData.email}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[70px] top-[230px] absolute">
                            <Label
                              htmlFor="password"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Password <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="password"
                              //   value={formData.password}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          {/* <div className="mt-[-100px]">
                            <UserPlus className="mt-[10px]"></UserPlus>
                          </div> */}
                          <div className=" w-full max-w-sm flex-col gap-1 left-[415px] top-[70px] absolute">
                            <UserPlus className="w-[40px] h-[40px] ml-[95px] mt-[-65px]"></UserPlus>
                            <Label
                              htmlFor="firstname"
                              className="text-[14px] left-[3px] top-[-15px] font-['Inter'] absolute"
                            >
                              Firstname <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="firstname"
                              //   value={formData.firstname}
                              //   onChange={handleChange}
                              className="text-[16px] mt-8 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[415px] top-[130px] absolute">
                            <Label
                              htmlFor="lastname"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Lastname <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="lastname"
                              //   value={formData.lastname}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[415px] top-[190px] absolute">
                            <Label
                              htmlFor="phone"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Phone <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="phone"
                              //   value={formData.phone}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <Label
                            htmlFor="phone"
                            className="text-[14px] left-[275px] top-[232px] font-['Inter'] absolute w-full"
                          >
                            Gender <span className="text-red-500 ">*</span>
                          </Label>
                          <Select>
                            <SelectTrigger className="w-[220px] left-[415px] top-[255px] h-[35px] font-['Inter'] absolute">
                              <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[50px] absolute">
                            <Label
                              htmlFor="address"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Address <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="address"
                              //   value={formData.address}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[110px] absolute">
                            <Label
                              htmlFor="district"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              District <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="district"
                              //   value={formData.district}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[170px] absolute">
                            <Label
                              htmlFor="province"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Province <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="province"
                              //   value={formData.province}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <div className=" w-full max-w-sm flex-col gap-1 left-[765px] top-[230px] absolute">
                            <Label
                              htmlFor="postcode"
                              className="text-[14px] left-[3px] top-[-16px] font-['Inter'] absolute"
                            >
                              Postcode <span className="text-red-500 ">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="postcode"
                              //   value={formData.postcode}
                              //   onChange={handleChange}
                              className="text-[16px] mt-2 w-[220px] h-8"
                            />
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="left-[835px] top-[285px] absolute bg-green-600 text-white  w-[80px] h-[30px]"
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
                                <AlertDialogAction>Yes, confirm</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </Form>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground mt-[10px] ml-[-650px]">
            Slide {current} of {count}
          </div>
        </div>
      </div>
    </div>
  );
}
