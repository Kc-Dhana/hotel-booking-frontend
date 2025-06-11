import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { RiDoorOpenLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbPhoto } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

import AdminBooking from "../admin/Bookings/adminBookings";
import AdminRooms from "../admin/Rooms/room";
import AdminUsers from "../admin/Users/users";
import AdminFeedback from "../admin/Feedback/feedback";
import AdminGalleryItems from "../admin/GalleryItems/galleryItems";
import AdminCategories from "../admin/Categories/adminCategories";
import AddCategoryForm from "../admin/addCategoryForm/addCategoryForm";
import UpdateCategoryForm from "../admin/UpdateCategoryForm/updateCategory";
import AddGalleryItemForm from "../admin/AddGalleryForm/addGalleryForm";
import UpdateGalleryItemForm from "../admin/UpdateGalleryForm/updateGalleryForm";
import AddRoomForm from "../admin/Rooms/createRoom";
import UpdateRoomForm from "../admin/Rooms/updateRoom";
import UpdateBookingForm from "../admin/Bookings/updateBooking";

export default function AdminPage() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [isChecking, setIsChecking] = useState(true); // <-- NEW

   

    useEffect(() => {
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.type !== "admin") {
                navigate("/"); // Redirect non-admins
            } else {
                setAdmin(parsedUser);
                setIsChecking(false); // ✅ Check done
            }
        } else {
            navigate("/login"); // Redirect if not logged in
        }
    }, [navigate]);

    if (isChecking) return null; // ⛔ Prevent flash while checking auth

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        navigate("/login");
    };

    const defaultImage = "https://www.w3schools.com/howto/img_avatar.png"; // fallback image

    return (
        <div className="w-full h-screen flex font-sans">

            {/* Sidebar */}
            <div className="w-[20%] bg-blue-500 h-full flex flex-col justify-between shadow-lg">
                <div className="flex flex-col">

                    {/* Brand name */}
                    <h2 className="text-white text-4xl font-bold px-4 py-5 border-b border-white/20">
                        Leonine Villa
                    </h2>

                    {/* Nav links */}
                    <Link to="/admin/bookings" className="text-white text-[18px] hover:bg-blue-600 flex items-center px-4 py-3 gap-3">
                        <CiBookmarkCheck size={22} />
                        Bookings
                    </Link>
                    <Link to="/admin/categories" className="text-white text-[18px] hover:bg-blue-600 flex items-center px-4 py-3 gap-3">
                        <MdOutlineCategory size={22} />
                        Categories
                    </Link>
                    <Link to="/admin/rooms" className="text-white text-[18px] hover:bg-blue-600 flex items-center px-4 py-3 gap-3">
                        <RiDoorOpenLine size={22} />
                        Rooms
                    </Link>
                    <Link to="/admin/users" className="text-white text-[18px] hover:bg-blue-600 flex items-center px-4 py-3 gap-3">
                        <LuUsers size={22} />
                        Users
                    </Link>
                    <Link to="/admin/feedback" className="text-white text-[18px] hover:bg-blue-600 flex items-center px-4 py-3 gap-3">
                        <BiMessageSquareDetail size={22} />
                        Feedback
                    </Link>
                    <Link to="/admin/gallery-items" className="text-white text-[18px] hover:bg-blue-600 flex items-center px-4 py-3 gap-3">
                        <TbPhoto size={22} />
                        Gallery Items
                    </Link>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="text-white text-[18px] hover:bg-red-600 flex items-center justify-start px-4 py-3 gap-3 w-full border-t border-white/20"
                >
                    <FiLogOut size={22} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="w-[80%] bg-blue-50 h-full overflow-y-auto flex flex-col">

             {/* Topbar */}
                <div className="bg-gray-800 shadow-md p-4 flex items-center justify-between border-b border-gray-700 text-white">
                    {/* Left Side - Welcome Text */}
                    <h2 className="text-xl font-semibold">
                        Welcome to Admin Dashboard
                    </h2>

                    {/* Right Side - Admin Info */}
                    <div className="flex items-center gap-4">
                        <img
                            src={admin?.image || defaultImage}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border border-white"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">
                                {admin?.firstName} {admin?.lastName}
                            </h2>
                            <p className="text-sm text-gray-300">{admin?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Routes path="/*">
                        <Route path="bookings" element={<AdminBooking />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="add-category" element={<AddCategoryForm />} />
                        <Route path="update-category" element={<UpdateCategoryForm />} />
                        <Route path="rooms" element={<AdminRooms />} />
                        <Route path="add-rooms" element={<AddRoomForm />} />
                        <Route path="update-rooms" element={<UpdateRoomForm />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="feedback" element={<AdminFeedback />} />
                        <Route path="gallery-items" element={<AdminGalleryItems />} />
                        <Route path="add-gallery-item" element={<AddGalleryItemForm />} />
                        <Route path="update-gallery-item" element={<UpdateGalleryItemForm />} />
                        <Route path="update-booking" element={<UpdateBookingForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
