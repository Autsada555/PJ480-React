
import iconprofile from '../../assets/iconprofile.png'
import iconsearch from '../../assets/search.png'

const Navbar = () => {

    return (
        <>
            <div className="relative">
                <div className="w-full h-[90px] bg-[#01BD63] flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="text-white text-xl font-normal font-['Inter'] leading-7">Food Logo</div>

                    <nav className="flex space-x-12 ">
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="search..."
                                    className="w-[900px] px-4 py-2 pr-10 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                                    style={{ paddingRight: '40px' }}
                                />
                                <img className="absolute right-0 top-0 mt-2 mr-3 w-6 h-6" src={iconsearch} alt="iconS" />
                            </div>

                        </div>
                        <a href="#" className="text-white text-xl font-normal font-['Inter'] leading-9">Home</a>
                        <a href="#" className="text-white text-xl font-normal font-['Inter'] leading-9">Menu</a>
                        <a href="#" className="text-white text-xl font-normal font-['Inter'] leading-9">About</a>
                        <a href="#" className="text-white text-xl font-normal font-['Inter'] leading-9">Contract</a>
                        <a href="#"><img  className="absolute right-0 top-3 w-12 h-12 mr-4 mt-2" src={iconprofile} alt="iconP" /></a>
                    </nav>

                </div>

            </div>
        </>
    );
};

export default Navbar;
