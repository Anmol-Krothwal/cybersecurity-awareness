import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../Slice/AuthSlice";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [navBg, setNavBg] = useState("bg-gradient-to-r from-gray-200 to-gray-400");
  const [textColor, setTextColor] = useState("text-gray-900");
  const [isOpen, setIsOpen] = useState(false);

  const [logoutUser] = useLogoutUserMutation();
  const userData = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const Logout_Function = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setNavBg("bg-white shadow-md");
        setTextColor("text-gray-800");
      } else {
        setNavBg("bg-gradient-to-r from-gray-100 to-gray-300");
        setTextColor("text-gray-900");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 h-[5rem] px-4 flex items-center justify-between ${navBg} transition duration-700`}>
        {/* Logo */}
        <Link to="/AdultAct" className="flex items-center h-[3rem]">
          <img src="/assets/Image/Logo_Dark.png" alt="logo" className="h-full object-contain" />
        </Link>

        {/* Center Nav Links */}
        <div className={`hidden lg:flex space-x-8 text-lg font-medium ${textColor}`}>
          <Link to="/AdultAct" className="hover:text-blue-700 transition">Home</Link>
          <Link to="/CyberWatchAdult" className="hover:text-blue-700 transition">CyberWatch</Link>
          <Link to="/About_usAdult" className="hover:text-blue-700 transition">About Us</Link>
          <Link to="/ContactusAdult" className="hover:text-blue-700 transition">Contact</Link>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center space-x-3 relative">
          {userData && (
            <div className="relative inline-block text-left">
              <div className="flex items-center gap-4 cursor-pointer hover:drop-shadow-md" onClick={toggleDropdown}>
                <img
                  src="/assets/Image/adult.jpg"
                  alt="User"
                  className="h-10 w-10 rounded-full border border-white shadow-sm object-cover"
                />
                <span className={`font-semibold ${textColor}`}>{userData.name || "Account"}</span>
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fadeIn">
                  <button
                    onClick={Logout_Function}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden ${textColor} focus:outline-none`}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div className="h-[5rem]"></div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center lg:hidden z-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-3/4 max-w-sm text-center relative">
            <button className="absolute top-3 right-3" onClick={() => setIsOpen(false)}>
              <FaTimes size={24} />
            </button>
            <div className="flex flex-col space-y-5 mt-8 text-lg font-semibold text-blue-700">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/resources" onClick={() => setIsOpen(false)}>Resources</Link>
              <Link to="/contactus" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
