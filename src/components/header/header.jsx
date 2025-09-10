import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaInfoCircle, FaImages, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useState, useEffect } from "react";
import UserTag from "../userData/userdata"; // adjust path if needed

export default function Header() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  return (
    <header className="w-full bg-blue-500 flex justify-between items-center p-3 shadow-md relative">
      {/* Logo */}
      <h1 className="text-white text-2xl font-bold">Leonine Villa</h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <Link to="/" className="text-white flex items-center gap-2 hover:text-gray-200">
          <FaHome size={20} /> Home
        </Link>
        <Link to="/search" className="text-white flex items-center gap-2 hover:text-gray-200">
          <FaSearch size={20} /> Search Room
        </Link>
        <Link to="/about" className="text-white flex items-center gap-2 hover:text-gray-200">
          <FaInfoCircle size={20} /> About Us
        </Link>
        <Link to="/gallery" className="text-white flex items-center gap-2 hover:text-gray-200">
          <FaImages size={20} /> Gallery
        </Link>
      </nav>

      {/* Desktop Authentication */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <UserTag imageLink={user.imageUrl} />
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-white flex items-center gap-2 hover:text-gray-200">
              <AiOutlineLogin size={20} /> Login
            </Link>
            <Link to="/register" className="text-white flex items-center gap-2 hover:text-gray-200">
              <FaUserPlus size={20} /> Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-600 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button className="text-white text-2xl" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-start gap-4 px-6">
          <Link to="/" className="text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <FaHome size={20} /> Home
          </Link>
          <Link to="/search" className="text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <FaSearch size={20} /> Search Room
          </Link>
          <Link to="/about" className="text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <FaInfoCircle size={20} /> About Us
          </Link>
          <Link to="/gallery" className="text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <FaImages size={20} /> Gallery
          </Link>

          {user ? (
            <UserTag imageLink={user.imageUrl} />
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" className="text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <AiOutlineLogin size={20} /> Login
              </Link>
              <Link to="/register" className="text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <FaUserPlus size={20} /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
