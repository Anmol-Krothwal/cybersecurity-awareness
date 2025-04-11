import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useLogoutUserMutation } from "../Slice/AuthSlice";
import { FaBars, FaTimes } from "react-icons/fa"; // Using react-icons for burger menu


const Navbar = () => {

    const [navBg, setNavBg] = useState('transparent');
    const [isOpen, setIsOpen] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
    const toggleDropdown = () => setIsOpen(!isOpen);

    let userData = useSelector((state) => state.user.userDetails);

    const Logout_Function = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const changeNavColors = () => {
            let offset = window.scrollY;
            if (offset > 0) {
                setNavBg('white');
            } else {
                setNavBg('transparent');
            }
        };
        window.addEventListener('scroll', changeNavColors);
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', changeNavColors);
        };
    }, []);

    return <>
        <div className={`h-[5rem] w-full fixed top-0 left-0 z-20 grid grid-cols-4 ${navBg === 'white' ? 'nav_boxShadow bg-white' : 'bg-transparent'} transition-all duration-700`}>
            <Link to="/" className="col-span-1 w-full md:w-[55%] h-[3rem] my-auto lg:px-[2rem] md:px-[1rem] px-[0.5rem]">
                <img src={navBg === 'transparent' ? `/assets/Image/Logo_Light.png` : `/assets/Image/Logo_Dark.png`} alt="logo" className="h-full w-full object-contain" />
            </Link>
            <div className={`col-span-2 list-none flex items-center justify-center hidden lg:flex space-x-10 text-lg font-medium font-Mukta px-[3rem] ${navBg === 'transparent' ? 'text-white' : 'text-black'} transition-all duration-700`}>
                <Link to="/tours" className="hover:text-[#fa6741] cursor-pointer">Tours</Link>
                <li className="hover:text-[#fa6741] cursor-pointer">Coming Soon</li>
                <Link to="/aboutus" className="hover:text-[#fa6741] cursor-pointer">About Us</Link>
                <Link to="/contactus" className="hover:text-[#fa6741] cursor-pointer">Contact Us</Link>
            </div>
            <div className="lg:col-span-1 col-span-2 text-sm lg:text-base flex lg:justify-end justify-center items-center list-none font-Mukta g:hidden lg:px-[3rem] md:px-[2rem] px-[1rem]">
                {
                    userData ? (
                        <div className="relative inline-block">
                            {/* User Icon */}
                            <img
                                src={`/assets/Image/user.png`}
                                alt="User Icon"
                                onClick={toggleDropdown}
                                className="h-10 w-10 rounded-full cursor-pointer object-cover"
                            />
                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <div className="py-2">
                                        <Link to="/profile"
                                            className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => Logout_Function()}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (

                        <>
                            <Link to="/login" className={`mx-[0.5rem] md:px-[1rem] md:py-[0.2rem] px-[0.5rem] py-[0.1rem] text-sm lg:text-base center border rounded-3xl ${navBg === 'transparent' ? 'border-white text-white' : 'border-black text-black'} hover:border-[#fa6741] hover:text-white hover:bg-[#fa6741] cursor-pointer`}>Login</Link>
                            <Link to="/signup" className={`mx-[0.5rem] md:px-[1rem] md:py-[0.2rem] px-[0.5rem] py-[0.1rem] text-sm lg:text-base center border rounded-3xl ${navBg === 'transparent' ? 'border-white text-white' : 'border-black text-black'} hover:border-[#fa6741] hover:text-white hover:bg-[#fa6741] cursor-pointer`}>SignUp</Link>
                        </>
                    )
                }
            </div>
            {/* Burger Menu for Mobile */}
            <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden lg:px-[3rem] md:px-[2rem] px-[1rem] focus:outline-none z-50 flex justify-end items-center ${navBg === 'white' ? 'text-black' : 'text-white'}`}>
                {isOpen ? <FaTimes className="md:text-base sm:text-sm" /> : <FaBars className="md:text-base sm:text-sm" />}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center lg:hidden z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-sm text-center relative">
                        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
                            <FaTimes size={28} />
                        </button>
                        <div className="flex flex-col space-y-4 text-lg">
                            <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Tours</a>
                            <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Coming</a>
                            <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Blog</a>
                            <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>About Us</a>
                            <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Contact Us</a>
                        </div>
                        <div className="mt-4 flex flex-col space-y-2">
                            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">Login</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Signup</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}

export default Navbar;