import Navbar from "./navbar";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Thyroidimg from "@/assets/imgforhome/Thiroidimg.jpg";
import WarningBanner from "@/components/ui/warning";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuInterface } from "@/interfaces";
import { GetMenuByDisease } from "@/services/https/Menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/components/ui/cartContext";

export function ThyroidFood() {
  const [temp, setTemp] = useState<MenuInterface[][] | undefined>()
  const { addMenu } = useContext(CartContext);

  const handleGetAllMenu = async () => {
    const res = await GetMenuByDisease(2);
    if (res) {
      const r = groupBy<MenuInterface>(res, "MenuTypeID")
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

  return (
    <div>
      <Navbar />
      <div className="mt-28 justify-center flex ">
      <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex">
                <NavigationMenuItem>
                  <Link to={"/home"}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      อาหารเพื่อสุขภาพ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/diabetesfood"}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      อาหารสำหรับโรคเบาหวาน
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/kidnyfood"}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    อาหารสำหรับโรคไต
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/gastritistfood"}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    อาหารสำหรับโรคกระเพาะ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/thyroidfood"}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    อาหารสำหรับโรคไทรอยด์
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
      </div>
      <div>
        <WarningBanner message={"กรุณาสั่งอาหารก่อน 1 วัน เนื่องจากทางร้านจะต้องเตรียมวัตถุดิบ"} />
      </div>
      <div className="flex ml-[100px] text-black text-2xl font-bold font-['Inter']">
        อาหารสำหรับผู้ป่วยโรคไทรอยด์เป็นพิษ (Thyroid Foods)
      </div>
      <div className="w-[1570px] h-[360px] bg-slate-100 mt-[5px] ml-[5px] rounded-xl left-[144px] border-[1px]"></div>
      <div className="mt-[-328px] ml-[200px] ">
        <img src={Thyroidimg} alt="Thyroidimg" className="w-[500px] h-[300px]" />
      </div>
      <div className="ml-[750px] mt-[-270px] font-['Inter'] text-[20px] absolute">
        "อาหารสำหรับผู้ป่วยโรคไทรอยด์เป็นพิษควรเน้นการบริโภคอาหารที่ช่วยควบคุม<br />
        การทำงานของต่อมไทรอยด์ โดยหลีกเลี่ยงอาหารที่มีสารไอโอดีนสูง เช่น อาหารทะเล สาหร่ายทะเล  <br />
        แนะนำให้รับประทานผักที่ไม่กระตุ้นการทำงานของต่อมไทรอยด์ เช่น ผักกาดขาว  <br />
        บรอกโคลี ดอกกะหล่ำ และเกลือเสริมไอโอดีน รวมถึงอาหารที่มีโปรตีนสูงจากแหล่งที่มีไขมันต่ำ  <br />
        เช่น เนื้อไก่ไม่ติดมัน ปลา และถั่วต่างๆ ควรหลีกเลี่ยงการบริโภคคาเฟอีน แอลกอฮอล์  <br />
        และอาหารที่มีน้ำตาลสูง การวางแผนอาหารที่เหมาะสมและปรึกษาแพทย์หรือนักโภชนาการ <br />
        จะช่วยให้ควบคุมอาการและรักษาสุขภาพได้ดีขึ้น" 🌿🍗🥦
      </div>

      {temp &&
        temp.map((temps, outerKey) => (
          <div key={outerKey}>
            <div className="flex ml-28 mt-[50px]">
              <h1 className="text-2xl font-['Inter'] font-bold">{`${temps[0].MenuType?.Name} Foods`}</h1>
            </div>
            <div className="ml-28 px-7 flex gap-10 mt-3 flex-wrap">
              {temps.map((menu: MenuInterface, innerKey: number) => (
                <div key={`${outerKey}-${innerKey}`} className="border rounded-[20px]">
                  <Dialog>
                    <DialogTrigger>
                      <img
                        className="h-[125px] w-[230px] cursor-pointer rounded-[20px]"
                        src={menu.MenuImage}
                        alt="image"
                      />
                    </DialogTrigger>
                    <div className="w-full flex flex-row justify-between p-2">
                      <h1>{menu.Name}</h1>
                      <h1>{`${menu.Cost} ฿`}</h1>
                    </div>
                    <h2 className="flex pl-2">{temps[0].MenuType?.Name}</h2>
                    <div className="flex space-x-[115px]">
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
                        <DialogTitle className="text-center text-2xl">รายละเอียดเมนู</DialogTitle>
                        <DialogDescription>
                          <div className="text-black space-y-4">
                            <div className="flex">
                              <img
                                className="h-[200px] w-[230px] rounded-lg object-cover"
                                src={menu.MenuImage}
                                alt="Product Image"
                              />
                              <div className="w-full ml-5">
                                <div className="flex justify-between">
                                  <p className="text-xl font-semibold">{menu.Name}</p>
                                  <p className="text-xl text-gray-700">{`${menu.Cost} บาท`}</p>
                                </div>
                                <p className="text-lg">{temps[0].MenuType?.Name} Foods</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xl">ส่วนประกอบอาหาร</p>
                              <div>
                                {menu.Component.map((component, index) => (
                                  <p key={index} className="text-base ml-4">
                                    {index + 1}. {component}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xl">ประเภทของอาหาร</p>
                              <div>
                                {menu.Diseases?.map((type, index) => (
                                  <p key={index} className="text-base ml-4">
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
                          className="hover:bg-green-100 hover:border-green-600"
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
  );
}
