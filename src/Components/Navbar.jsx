import Logo_Light from "../assets/Image/Logo_Light.png";
import Logo_Dark from "../assets/Image/Logo_Dark.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import user from "../assets/Image/user.png"
import { useLogoutUserMutation } from "../Slice/AuthSlice";


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
        <div className={`h-[5rem] w-full fixed top-0 left-0 z-20 px-[3rem] grid grid-cols-4 ${navBg === 'white' ? 'nav_boxShadow bg-white' : 'bg-transparent'} transition-all duration-700`}>
            <Link to="/" className="col-span-1 w-[55%] h-[3rem] my-auto">
                <img src={navBg === 'transparent' ? Logo_Light : Logo_Dark} alt="logo" className="h-full w-full object-contain" />
            </Link>
            <div className={`col-span-2 list-none flex justify-evenly items-center font-Mukta px-[3rem] ${navBg === 'transparent' ? 'text-white' : 'text-black'} transition-all duration-700`}>
                <Link to="/tours" className="hover:text-[#fa6741] cursor-pointer">Tours</Link>
                <li className="hover:text-[#fa6741] cursor-pointer">Coming Soon</li>
                <Link to="/Blogs" className="hover:text-[#fa6741] cursor-pointer" >Blogs</Link>
                <Link to="/aboutus" className="hover:text-[#fa6741] cursor-pointer">About Us</Link>
                <Link to="/contactus" className="hover:text-[#fa6741] cursor-pointer">Contact Us</Link>
            </div>
            <div className="col-span-1 flex justify-end items-center list-none font-Mukta">
                {
                    userData ? (
                        <div className="relative inline-block">
                            {/* User Icon */}
                            <img
                                src={user}
                                alt="User Icon"
                                onClick={toggleDropdown}
                                className="h-10 w-10 rounded-full cursor-pointer object-cover"
                            />
                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <div className="py-2">
                                        <Link to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                            <Link to="/login" className={`mx-[0.5rem] px-[1rem] py-[0.2rem] center border rounded-3xl ${navBg === 'transparent' ? 'border-white text-white' : 'border-black text-black'} hover:border-[#fa6741] hover:text-white hover:bg-[#fa6741] cursor-pointer`}>Login</Link>
                            <Link to="/signup" className={`mx-[0.5rem] px-[1rem] py-[0.2rem] center border rounded-3xl ${navBg === 'transparent' ? 'border-white text-white' : 'border-black text-black'} hover:border-[#fa6741] hover:text-white hover:bg-[#fa6741] cursor-pointer`}>SignUp</Link>
                        </>
                    )
                }
            </div>
        </div>
    </>
}

export default Navbar;