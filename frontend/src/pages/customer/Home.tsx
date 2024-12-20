import Navbar from "./navbar";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Healthimg from "@/assets/imgforhome/Healthimg.jpg";
import WarningBanner from "@/components/ui/warning";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "@/interfaces";
import { GetAllMenu } from "@/services/https/Menu";
import { CartContext } from "@/components/ui/cartContext";
import { Button } from "@/components/ui/button";

export function Home() {
  const [temp, setTemp] = useState<Menu[][] | undefined>();
  const { addMenu } = useContext(CartContext);

  const handleGetAllMenu = async () => {
    const res = await GetAllMenu(1);
    console.log(res);
    if (res) {
      const r = groupBy<Menu>(res, "MenuTypeID");
      setTemp([]);
      Object.keys(r).forEach((key) => {
        setTemp((prevTemp) => [...(prevTemp || []), r[key as keyof typeof r]]);
      });
    } else {
      console.log("Get menu not found");
    }
  };
  useEffect(() => {
    handleGetAllMenu();
  }, []);

  function groupBy<T>(collection: T[], key: keyof T) {
    const groupedResult = collection.reduce((previous, current) => {
      if (!previous[current[key]]) {
        previous[current[key]] = [] as T[];
      }
      previous[current[key]].push(current);
      return previous;
    }, {} as any); 
    return groupedResult;
  }


  return (
    <>
      <Navbar />
      <div>
        <div className="mt-28 justify-center flex ">
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
        <div>
        <div>
            <WarningBanner message={"กรุณาสั่งอาหารก่อน 1 วัน เนื่องจากทางร้านจะต้องเตรียมวัตถุดิบ"}/>
        </div>
          <div className="flex ml-[100px] text-black text-2xl font-bold font-['Inter']">
            อาหารเพื่อสุขภาพ (Healthy Foods)
          </div>
          <div className="w-full h-[360px] bg-slate-100  rounded-xl left-[144px] border-[1px]">
            <div className="flex w-full justify-center mt-7">
              <div className="">
                <img src={Healthimg} alt="Healthimg" className="w-[500px] h-[300px]" />
              </div>
              <div className="ml-[200px] font-['Inter'] text-[20px] flex items-center">
                "อาหารสุขภาพคือการบริโภคอาหารที่มีประโยชน์และเต็มไปด้วย <br />
                สารอาหารที่จำเป็นต่อร่างกายเช่น ผัก ผลไม้ ธัญพืช และโปรตีนที่มีคุณภาพ{" "}
                <br />
                การรับประทานอาหารสุขภาพช่วยเสริมสร้างระบบภูมิคุ้มกัน <br />
                เพิ่มพลังงาน และส่งเสริมการมีชีวิตที่สมดุลและสุขภาพดี" 🌿🥗
              </div>
            </div>
          </div>
        </div>
        {temp &&
          temp.map((temps, outerKey) => (
            <div key={outerKey}>
              <div className="flex ml-28 mt-[50px]">
                <h1 className="text-2xl  font-['Inter'] font-bold">{`${temps[0].MenuType?.Name} Foods`}</h1>
              </div>
              <div className="ml-28 px-7 flex gap-10 mt-3 flex-wrap ">
                {temps.map((menu: Menu, innerKey: number) => (
                  <div key={`${outerKey}-${innerKey}`} className="border rounded-[20px]">
                    <Dialog>
                      <DialogTrigger>
                        <img
                          className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
                          src={menu.MenuImage}
                          alt="image"
                        // onClick={() => setShowModalMenu(true)}
                        />
                      </DialogTrigger>
                      <div className="w-full flex flex-row justify-between p-2  ">
                        <h1>{menu.Name}</h1>
                        <h1>{`${menu.Cost} ฿`}</h1>
                      </div>
                      <h2 className="flex pl-2">{temps[0].MenuType?.Name}</h2>
                      <div className="flex space-x-[115px] ">
                        <div className="flex p-2">
                          <img
                            className="h-[20px] pl-2 cursor-pointer"
                            src="src\assets\star.svg"
                            alt="star"
                          />
                          <h1 className="pl-3">5.0</h1>
                        </div>
                        <div onClick={() => addMenu(menu)}>
                          <img
                            className="h-[30px] cursor-pointer"
                            src="src\assets\add.svg"
                            alt="add"
                          />
                        </div>
                      </div>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className=" text-center text-2xl">
                            รายละเอียดเมนู
                          </DialogTitle>
                          <DialogDescription>
                            <div className=" text-black space-y-4">
                              <div className=" flex">
                                <img
                                  className="h-[200px] w-[230px] rounded-lg object-cover"
                                  src={menu.MenuImage}
                                  alt="Product Image"
                                />
                                <div className=" w-full ml-5">
                                  <div className="flex justify-between">
                                    <p className="text-xl  font-semibold">{menu.Name}</p>
                                    <p className="text-xl text-gray-700">{`${menu.Cost} บาท`}</p>
                                  </div>
                                  <p className="text-lg">
                                    {temps[0].MenuType?.Name} Foods
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className=" text-xl">ส่วนประกอบอาหาร</p>
                                <div>
                                  {menu.Component.map((component, index) => (
                                    <p className=" text-base ml-4">
                                      {index + 1}. {component}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className=" text-xl">ประเภทของอาหาร</p>
                                <div>
                                  {menu.Disease?.map((type, index) => (
                                    <p className=" text-base ml-4">
                                      {index + 1}. {type.Name}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => addMenu(menu)}
                            variant="outline"
                            className=" hover:bg-green-100 hover:border-green-600"
                          >
                            เพิ่มลงตะกร้า
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
