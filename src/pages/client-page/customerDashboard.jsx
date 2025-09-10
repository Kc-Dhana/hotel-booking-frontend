import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHome, FaClipboardList, FaCheckCircle, FaHistory, FaCommentDots, FaEdit, FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";
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
        const [isChecking, setIsChecking] = useState(true);
        const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile
        const navigate = useNavigate();

        useEffect(() => {
          const userDetails = localStorage.getItem("userDetails");
          if (userDetails) {
            const parsedUser = JSON.parse(userDetails);
            if (parsedUser.type !== "customer") {
              // If not customer, redirect to home or login
              navigate("/admin/");
            } else {
              setUser(parsedUser);
              setIsChecking(false);
            }
          } else {
            // Not logged in, redirect to login
            navigate("/login");
          }
        }, [navigate]);

         function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        setUser(null); // Reset user state
        window.location.href = "/login"; // Redirect to login page
    }
     const defaultImage = "https://www.w3schools.com/howto/img_avatar.png"; 

    if (isChecking) return null; // Prevent flicker until auth check is done
        
  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Hamburger for mobile */}
        <div className="md:hidden p-2 bg-white flex justify-between items-center shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl text-gray-700"
          >
            <FaBars />
          </button>
          <span className="font-bold text-lg">Dashboard</span>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 w-64 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-[20%] md:rounded-r-2xl z-50`}
        >
          <div className="flex flex-col items-center mb-8">
            <img
              src={user?.image || defaultImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-2 text-center">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </h2>
            <p className="text-sm text-gray-500 text-center">{user?.email}</p>
          </div>

          <nav className="flex flex-col gap-4">
            <a
              href="/customer/dashboard"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all"
            >
              <FaHome /> <span className="text-base font-medium">Dashboard</span>
            </a>
            <a
              href="/customer/bookings"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all"
            >
              <FaClipboardList /> <span className="text-base font-medium">Booking Requests</span>
            </a>
            <a
              href="/customer/rejected"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all"
            >
              <FaTimes /> <span className="text-base font-medium">Rejected Requests</span>
            </a>
            <a
              href="/customer/accepted"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all"
            >
              <FaCheckCircle /> <span className="text-base font-medium">Accepted Bookings</span>
            </a>
            <a
              href="/customer/completed"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all"
            >
              <FaHistory /> <span className="text-base font-medium">Completed Bookings</span>
            </a>
            <a
              href="/customer/feedback"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-all"
            >
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

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 md:w-[80%] max-h-[100vh] overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<BookingRequests />} />
            <Route path="rejected" element={<RejectedRequests />} />
            <Route path="accepted" element={<AcceptedBookings />} />
            <Route path="completed" element={<CompletedBookings />} />
            <Route path="feedback" element={<Feedbacks />} />
            <Route path="feedback/create-feedback" element={<CreateFeedback />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
}
