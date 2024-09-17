import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 p-4 relative w-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div >
            <a href="/home"><img className=" w-36" src="src\assets\Brown Simple Icon Food Logo-depositphotos-bgremover.png" /></a>
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
            <div className="ml-4">
              <Link to="/customer">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Profile Image"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <div className=" mt-2 ml-5">
              <a href="/order"><i className="fa-solid fa-cart-shopping fa-2xl text-white hover:text-gray-300"></i></a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
