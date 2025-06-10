import { Outlet, Route, Routes } from "react-router-dom";
import { FaUserCircle, FaHome, FaClipboardList, FaCheckCircle, FaHistory, FaCommentDots, FaEdit, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useState, useEffect } from "react";
import AcceptedBookings from "../customerDashboardPages/acceptedBookings";
import RejectedRequests from "../customerDashboardPages/rejectedRequests";
import BookingRequests from "../customerDashboardPages/bookingRequests";
import CompletedBookings from "../customerDashboardPages/completedBookings";
import Feedbacks from "../customerDashboardPages/feedbacks";
import Dashboard from "../customerDashboardPages/dashboard";
import CreateFeedback from "../customerDashboardPages/createFeedback";

export default function CustomerLayout() {

        const [user, setUser] = useState(null);

        useEffect(() => {
            const userDetails = localStorage.getItem("userDetails");
            if (userDetails) {
                setUser(JSON.parse(userDetails));
            }
        }, []);

         function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        setUser(null); // Reset user state
        window.location.href = "/login"; // Redirect to login page
    }
     const defaultImage = "https://www.w3schools.com/howto/img_avatar.png"; 
        
  return (
    <>
    <Header />
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[20%] bg-white shadow-lg p-6 rounded-r-2xl">
  <div className="flex flex-col items-center mb-8">
    <img
      src={user?.image || defaultImage}
      alt="Profile"
      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
    />
    <h2 className="text-xl font-semibold mt-2">
      {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
    </h2>
    <p className="text-sm text-gray-500">
      {user ? user.email : ""}
    </p>
  </div>
  <nav className="flex flex-col gap-4">
    <a href="/customer/dashboard" className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all">
      <FaHome /> <span className="text-base font-medium">Dashboard</span>
    </a>
    <a href="/customer/bookings" className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all">
      <FaClipboardList /> <span className="text-base font-medium">Booking Requests</span>
    </a>
    <a href="/customer/rejected" className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all">
      <FaTimes /> <span className="text-base font-medium">Rejected Requests</span>
    </a>
    <a href="/customer/accepted" className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all">
      <FaCheckCircle /> <span className="text-base font-medium">Accepted Bookings</span>
    </a>
    <a href="/customer/completed" className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all">
      <FaHistory /> <span className="text-base font-medium">Completed Bookings</span>
    </a>
    <a href="/customer/feedback" className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all">
      <FaCommentDots /> <span className="text-base font-medium">Feedbacks</span>
    </a>
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 p-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 shadow-sm transition-all"
      type="button"
    >
      <FaSignOutAlt /> <span className="text-base font-medium">Logout</span>
    </button>
  </nav>
</aside>


      {/* Main Content */}
            <div className="w-[80%] bg-gray-100 max-h[100vh] overflow-y-scroll ">
                <Routes>

                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="bookings" element={<BookingRequests/>}/>
                    <Route path="rejected" element={<RejectedRequests/>}/>
                    <Route path="accepted" element={<AcceptedBookings/>}/>
                    <Route path="completed" element={<CompletedBookings/>}/>
                    <Route path="feedback" element={<Feedbacks/>}/>
                    <Route path="feedback/create-feedback" element={<CreateFeedback/>}/>
                    
                </Routes>
            </div>
    </div>
    <Footer />
    </>
  );
}
