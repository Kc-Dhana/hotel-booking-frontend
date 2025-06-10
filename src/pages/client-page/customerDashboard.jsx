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
      <aside className="w-[20%] bg-white shadow-md p-4">
        <div className="flex flex-col items-center mb-6">
        <img
            src={user?.image || defaultImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border border-white"
        />
        <h2 className="text-lg font-semibold">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
        </h2>
        <p className="text-sm text-gray-500">
            {user ? user.email : ""}
        </p>
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
          <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 bg-transparent border-none cursor-pointer"
              type="button"
            >
              <FaSignOutAlt /> Logout
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
