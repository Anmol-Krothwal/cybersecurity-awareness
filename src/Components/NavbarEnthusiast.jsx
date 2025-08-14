import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../Slice/AuthSlice";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [navBg, setNavBg] = useState(
    "bg-white/80 backdrop-blur-md border-b border-gray-200"
  );
  const [textColor, setTextColor] = useState("text-gray-800");
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
        setNavBg(
          "bg-white/95 backdrop-blur-lg border-b border-gray-300 shadow-sm"
        );
        setTextColor("text-gray-800");
      } else {
        setNavBg("bg-white/80 backdrop-blur-md border-b border-gray-200");
        setTextColor("text-gray-800");
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 h-[5rem] px-4 flex items-center justify-between ${navBg} transition-colors duration-500`}
      >
        {/* Logo */}
        <Link to="/EnthusiastAct" className="flex items-center h-[3rem]">
          <img
            src="/assets/Image/Logo_Dark.png"
            alt="logo"
            className="h-full object-contain"
          />
        </Link>

        {/* Center Nav Links (desktop only) */}
        <div
          className={`hidden lg:flex items-center gap-8 text-[1.2rem] font-medium ${textColor}`}
        >
          {[
            { name: "Home", link: "/EnthusiastAct" },
            { name: "CyberWatch", link: "/CyberWatchEnthusiast" },
            { name: "About Us", link: "/About_usEnthusiast" },
            { name: "Contact", link: "/ContactusEnthusiast" },
          ].map((item) => (
            <Link
              key={item.name}
              className="relative hover:text-blue-600 transition-colors group"
              to={item.link}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-gradient-to-r from-blue-400 to-purple-400" />
            </Link>
          ))}
        </div>

        {/* Profile + Mobile Toggle */}
        <div className="flex items-center space-x-3 relative">
          {userData && (
            <div className="relative inline-block text-left">
              <div
                className="flex items-center gap-3 cursor-pointer hover:drop-shadow"
                onClick={toggleDropdown}
              >
                <img
                  src="/assets/Image/aboutus1.png"
                  alt="User"
                  className="h-10 w-10 rounded-full ring-1 ring-gray-300 object-cover"
                />
                <span className={`font-semibold ${textColor}`}>
                  {userData.name || "Account"}
                </span>
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-lg z-50">
                  <button
                    onClick={Logout_Function}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle (now hidden on lg and up) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${textColor} p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      <div className="h-[5rem]" />

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex justify-center items-center lg:hidden z-40">
          <div className="bg-white text-gray-800 p-6 rounded-2xl border border-gray-200 shadow-lg w-3/4 max-w-sm text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes size={22} />
            </button>
            <div className="flex flex-col space-y-4 mt-6 text-lg font-semibold">
              {[
                { name: "Home", link: "/EnthusiastAct" },
                { name: "CyberWatch", link: "/CyberWatchEnthusiast" },
                { name: "About Us", link: "/About_usEnthusiast" },
                { name: "Contact", link: "/ContactusEnthusiast" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
