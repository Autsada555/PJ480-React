import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartContext } from "@/components/ui/cartContext";
import { Menu } from "@/interfaces";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { getMenus, getAmount, removeMenu, getTotal } = useContext(CartContext);
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

              {getAmount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {getAmount()}
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

                <div className="overflow-y-auto flex-grow p-5 custom-scrollbar h-full">
                  {getMenus().length > 0 ? (
                    getMenus().map((menu: Menu, index) => (
                      <div key={menu.ID} className="flex items-center mb-4">
                        <img
                          src={menu.MenuImage}
                          alt={`Product ${menu.ID}`}
                          className="mr-6 border-black border aspect-square h-40"
                        />
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <p className="font-medium text-black">{menu.Name}</p>
                            <p className="text-black">Quantity (1)</p>
                            <p className="font-medium text-black">{menu.Cost}</p>
                          </div>
                          <button
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => removeMenu(index)}
                          >
                            Remove
                          </button>
                        </div>
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

                  <div className="px-3 py-4 text-sm text-black text-center  border-black">
                    <p>Shipping & taxes calculated at checkout</p>
                    <p className="text-sm text-black">
                      Free standard shipping within Kyiv
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center border">
                    <Link to="/checkout">
                      <button className="bg-white text-green-600 font-bold py-2 px-4 rounded hover:bg-gray-300 w-full">
                        Go to Checkout
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
