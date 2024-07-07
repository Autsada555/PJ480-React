// import Navbar from "../customer/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Tooltip } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export function Customer() {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div>
        <div className="left-[256px] top-[150px] absolute text-black text-2xl font-bold font-['Inter']">
          Overview
        </div>
        <div className="left-[256px] top-[190px] absolute text-black text-4xl font-bold font-['Inter']">
          User Profile
        </div>
        <div>
          <div className="w-[448px] h-[500px] bg-slate-100 mt-56 ml-[-96px] rounded-3xl left-[144px] "></div>
          <div>
            <Avatar className="left-[38px] w-[172px] h-[172px] top-[-440px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex  top-[510px] absolute left-[350px]">
            <p className="text-2xl text-gray-700  space-x-4">
              <span className="font-semibold">FirstName</span>
              <span className="font-semibold">LastName</span>
            </p>
          </div>
          <div className="flex top-[630px] absolute left-[575px]">
            <Button
              className=" absolute bottom-4 right-4 flex w-48 text-[18px] text-white bg-slate-400"
              variant="secondary"
            >
              {/* <Link to="/">
                <CornerUpLeftIcon />
            </Link> */}
              {"ประวัติการสั่งซื้อ"}
            </Button>
          </div>
          <div className="flex top-[710px] absolute left-[575px] ">
            {/* <Tooltip> */}
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 flex w-48 text-[18px] text-white bg-red-700	"
              //   onClick={logout}
            >
              {/* <LogOut /> */}
              {"Log out"}
            </Button>
            {/* </Tooltip> */}
          </div>
        </div>
        <div>
          <div className="w-[848px] h-[500px] bg-slate-100 mt-[-673px] ml-[460px] rounded-3xl  "></div>
          <div className="left-[840px] top-[290px] absolute text-black text-2xl font-bold font-['Inter']">
            Account Details
          </div>
          <div>
            {/* <div className="grid w-full max-w-sm  gap-1.5 left-[1020px] top-[390px] absolute ">
              <Label className="text-xl ">FirstName</Label>
              <Input className="text-[16px]" type="text" id="firstName" placeholder="FirstName" />
            </div> */}

          </div>
        </div>
      </div>
    </>
  );
}
