import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import { useState } from "react";


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
        if (e.target.id == 'BG') {
            setShowModalMenu(false);
            //   console.log(dataRewardHis);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="flex flex-center w-[1200px] mt-3 ml-[200px]">
                <button className="border h-[40px] w-[20%]"><a href="homeA">Food for diabetic patients</a></button>
                <button className="border h-[40px] w-[20%]"><a href="homeB">Food for kidney disease patients</a></button>
                <button className="border h-[40px] w-[20%]"><a href="homeC">Food for gastritist patients </a></button>
                <button className="border h-[40px] w-[20%]"><a href="homeD">Food for heart disease patients </a></button>
                <button className="border h-[40px] w-[20%]"><a href="homeE">Food for thyroid disease patients</a></button>
            </div>

            <div className="flex ml-28 mt-5">
                <h1 className="text-3xl">
                    Savory Food
                </h1>
            </div>
            <div className=" border rounded-[20px] h-[250px] w-[230px] ml-28">
                <img className="h-[125px] w-[230px] cursor-pointer rounded-[20px]" src="src\assets\kawkookkapi.webp" alt="image" onClick={() => setShowModalMenu(true)} />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                    <h1>ข้าวคลุกกะปิ</h1>
                    <h1>70 ฿</h1>
                </div>
                <h2 className="flex pl-2">Fast foods</h2>
                <div className="flex pt-3 space-x-[115px] ">
                    <div className="flex">
                        <img className="h-[20px] pl-2 cursor-pointer" src="src\assets\star.svg" alt="star" />
                        <h1 className="pl-2">4.0</h1>
                    </div>
                    <img className="h-[30px] cursor-pointer" src="src\assets\add.svg" alt="add" />
                </div>

                {showModalMenu ? (
                    <div
                        id="BG"
                        onClick={hangleOnCloseModalMenu}
                        className="fixed inset-0 flex justify-center w-full h-full"
                    >
                        <div
                            className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg "
                        >
                            <h1 className="mt-6 text-4xl">Details Menu</h1>
                            <div className="flex space-x-0">
                                <img className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5" src="src\assets\kawkookkapi.webp" alt="image" />
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
                <h1 className="text-3xl">
                    Dessert Food
                </h1>
            </div>
            <div className=" border rounded-[20px] h-[250px] w-[230px] ml-28">
                <img className="h-[125px] w-[230px] cursor-pointer rounded-[20px]" src="src\assets\kawkookkapi.webp" alt="image" onClick={() => setShowModalMenu(true)} />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                    <h1>ข้าวคลุกกะปิ</h1>
                    <h1>70 ฿</h1>
                </div>
                <h2 className="flex pl-2">Fast foods</h2>
                <div className="flex pt-3 space-x-[115px] ">
                    <div className="flex">
                        <img className="h-[20px] pl-2 cursor-pointer" src="src\assets\star.svg" alt="star" />
                        <h1 className="pl-2">4.0</h1>
                    </div>
                    <img className="h-[30px] cursor-pointer" src="src\assets\add.svg" alt="add" />
                </div>

                {showModalMenu ? (
                    <div
                        id="BG"
                        onClick={hangleOnCloseModalMenu}
                        className="fixed inset-0 flex justify-center w-full h-full"
                    >
                        <div
                            className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg "
                        >
                            <h1 className="mt-6 text-4xl">Details Menu</h1>
                            <div className="flex space-x-0">
                                <img className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5" src="src\assets\kawkookkapi.webp" alt="image" />
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
                <h1 className="text-3xl">
                    Soup Food
                </h1>
            </div>
            <div className=" border rounded-[20px] h-[250px] w-[230px] ml-28">
                <img className="h-[125px] w-[230px] cursor-pointer rounded-[20px]" src="src\assets\kawkookkapi.webp" alt="image" onClick={() => setShowModalMenu(true)} />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                    <h1>ข้าวคลุกกะปิ</h1>
                    <h1>70 ฿</h1>
                </div>
                <h2 className="flex pl-2">Fast foods</h2>
                <div className="flex pt-3 space-x-[115px] ">
                    <div className="flex">
                        <img className="h-[20px] pl-2 cursor-pointer" src="src\assets\star.svg" alt="star" />
                        <h1 className="pl-2">4.0</h1>
                    </div>
                    <img className="h-[30px] cursor-pointer" src="src\assets\add.svg" alt="add" />
                </div>

                {showModalMenu ? (
                    <div
                        id="BG"
                        onClick={hangleOnCloseModalMenu}
                        className="fixed inset-0 flex justify-center w-full h-full"
                    >
                        <div
                            className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg "
                        >
                            <h1 className="mt-6 text-4xl">Details Menu</h1>
                            <div className="flex space-x-0">
                                <img className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5" src="src\assets\kawkookkapi.webp" alt="image" />
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
                <h1 className="text-3xl">
                    Type of Drink
                </h1>
            </div>
            <div className=" border rounded-[20px] h-[250px] w-[230px] ml-28">
                <img className="h-[125px] w-[230px] cursor-pointer rounded-[20px]" src="src\assets\kawkookkapi.webp" alt="image" onClick={() => setShowModalMenu(true)} />
                <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                    <h1>ข้าวคลุกกะปิ</h1>
                    <h1>70 ฿</h1>
                </div>
                <h2 className="flex pl-2">Fast foods</h2>
                <div className="flex pt-3 space-x-[115px] ">
                    <div className="flex">
                        <img className="h-[20px] pl-2 cursor-pointer" src="src\assets\star.svg" alt="star" />
                        <h1 className="pl-2">4.0</h1>
                    </div>
                    <img className="h-[30px] cursor-pointer" src="src\assets\add.svg" alt="add" />
                </div>

                {showModalMenu ? (
                    <div
                        id="BG"
                        onClick={hangleOnCloseModalMenu}
                        className="fixed inset-0 flex justify-center w-full h-full"
                    >
                        <div
                            className="w-[600px] h-[600px] mt-[100px] bg-slate-100 rounded-t-lg shadow-lg "
                        >
                            <h1 className="mt-6 text-4xl">Details Menu</h1>
                            <div className="flex space-x-0">
                                <img className="h-[200px] w-[230px] rounded-[20px] ml-6 mt-5" src="src\assets\kawkookkapi.webp" alt="image" />
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
    )
}
