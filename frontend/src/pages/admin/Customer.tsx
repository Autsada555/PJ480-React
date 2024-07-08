import Navbar from "../customer/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Tooltip } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Customer() {
  return (
    <>
      <Navbar></Navbar>
      <div >
        <div className="left-[226px] top-[105px] absolute text-black text-xl font-bold font-['Inter']">
          Overview
        </div>
        <div className="left-[226px] top-[135px] absolute text-black text-3xl font-bold font-['Inter']">
          User Profile
        </div>
        <div>
          <div className="w-[348px] h-[380px] bg-slate-100 mt-[122px] ml-[220px] rounded-3xl left-[144px] "></div>
          <div>
            <Avatar className="left-[330px] w-[122px] h-[122px] top-[-350px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex  top-[350px] absolute left-[300px]">
            <p className="text-[19px] text-gray-700  space-x-4">
              <span className="font-semibold">FirstName</span>
              <span className="font-semibold">LastName</span>
            </p>
          </div>
          <div className="flex top-[460px] absolute left-[490px]">
            <Button
              className=" absolute bottom-4 right-4 flex w-[160px] text-[17px] text-white bg-slate-400"
              variant="secondary"
            >
              {/* <Link to="/">
                <CornerUpLeftIcon />
            </Link> */}
              {"ประวัติการสั่งซื้อ"}
            </Button>
          </div>
          <div className="flex top-[530px] absolute left-[490px] ">
            {/* <Tooltip> */}
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 flex w-[160px] text-[17px text-white bg-red-700	"
              //   onClick={logout}
            >
              {/* <LogOut /> */}
              {"Log out"}
            </Button>
            {/* </Tooltip> */}
          </div>
        </div>
        <div>
          {/* <div className="w-[748px] h-[500px] bg-slate-100 mt-[-505px] ml-[620px] rounded-3xl  "></div> */}
          {/* <div className="left-[680px] top-[200px] absolute text-black text-xl font-bold font-['Inter']">
            Account Details
          </div> */}
          <div>
            {/* <div className="grid w-full max-w-sm  gap-1.5 left-[1020px] top-[390px] absolute ">
              <Label className="text-xl ">FirstName</Label>
              <Input className="text-[16px]" type="text" id="firstName" placeholder="FirstName" />
            </div> */}
            {/* <Form>
              <div className=" w-full max-w-sm flex-col gap-1 left-[840px] top-[245px] absolute">
                <Label
                  htmlFor="firstName"
                  className="text-[16px] left-[-100px] top-[15px] absolute"
                >
                  First Name :
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  //   value={formData.firstName}
                  //   onChange={handleChange}
                  className="text-[16px] mt-2 w-full"
                />
              </div>
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[310px] absolute">
                <Label
                  htmlFor="lastName"
                  className=" text-[16px] left-[-100px] top-[17px] absolute"
                >
                  Last Name :
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  //   value={formData.lastName}
                  //   onChange={handleChange}
                  className="text-[16px] mt-2 w-full"
                />
              </div>
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[375px] absolute">
                <Label
                  htmlFor="lastName"
                  className=" text-[16px] left-[-100px] top-[19px] absolute"
                >
                  Gender :
                </Label>
                {/* <Form.Select
                  valueAsNumber
                  className="col-span-3 focus:outline-none   border-black"
                  //   useForm={form}
                  name="GenderID"
                  placeholder="Choose Gender"
                /> */}
            {/* </div>
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[440px] absolute">
                <Label
                  htmlFor="phone"
                  className=" text-[16px] left-[-100px] top-[16px] absolute"
                >
                  Phone :
                </Label>
                <Input
                  type="text"
                  id="phone"
                  placeholder="Phone"
                  //   value={formData.phone}
                  //   onChange={handleChange}
                  className="text-[16px] mt-2 w-full"
                />
              </div>
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[505px] absolute">
                <Label
                  htmlFor="email"
                  className=" text-[16px] left-[-100px] top-[18px] absolute"
                >
                  Email :
                </Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Email"
                  //   value={formData.email}
                  //   onChange={handleChange}
                  className="text-[16px] mt-2 w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4 grid max-w-sm  gap-1 left-[790px] top-[570px] absolute bg-green-600"
              >
                Update Account
              </Button>
            </Form> */}

            <Tabs
              defaultValue="account"
              className="w-[500px] left-[740px] top-[132px] absolute"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click update when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1 ">
                      <Label
                        htmlFor="firstname"
                        className="left-[27px] top-[135px] absolute"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstname"
                        placeholder="firstname"
                        //   value={formData.lastName}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-8">
                      <Label
                        htmlFor="lastname"
                        className="left-[27px] top-[208px] absolute"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastname"
                        placeholder="lastname"
                        //   value={formData.lastName}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-8">
                      <Label
                        htmlFor="lastname"
                        className="left-[27px] top-[280px] absolute"
                      >
                        Gender
                      </Label>
                      <Input
                        id="gender"
                        placeholder="Gender"
                        //   value={formData.gender}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-8">
                      <Label
                        htmlFor="phone"
                        className="left-[27px] top-[352px] absolute"
                      >
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Phone"
                        //   value={formData.phone}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                    <div className="space-y-8">
                      <Label
                        htmlFor="email"
                        className="left-[27px] top-[423px] absolute"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="Email"
                        //   value={formData.email}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button className="bg-green-600">Update Account</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="address">
                <Card>
                  <CardHeader>
                    <CardTitle>Address</CardTitle>
                    <CardDescription>
                    Make changes to your address here. Click update when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="address" className="left-[27px] top-[135px] absolute">Address</Label>
                      <Input 
                      id="address"
                      placeholder="Address"
                      //   value={formData.address}
                      //   onChange={handleChange}
                      className="text-[16px] mt-2 w-full" />
                    </div>
                    <div className="space-y-8">
                      <Label htmlFor="district" className="left-[27px] top-[208px] absolute">District</Label>
                      <Input 
                      id="district"
                        placeholder="District"
                        //   value={formData.district}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full" />
                    </div>
                    <div className="space-y-8">
                      <Label htmlFor="province" className="left-[27px] top-[280px] absolute">Province</Label>
                      <Input 
                      id="province"
                        placeholder="Province"
                        //   value={formData.province}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full" />
                    </div>
                    <div className="space-y-8">
                      <Label htmlFor="postcast" className="left-[27px] top-[352px] absolute">Postcast</Label>
                      <Input 
                      id="postcast"
                        placeholder="Postcast"
                        //   value={formData.postcast}
                        //   onChange={handleChange}
                        className="text-[16px] mt-2 w-full" />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button className="bg-green-600 ">Update Address</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
