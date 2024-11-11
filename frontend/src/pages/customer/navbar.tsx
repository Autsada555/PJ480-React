import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartContext } from "@/components/ui/cartContext";
import { Plus, Minus } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { getMenus, getQuantity, removeMenu, getTotal, addQuantity } =
    useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

  const handleCartClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
                Home
              </a>

              <a href="#" className="text-white hover:text-gray-300">
                About
              </a>

              <a href="#" className="text-white hover:text-gray-300">
                Services
              </a>

              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </div>
            <div
              className="ml-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/customer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </div>
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

                <div className="px-3 py-2 text-sm text-black border-b border-black">
                  <h2 className="text-lg font-normal my-4">Shopping Cart</h2>
                </div>

                <div className="overflow-y-auto flex-grow p-5 custom-scrollbar h-full space-y-4">
                  {getMenus().length > 0 ? (
                    getMenus().map((menu, index) => (
                      <div key={menu.Menu.ID} className="flex items-center ">
                        <img
                          src={menu.Menu.MenuImage}
                          alt={`Product ${menu.Menu.Name}`}
                          className="mr-6 border-black border aspect-square h-40"
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
                    <p className="text-black">Your cart is empty</p>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="px-3 py-6 text-xl text-black text-center border-y border-black font-normal">
                    <p className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getTotal()}</span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center border">
                    <Link to="/Payment">
                      <button className="bg-white text-green-600 font-bold py-2 px-4 rounded hover:bg-gray-300 w-full">
                        Go to Payment
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
