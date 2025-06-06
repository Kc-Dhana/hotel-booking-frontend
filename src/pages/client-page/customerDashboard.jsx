import { Outlet, Route, Routes } from "react-router-dom";
import { FaUserCircle, FaHome, FaClipboardList, FaCheckCircle, FaHistory, FaCommentDots, FaEdit, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import AdminBooking from "../admin/Bookings/adminBookings";

export default function CustomerLayout() {
  return (
    <>
    <Header />
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[20%] bg-white shadow-md p-4">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle size={40} className="text-gray-600" />
          <h2 className="text-lg font-semibold">Janee Doe</h2>
          <p className="text-sm text-gray-500">customer@email.com</p>
        </div>
        <nav className="space-y-2">
          <a href="/customer/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaHome /> Dashboard
          </a>
          <a href="/customer/bookings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaClipboardList /> Booking Requests
          </a>
          <a href="/customer/rejected" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaTimes /> Rejected Requests
          </a>
          <a href="/customer/accepted" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaCheckCircle /> Accepted Bookings
          </a>
          <a href="/customer/completed" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaHistory /> Completed Bookings
          </a>
          <a href="/customer/feedback" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaCommentDots /> Feedbacks
          </a>
          <a href="/customer/edit-profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaEdit /> Edit Profile
          </a>
          <a href="/logout" className="flex items-center gap-2 text-red-500">
            <FaSignOutAlt /> Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
            <div className="w-[80%] bg-blue-900 max-h[100vh] overflow-y-scroll ">
                <Routes path="/*">

                    <Route path="bookings" element={<AdminBooking/>}/>
                    
                </Routes>
            </div>
    </div>
    <Footer />
    </>
  );
}
