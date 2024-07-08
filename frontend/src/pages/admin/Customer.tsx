import Navbar from "../customer/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Tooltip } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";

export function Customer() {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="left-[226px] top-[130px] absolute text-black text-xl font-bold font-['Inter']">
          Overview
        </div>
        <div className="left-[226px] top-[160px] absolute text-black text-3xl font-bold font-['Inter']">
          User Profile
        </div>
        <div>
          <div className="w-[348px] h-[380px] bg-slate-100 mt-[142px] ml-[220px] rounded-3xl left-[144px] "></div>
          <div>
            <Avatar className="left-[330px] w-[122px] h-[122px] top-[-350px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex  top-[370px] absolute left-[300px]">
            <p className="text-[19px] text-gray-700  space-x-4">
              <span className="font-semibold">FirstName</span>
              <span className="font-semibold">LastName</span>
            </p>
          </div>
          <div className="flex top-[480px] absolute left-[490px]">
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
          <div className="flex top-[550px] absolute left-[490px] ">
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
          <div className="w-[748px] h-[500px] bg-slate-100 mt-[-510px] ml-[620px] rounded-3xl  "></div>
          <div className="left-[680px] top-[220px] absolute text-black text-xl font-bold font-['Inter']">
            Account Details
          </div>
          <div>
            {/* <div className="grid w-full max-w-sm  gap-1.5 left-[1020px] top-[390px] absolute ">
              <Label className="text-xl ">FirstName</Label>
              <Input className="text-[16px]" type="text" id="firstName" placeholder="FirstName" />
            </div> */}
            <Form>
              <div className=" w-full max-w-sm flex-col gap-1 left-[840px] top-[275px] absolute">
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
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[340px] absolute">
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
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[405px] absolute">
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
              </div>
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[470px] absolute">
                <Label
                  htmlFor="phone"
                  className=" text-[16px] left-[-100px] top-[21px] absolute"
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
              <div className="grid w-full max-w-sm  gap-1 left-[840px] top-[535px] absolute">
                <Label
                  htmlFor="email"
                  className=" text-[16px] left-[-100px] top-[23px] absolute"
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
                className="w-full mt-4 grid max-w-sm  gap-1 left-[790px] top-[600px] absolute bg-green-600"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
