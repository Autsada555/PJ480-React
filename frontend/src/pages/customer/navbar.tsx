import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartContext } from "@/components/ui/cartContext";
import { useToast } from "@/components/ui/use-toast";
import { LogOutUser } from "@/services/https/login";
import { Plus, Minus, SignOut } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MenuOrder } from "@/interfaces";

function Navbar() {
  const { getMenus, getQuantity, removeMenu, getTotal, addQuantity } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast()
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const LogOut = async () => {
    try {
      const res = await LogOutUser(`${window.localStorage.getItem("usertype")}`);
      if (res.status) {
        toast({
          description: "ออกจากระบบเสร็จสิ้น",
        })

        setTimeout(() => {
        }, 1500)
        navigate("/", { replace: true });
      } else {
        toast({
          variant: "destructive",
          description: "มีบางอย่างผิดปกติทำให้ออกจากระบบไม่ได้",
        })
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <nav className="bg-green-600 p-4 fixed w-screen top-0 z-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <a href="/home">
              <img
                className=" w-36"
                src="src\assets\Brown Simple Icon Food Logo-depositphotos-bgremover.png"
              />
            </a>
          </div>

          <form className="flex items-center">
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className="w-[500px] px-4 py-2 rounded-[2px] border border-gray-300 "
            />
            <button
              type="submit"
              className="h-[42px] w-[42px] hover:bg-gray-500 bg-white rounded-[2px]"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="flex justify-between">
            <div className="flex space-x-4 mt-[6px]">
              <a href="/home" className="text-white hover:text-gray-300">
                หน้าหลัก
              </a>

              <a href="#" className="text-white hover:text-gray-300">
                เกี่ยวกับ
              </a>

              <a href="#" className="text-white hover:text-gray-300">
                บริการ
              </a>

              <a href="#" className="text-white hover:text-gray-300">
                ติดต่อ
              </a>
            </div>
            <div
              className="ml-4"
            >
              <Link to="/customer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <SignOut className="text-white cursor-pointer" size={32} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>คุณต้องการออกจากระบบใช่หรือไม่?</AlertDialogTitle>
                  {/* <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600" onClick={LogOut} >ยืนยัน</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="fixed top-6 right-10 z-20">
            <a onClick={handleCartClick} className="relative cursor-pointer">
              <i className="fa-solid fa-cart-shopping fa-3x text-white hover:text-gray-500 transition-all duration-300"></i>

              {getQuantity() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {getQuantity()}
                </span>
              )}
            </a>
          </div>

          {isModalOpen && (
            <div
              id="modal"
              className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-end items-start"
              onClick={closeModal}
            >
              <div
                className="bg-white border-2 border-green-600 w-full md:w-1/3 h-full p-4 rounded-l shadow-lg relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-black"
                  onClick={closeModal}
                >
                  X
                </button>

                <div className="px-3 py-2 text-sm text-black border-b border-green-600">
                  <h2 className="text-lg font-normal my-4">รถเข็นชอปปิ้งของคุณ</h2>
                </div>

                <div className="overflow-y-auto flex-grow p-5 custom-scrollbar h-full space-y-4">
                  {getMenus().length > 0 ? (
                    getMenus().map((menu, index) => (
                      <div key={menu.Menu.ID} className="flex items-center ">
                        <img
                          src={menu.Menu.MenuImage}
                          alt={`Product ${menu.Menu.Name}`}
                          className="mr-6 border-green-600 border aspect-square h-40"
                        />
                        <div className="flex justify-around  items-center w-full">
                          <div>
                            <p className="font-medium text-black">{menu.Menu.Name}</p>
                            <p className="font-medium text-black">{menu.Menu.Cost} บาท</p>
                          </div>
                          <div className=" flex space-x-2 items-center">
                            <div onClick={() => addQuantity(menu.Menu.ID, -1)}>
                              <Minus size={20} />
                            </div>
                            <p className=" border rounded-sm w-7 aspect-square text-center">
                              {menu.Quantity}
                            </p>
                            <div onClick={() => addQuantity(menu.Menu.ID, 1)}>
                              <Plus size={20} />
                            </div>
                          </div>
                          <div>
                            <p>{menu.Quantity * menu.Menu.Cost} บาท</p>
                          </div>
                        </div>
                        <button
                          className="text-gray-500 hover:text-red-500  "
                          onClick={() => removeMenu(index)}
                        >
                          ลบ
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-black">รถเข็นของคุณว่าง</p>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="px-3 py-6 text-xl text-black text-center border-y border-green-600 font-normal">
                    <p className="flex justify-between">
                      <span>ราคารวม</span>
                      <span>฿{getTotal()}</span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center ">
                    <Link to="/Payment">
                      <button className="bg-white text-green-600 font-bold py-2 px-4 rounded hover:bg-gray-300 w-full">
                        ไปจ่ายเงิน
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
