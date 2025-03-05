import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaInfoCircle, FaImages, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useState, useEffect } from "react";

export default function Header() {
    const [user, setUser] = useState(null);

    // Get user details from localStorage when component mounts
    useEffect(() => {
        const userDetails = localStorage.getItem("userDetails"); // Get user details from localStorage
        if (userDetails) {
            setUser(JSON.parse(userDetails)); // Set user state with parsed details
        }
    }, []);

    // Logout function to clear localStorage and redirect
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        setUser(null); // Reset user state
        window.location.href = "/login"; // Redirect to login page
    }

    return (
        <header className="w-full bg-blue-500 flex justify-between items-center p-4 shadow-md">
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
                    // If logged in, show user details and logout
                    <div className="flex items-center gap-4">
                        <span className="text-white">{user.firstName} {user.lastName}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded flex items-center gap-2">
                            <FaSignOutAlt size={20} /> Logout
                        </button>
                    </div>
                ) : (
                    // If not logged in, show Login & Register
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
