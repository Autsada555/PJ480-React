import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Diabetesimg from "@/assets/imgforhome/diabetesimg.png";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export function DiabetesFood() {
  const [showModalMenu, setShowModalMenu] = useState(false);
  // const products = dataReward.flatMap((reward) => [
  //     {
  //       id: reward.ID,
  //       name: reward.Descript,
  //       price: reward.CoinAmount,
  //       imageSrc: reward.RewardImage,
  //       quantity: reward.Quantity,
  //     }
  //   ]);
  const hangleOnCloseModalMenu = (e: any) => {
    if (e.target.id == "BG") {
      setShowModalMenu(false);
      //   console.log(dataRewardHis);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mt-3 justify-center flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex">
              <NavigationMenuItem>
                <Link to={"/home"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Health Food
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={"/diabetesfood"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Diabetes Food
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={"/kidnyfood"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Kidny Foods
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={"/gastritistfood"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Gastritist Foods
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={"/thyroidfood"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Thyroid Foods
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* <div className="w-[230px] h-[42px] bg-slate-100 mt-[16px] ml-[125px] rounded-xl left-[144px] border-[1px]"></div> */}

      <div className="left-[100px] top-[155px] absolute text-black text-2xl font-bold font-['Inter']">
        อาหารสำหรับผู่ป่วยโรคเบาหวาน (Diabetes Foods)
      </div>

      <div className="w-[1570px] h-[360px] bg-slate-100   mt-[70px] ml-[5px] rounded-xl left-[144px] border-[1px]"></div>
      <div className="mt-[-328px] ml-[200px] ">
        <img src={Diabetesimg} alt="Diabetesimg" className="w-[500px] h-[300px]" />
      </div>
      <div className="ml-[770px] mt-[-250px] font-['Inter'] text-[20px] absolute">
        "อาหารสำหรับผู้ป่วยโรคเบาหวานควรเน้นการควบคุมระดับน้ำตาลในเลือด  <br />
        โดยเลือกบริโภคอาหารที่มีคาร์โบไฮเดรตเชิงซ้อน เช่น ข้าวกล้อง ขนมปังโฮลวีท และผักใบเขียว <br />
        ควรหลีกเลี่ยงอาหารที่มีน้ำตาลสูงและไขมันอิ่มตัว เช่น ขนมหวานและอาหารทอด <br />
        การเลือกอาหารที่มีโปรตีนสูง เช่น ปลา เนื้อไก่ไม่ติดมัน และถั่ว   <br />
        สามารถช่วยควบคุมระดับน้ำตาลในเลือดได้ดีขึ้น <br />
        พร้อมกับการรับประทานผักและผลไม้ที่มีดัชนีน้ำตาลต่ำ <br />
        เพื่อส่งเสริมสุขภาพที่ดีและควบคุมโรคเบาหวานได้อย่างมีประสิทธิภาพ" 🥦🍗
      </div>

      <div className="flex ml-28 mt-[50px]">
        <h1 className="text-2xl  font-['Inter'] font-bold">Savory Food</h1>
      </div>
      <div className=" border rounded-[20px] h-[250px] w-[230px] ml-40 mt-5">
        <img
          className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
          src="src\assets\kawkookkapi.webp"
          alt="image"
          onClick={() => setShowModalMenu(true)}
        />
        <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
          <h1>ข้าวคลุกกะปิ</h1>
          <h1>70 ฿</h1>
        </div>
        <h2 className="flex pl-2">Fast foods</h2>
        <div className="flex pt-3 space-x-[115px] ">
          <div className="flex">
            <img
              className="h-[20px] pl-2 cursor-pointer"
              src="src\assets\star.svg"
              alt="star"
            />
            <h1 className="pl-2">4.0</h1>
          </div>
          <img
            className="h-[30px] cursor-pointer"
            src="src\assets\add.svg"
            alt="add"
          />
        </div>

        {showModalMenu ? (
          <div
            id="BG"
            onClick={hangleOnCloseModalMenu}
            className="fixed inset-0 flex justify-center w-full h-full"
          >
            <div className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg ">
              <h1 className="mt-6 text-4xl">Details Menu</h1>
              <div className="flex space-x-0">
                <img
                  className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5"
                  src="src\assets\kawkookkapi.webp"
                  alt="image"
                />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                  <h1>ข้าวคลุกกะปิ</h1>
                  <h1>70 ฿</h1>
                </div>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Component Food</h1>
                <h1>sadasdadawdawdawdawdawdawd</h1>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Type Food</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex ml-28 mt-5">
        <h1 className="text-2xl  font-['Inter'] font-bold">Dessert Food</h1>
      </div>
      <div className=" border rounded-[20px] h-[250px] w-[230px] ml-40 mt-5">
        <img
          className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
          src="src\assets\kawkookkapi.webp"
          alt="image"
          onClick={() => setShowModalMenu(true)}
        />
        <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
          <h1>ข้าวคลุกกะปิ</h1>
          <h1>70 ฿</h1>
        </div>
        <h2 className="flex pl-2">Fast foods</h2>
        <div className="flex pt-3 space-x-[115px] ">
          <div className="flex">
            <img
              className="h-[20px] pl-2 cursor-pointer"
              src="src\assets\star.svg"
              alt="star"
            />
            <h1 className="pl-2">4.0</h1>
          </div>
          <img
            className="h-[30px] cursor-pointer"
            src="src\assets\add.svg"
            alt="add"
          />
        </div>

        {showModalMenu ? (
          <div
            id="BG"
            onClick={hangleOnCloseModalMenu}
            className="fixed inset-0 flex justify-center w-full h-full"
          >
            <div className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg ">
              <h1 className="mt-6 text-4xl">Details Menu</h1>
              <div className="flex space-x-0">
                <img
                  className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5"
                  src="src\assets\kawkookkapi.webp"
                  alt="image"
                />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                  <h1>ข้าวคลุกกะปิ</h1>
                  <h1>70 ฿</h1>
                </div>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Component Food</h1>
                <h1>sadasdadawdawdawdawdawdawd</h1>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Type Food</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex ml-28 mt-5">
        <h1 className="text-2xl  font-['Inter'] font-bold">Soup Food</h1>
      </div>
      <div className=" border rounded-[20px] h-[250px] w-[230px] ml-40 mt-5">
        <img
          className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
          src="src\assets\kawkookkapi.webp"
          alt="image"
          onClick={() => setShowModalMenu(true)}
        />
        <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
          <h1>ข้าวคลุกกะปิ</h1>
          <h1>70 ฿</h1>
        </div>
        <h2 className="flex pl-2">Fast foods</h2>
        <div className="flex pt-3 space-x-[115px] ">
          <div className="flex">
            <img
              className="h-[20px] pl-2 cursor-pointer"
              src="src\assets\star.svg"
              alt="star"
            />
            <h1 className="pl-2">4.0</h1>
          </div>
          <img
            className="h-[30px] cursor-pointer"
            src="src\assets\add.svg"
            alt="add"
          />
        </div>

        {showModalMenu ? (
          <div
            id="BG"
            onClick={hangleOnCloseModalMenu}
            className="fixed inset-0 flex justify-center w-full h-full"
          >
            <div className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg ">
              <h1 className="mt-6 text-4xl">Details Menu</h1>
              <div className="flex space-x-0">
                <img
                  className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5"
                  src="src\assets\kawkookkapi.webp"
                  alt="image"
                />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                  <h1>ข้าวคลุกกะปิ</h1>
                  <h1>70 ฿</h1>
                </div>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Component Food</h1>
                <h1>sadasdadawdawdawdawdawdawd</h1>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Type Food</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex ml-28 mt-5">
        <h1 className="text-2xl  font-['Inter'] font-bold">Type of Drink</h1>
      </div>
      <div className=" border rounded-[20px] h-[250px] w-[230px] ml-40 mt-5">
        <img
          className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
          src="src\assets\kawkookkapi.webp"
          alt="image"
          onClick={() => setShowModalMenu(true)}
        />
        <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
          <h1>ข้าวคลุกกะปิ</h1>
          <h1>70 ฿</h1>
        </div>
        <h2 className="flex pl-2">Fast foods</h2>
        <div className="flex pt-3 space-x-[115px] ">
          <div className="flex">
            <img
              className="h-[20px] pl-2 cursor-pointer"
              src="src\assets\star.svg"
              alt="star"
            />
            <h1 className="pl-2">4.0</h1>
          </div>
          <img
            className="h-[30px] cursor-pointer"
            src="src\assets\add.svg"
            alt="add"
          />
        </div>

        {showModalMenu ? (
          <div
            id="BG"
            onClick={hangleOnCloseModalMenu}
            className="fixed inset-0 flex justify-center w-full h-full"
          >
            <div className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg ">
              <h1 className="mt-6 text-4xl">Details Menu</h1>
              <div className="flex space-x-0">
                <img
                  className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5"
                  src="src\assets\kawkookkapi.webp"
                  alt="image"
                />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                  <h1>ข้าวคลุกกะปิ</h1>
                  <h1>70 ฿</h1>
                </div>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Component Food</h1>
                <h1>sadasdadawdawdawdawdawdawd</h1>
              </div>
              <div>
                <h1 className="mt-6 text-4xl">Type Food</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
                <h1>Diabetes</h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
