import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Healthimg from "@/assets/imgforhome/Healthimg.jpg";

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

export function Home() {
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
            
            <div>
                <Navbar />
                <div className="ml-[430px] mt-[20px] text-[18px]">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Healthy Foods</NavigationMenuTrigger>
                                <NavigationMenuTrigger>Diabetes Foods </NavigationMenuTrigger>
                                <NavigationMenuTrigger>Kidny Foods </NavigationMenuTrigger>
                                <NavigationMenuTrigger>Gastritist Foods </NavigationMenuTrigger>
                                <NavigationMenuTrigger>Thyroid Foods</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                {/* <div className="w-[230px] h-[42px] bg-slate-100 mt-[16px] ml-[125px] rounded-xl left-[144px] border-[1px]"></div> */}

                <div className="left-[100px] top-[155px] absolute text-black text-2xl font-bold font-['Inter']">
                    อาหารเพื่อสุขภาพ (Healthy Foods)
                </div>

                <div className="w-[1570px] h-[360px] bg-slate-100   mt-[70px] ml-[5px] rounded-xl left-[144px] border-[1px]"></div>
                <div className="mt-[-328px] ml-[200px] ">
                    <img src={Healthimg} alt="Healthimg" className="w-[500px] h-[300px]" />
                </div>
                <div className="ml-[770px] mt-[-200px] font-['Inter'] text-[20px] absolute">
                    "อาหารสุขภาพคือการบริโภคอาหารที่มีประโยชน์และเต็มไปด้วย <br />
                    สารอาหารที่จำเป็นต่อร่างกายเช่น ผัก ผลไม้ ธัญพืช และโปรตีนที่มีคุณภาพ  <br />
                    การรับประทานอาหารสุขภาพช่วยเสริมสร้างระบบภูมิคุ้มกัน <br />
                    เพิ่มพลังงาน และส่งเสริมการมีชีวิตที่สมดุลและสุขภาพดี" 🌿🥗
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
        </div>
    );
}
