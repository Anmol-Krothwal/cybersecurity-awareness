import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../Slice/AuthSlice";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [navBg, setNavBg] = useState("bg-white");
  const [textColor, setTextColor] = useState("text-black");
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
        setTextColor("text-black");
      } else {
        setNavBg("bg-white");
        setTextColor("text-black");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 h-[5.5rem] px-6 flex items-center justify-between ${navBg} transition duration-700 border-b`}
      >
        {/* Logo */}
        <Link to="/SeniorAct" className="flex items-center h-[3rem]">
          <img
            src="/assets/Image/Logo_Dark.png"
            alt="Cyber Safety Logo"
            className="h-full object-contain"
          />
        </Link>

        {/* Center Nav */}
        <div
          className={`hidden lg:flex gap-10 text-xl font-semibold ${textColor}`}
        >
          <Link to="/SeniorAct" className="hover:text-blue-800 transition">Home</Link>
          <Link to="/CyberWatchSenior" className="hover:text-blue-800 transition">CyberWatch</Link>
          <Link to="/About_usSenior" className="hover:text-blue-800 transition">About Us</Link>
          <Link to="/ContactusSenior" className="hover:text-blue-800 transition">Contact</Link>
        </div>

        {/* Right Side - Profile */}
        <div className="flex items-center space-x-4 relative">
          {userData && (
            <div className="relative inline-block text-left">
              <div
                className="flex items-center gap-3 cursor-pointer hover:drop-shadow-lg"
                onClick={toggleDropdown}
                title="Open account options"
              >
                <img
                  src="/assets/Image/old.jpg"
                  alt="User Profile"
                  className="h-12 w-12 rounded-full border border-gray-400 shadow-sm object-cover"
                />
                <span className={`text-lg font-bold ${textColor}`}>
                  {userData.name || "Account"}
                </span>
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-fadeIn">
                  <button
                    onClick={Logout_Function}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-base text-red-600 hover:bg-red-100"
                    title="Logout from your account"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Toggle for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${textColor} focus:outline-none`}
            aria-label="Toggle navigation"
            title="Menu"
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Spacer to avoid content hiding behind navbar */}
      <div className="h-[5.5rem]"></div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center lg:hidden z-40">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md text-center relative">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsOpen(false)}
              title="Close menu"
            >
              <FaTimes size={28} />
            </button>
            <div className="flex flex-col space-y-6 mt-8 text-xl font-medium text-blue-800">
              <Link to="/SeniorAct" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/CyberWatchSenior" onClick={() => setIsOpen(false)}>CyberWatch</Link>
              <Link to="/About_usSenior" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link to="/ContactusSenior" onClick={() => setIsOpen(false)}>Contact</Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  Logout_Function();
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
