import { Routes, Route, Link } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { RiDoorOpenLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbPhoto } from "react-icons/tb";

export default function AdminPage() {
    return (
        <div className="w-full max-h-[100vh] overflow-hidden flex">

            {/* Sidebar */}
            <div className="w-[20%] bg-blue-400 h-[100vh] flex flex-col">

                {/* Bookings */}
                <Link
                    to="/admin/bookings"
                    className="text-white text-[20px] hover:font-bold flex items-center px-4 py-2 gap-3"
                >
                    <CiBookmarkCheck size={24} />
                    Bookings
                </Link>

                {/* Categories */}
                <Link
                    to="/admin/categories"
                    className="text-white text-[20px] hover:font-bold flex items-center px-4 py-2 gap-3"
                >
                    <MdOutlineCategory size={24} />
                    Categories
                </Link>

                {/* Rooms */}
                <Link
                    to="/admin/rooms"
                    className="text-white text-[20px] hover:font-bold flex items-center px-4 py-2 gap-3"
                >
                    <RiDoorOpenLine  size={24} />
                    Rooms
                </Link>

                {/* Users */}
                <Link
                    to="/admin/users"
                    className="text-white text-[20px] hover:font-bold flex items-center px-4 py-2 gap-3"
                >
                    <LuUsers size={24} />
                    Users
                </Link>

                {/* Feedback */}
                <Link
                    to="/admin/feedback"
                    className="text-white text-[20px] hover:font-bold flex items-center px-4 py-2 gap-3"
                >
                    <BiMessageSquareDetail size={24} />
                    Feedback
                </Link>

                {/* Gallery Items */}
                <Link
                    to="/admin/gallery-items"
                    className="text-white text-[20px] hover:font-bold flex items-center px-4 py-2 gap-3"
                >
                    <TbPhoto size={24} />
                    Gallery Items
                </Link>
            </div>

            {/* Main Content */}
            <div className="w-[80%] bg-blue-900"></div>
        </div>
    );
}
