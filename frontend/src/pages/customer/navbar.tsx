

function Navbar() {

    return (

        <nav className="bg-green-600 p-4">

            <div className="container mx-auto">

                <div className="flex justify-between items-center">

                    <div className="text-white font-bold text-xl">My Website Customer</div>

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
                            {/* <img className="h-[30px] flex pl-[6px]" src="src\assets\search.png" alt="search" /> */}
                            <i className="fas fa-search"></i>
                        </button>
                    </form>


                    <div className="hidden md:flex space-x-4">

                        <a href="/" className="text-white hover:text-gray-300">Home</a>

                        <a href="#" className="text-white hover:text-gray-300">About</a>

                        <a href="#" className="text-white hover:text-gray-300">Services</a>

                        <a href="#" className="text-white hover:text-gray-300">Contact</a>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;