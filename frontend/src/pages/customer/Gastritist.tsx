import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Gastritistimg from "@/assets/imgforhome/Gastritistimg.jpg";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu } from "@/interfaces";
import { GetAllMenu } from "@/services/https/Menu";

export function GastritistFood() {
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [temp, setTemp] = useState<Menu[][] | undefined>()

  const handleGetAllMenu = async () => {
    let res = await GetAllMenu();
    if (res) {
      const r = groupBy<Menu>(res, "MenuTypeID")
      setTemp([])
      Object.keys(r).forEach(key => {

        setTemp(prevTemp => [...(prevTemp || []), r[key as keyof typeof r]]);
      });
      console.log(temp);

    } else {
      console.log("Get menu not found");
      console.log(res);
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
    }, {} as any); // tried to figure this out, help!!!!!
    return groupedResult
  }

  const hangleOnCloseModalMenu = (e: any) => {
    if (e.target.id == "BG") {
      setShowModalMenu(false);
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
        อาหารสำหรับผู้ป่วยโรคกระเพาะอาหารอักเสบ (Gastritist Foods)
      </div>

      <div className="w-[1570px] h-[360px] bg-slate-100   mt-[70px] ml-[5px] rounded-xl left-[144px] border-[1px]"></div>
      <div className="mt-[-328px] ml-[200px] ">
        <img src={Gastritistimg} alt="Gastritist" className="w-[500px] h-[300px]" />
      </div>
      <div className="ml-[750px] mt-[-270px] font-['Inter'] text-[20px] absolute">
        "อาหารสำหรับผู้ป่วยโรคกระเพาะอาหารอักเสบควรเน้นการเลือกรับประทานอาหารที่ย่อยง่าย <br />
        และไม่กระตุ้นให้เกิดการระคายเคืองในกระเพาะอาหาร เช่น ข้าวสวย ข้าวต้ม เนื้อสัตว์ที่ไม่ติดมัน ปลา <br />
        ผักที่ต้มสุกและผลไม้ที่ไม่เป็นกรด หลีกเลี่ยงอาหารที่มีไขมันสูง อาหารรสจัด เช่น เผ็ด เปรี้ยว เค็ม <br />
        รวมถึงอาหารทอด อาหารกระป๋อง และเครื่องดื่มที่มีคาเฟอีนหรือแอลกอฮอล์  <br />
        ควรแบ่งอาหารเป็นมื้อย่อยๆ หลายครั้งในวันเพื่อช่วยลดการสร้างกรดในกระเพาะอาหาร  <br />
        การเลือกอาหารที่เหมาะสม สามารถช่วยลดอาการอักเสบและส่งเสริมสุขภาพของกระเพาะอาหาร <br />
        ได้อย่างมีประสิทธิภาพ" 🍲🍗🥕
      </div>

      {temp &&
        temp.map((temps, outerKey) => (
          <div key={outerKey}>
            <div className="flex ml-28 mt-[50px]">
              <h1 className="text-2xl  font-['Inter'] font-bold">{`${temps[0].MenuType.Name} Foods`}</h1>
            </div>
            <div className="ml-28 px-7 flex gap-10 mt-3 flex-wrap">
              {temps.map((menu: Menu, innerKey: number) => (
                <div key={`${outerKey}-${innerKey}`}>
                  <img
                    className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
                    src={menu.MenuImage}
                    alt="image"
                    onClick={() => setShowModalMenu(true)}
                  />
                  <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                    <h1>{menu.Name}</h1>
                    <h1>{`${menu.Cost} ฿`}</h1>
                  </div>
                  <h2 className="flex pl-2">{temps[0].MenuType.Name}</h2>
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
                      typeof="button"
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
                            src={menu.MenuImage}
                            alt="image"
                          />
                          <div className=" flex flex-row space-x-[100px] pl-2 mt-[20px]">
                            <h1>{menu.Name}</h1>
                            <h1>{`${menu.Cost}฿`}</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className="mt-6 text-4xl">Component Food</h1>
                          <h1>{`${menu.Component[3]}`}</h1>
                        </div>
                        <div>
                          <h1 className="mt-6 text-4xl">Type Food</h1>
                          {/* <h1>{menu.MenuType[0]}</h1>
                                                    <h1>{menu.MenuType[0]}</h1>
                                                    <h1>{menu.MenuType[0]}</h1>
                                                    <h1>{menu.MenuType[0]}</h1> */}
                        </div>
                      </div>
                    </div>
                  ) : null}

                </div>
              ))}</div>
          </div>

        ))
      }
    </div>
  );
}
