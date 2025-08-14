import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [navBg, setNavBg] = useState("transparent");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const changeNavColors = () => {
      setNavBg(window.scrollY > 0 ? "white" : "transparent");
    };
    window.addEventListener("scroll", changeNavColors);
    return () => window.removeEventListener("scroll", changeNavColors);
  }, []);

  const handleCyberWatchClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className={`h-[4rem] w-full fixed top-0 left-0 z-50 grid grid-cols-4 ${
          navBg === "white" ? "nav_boxShadow bg-white" : "bg-transparent"
        } transition-all duration-700`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="col-span-1 w-full md:w-[55%] h-[3rem] my-auto lg:px-[2rem] md:px-[1rem] px-[0.5rem]"
        >
          <img
            src={
              navBg === "transparent"
                ? `/assets/Image/Logo_Light.png`
                : `/assets/Image/Logo_Dark.png`
            }
            alt="logo"
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Center Nav Links */}
        <div
          className={`col-span-2 list-none flex items-center justify-center hidden lg:flex space-x-10 text-lg font-medium font-Mukta px-[3rem] ${
            navBg === "transparent" ? "text-white" : "text-black"
          } transition-all duration-700`}
        >
          <Link to="/" className="hover:text-[#fa6741] cursor-pointer transition-transform hover:animate-bounceOnce">
            Home
          </Link>
          <span
            onClick={handleCyberWatchClick}
            className="hover:text-[#fa6741] cursor-pointer transition-transform hover:animate-bounceOnce"
          >
            CyberWatch
          </span>
          <Link to="/about_usW" className="hover:text-[#fa6741] cursor-pointer transition-transform hover:animate-bounceOnce">
            About Us
          </Link>
          <Link to="/contactusW" className="hover:text-[#fa6741] cursor-pointer transition-transform hover:animate-bounceOnce">
            Contact Us
          </Link>
        </div>

        {/* Right Side Login / Signup Buttons */}
        <div className="lg:col-span-1 col-span-2 text-sm lg:text-base flex lg:justify-end justify-center items-center font-Mukta lg:px-[3rem] md:px-[2rem] px-[1rem]">
          <Link
            to="/login"
            className={`animate-pulseGlow mx-[0.5rem] md:px-[1rem] md:py-[0.2rem] px-[0.5rem] py-[0.1rem] text-sm lg:text-base center border rounded-3xl ${
              navBg === "transparent"
                ? "border-white text-white"
                : "border-black text-black"
            } hover:border-[#fa6741] hover:text-white hover:bg-[#fa6741] transition`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`animate-pulseGlow mx-[0.5rem] md:px-[1rem] md:py-[0.2rem] px-[0.5rem] py-[0.1rem] text-sm lg:text-base center border rounded-3xl ${
              navBg === "transparent"
                ? "border-white text-white"
                : "border-black text-black"
            } hover:border-[#fa6741] hover:text-white hover:bg-[#fa6741] transition`}
          >
            SignUp
          </Link>
        </div>

        {/* Burger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden lg:px-[3rem] md:px-[2rem] px-[1rem] focus:outline-none z-50 flex justify-end items-center ${
            navBg === "white" ? "text-black" : "text-white"
          }`}
        >
          {isOpen ? (
            <FaTimes className="md:text-base sm:text-sm" />
          ) : (
            <FaBars className="md:text-base sm:text-sm" />
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center lg:hidden z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-sm text-center relative">
              <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
                <FaTimes size={28} />
              </button>
              <div className="flex flex-col space-y-4 text-lg">
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <span onClick={() => {
                  setIsOpen(false);
                  handleCyberWatchClick();
                }} className="cursor-pointer text-blue-600">CyberWatch</span>
                <Link to="/aboutusW" onClick={() => setIsOpen(false)}>About Us</Link>
                <Link to="/contactusW" onClick={() => setIsOpen(false)}>Contact Us</Link>
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">SignUp</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Access Restricted</h2>
            <p className="mb-6">You need to login first to view CyberWatch.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-[#fa6741] text-white rounded hover:bg-[#e15830]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
