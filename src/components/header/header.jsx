import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaInfoCircle, FaImages, FaUserPlus } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useState, useEffect } from "react";
import UserTag from "../userData/userdata"; // adjust the path based on your project structure

export default function Header() {
    const [user, setUser] = useState(null);

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

            {/* Navigation Links */}
            <nav className="flex gap-6">
                <Link to="/" className="text-white flex items-center gap-2">
                    <FaHome size={20} /> Home
                </Link>
                <Link to="/search" className="text-white flex items-center gap-2">
                    <FaSearch size={20} /> Search Room
                </Link>
                <Link to="/about" className="text-white flex items-center gap-2">
                    <FaInfoCircle size={20} /> About Us
                </Link>
                <Link to="/gallery" className="text-white flex items-center gap-2">
                    <FaImages size={20} /> Gallery
                </Link>
            </nav>

            {/* Authentication Section */}
            <div className="flex items-center gap-4">
                {user ? (
                    <UserTag imageLink={user.imageUrl} />
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="text-white flex items-center gap-2">
                            <AiOutlineLogin size={20} /> Login
                        </Link>
                        <Link to="/register" className="text-white flex items-center gap-2">
                            <FaUserPlus size={20} /> Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
