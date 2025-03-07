import { useState } from "react";
import axios from "axios";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(""); // OTP input field
  const [message, setMessage] = useState(""); // Message for validation or success

  // Error state for OTP
  const [error, setError] = useState("");

  const email = localStorage.getItem("userEmail");

  // Handle OTP submit
  const handleOtpSubmit = () => {
    // Validate OTP
    if (!otp) {
      setError("OTP is required");
      return;
    }

    // Make API request to verify OTP
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/verify-email", {
        email: email, // Email should be passed to this page (from registration)
        otp: otp,
      })
      .then((res) => {
        setMessage(res.data.message); // Show success or failure message from backend

        // If OTP verification is successful
        if (res.data.message === "User email verified successfully") {
            // Clear email from localStorage
            localStorage.removeItem("userEmail");
            
            // Redirect to the homepage (or any other page)
             window.location.href = "/";
          }
      })
      .catch((error) => {
        setMessage("Error verifying OTP.");
        console.log(error);
      });
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="w-[400px] h-auto backdrop-blur-md rounded-lg p-6 shadow-lg flex flex-col items-center bg-white bg-opacity-80">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">OTP Verification</h1>

        {/* Email Display */}
        <div className="mb-3 w-full text-center text-gray-700">
          <p>Email: {email}</p>
        </div>

        {/* OTP Input */}
        <div className="relative mb-3 w-full">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full h-[45px] px-4 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>

        {/* OTP Verification Button */}
        <button
          className="w-full h-[45px] bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          onClick={handleOtpSubmit}
        >
          Verify OTP
        </button>

        {/* Message display (either success or error) */}
        {message && (
          <div className="mt-4 text-center text-gray-600">
            <p>{message}</p>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Didn't receive OTP?</span>
          <a href="/resend-otp" className="text-blue-500 ml-2 text-sm">Resend OTP</a>
        </div>
      </div>
    </div>
  );
}
