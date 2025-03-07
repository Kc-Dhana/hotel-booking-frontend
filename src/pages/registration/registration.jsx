import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaWhatsapp, FaPhone } from "react-icons/fa";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [phone, setPhone] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!firstName) {
      formIsValid = false;
      tempErrors["firstName"] = "First name is required";
    }
    if (!lastName) {
      formIsValid = false;
      tempErrors["lastName"] = "Last name is required";
    }
    if (!email) {
      formIsValid = false;
      tempErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      tempErrors["email"] = "Email address is invalid";
    }
    if (!password) {
      formIsValid = false;
      tempErrors["password"] = "Password is required";
    } else if (password.length < 6) {
      formIsValid = false;
      tempErrors["password"] = "Password should be at least 6 characters long";
    }
    if (!whatsApp) {
      formIsValid = false;
      tempErrors["whatsApp"] = "WhatsApp is required";
    }
    if (!phone) {
      formIsValid = false;
      tempErrors["phone"] = "Phone number is required";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  // Handle submit
  function handleRegister() {
    if (validate()) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          whatsApp: whatsApp,
          phone: phone,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userEmail", email);
          window.location.href = "/verify-email"; // Redirect to login page after successful registration
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="w-full h-[100vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="w-[400px] h-auto backdrop-blur-md rounded-lg p-6 shadow-lg flex flex-col items-center bg-white bg-opacity-80">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h1>

        {/* First Name */}
        <div className="relative mb-3 w-full">
          <input
            type="text"
            placeholder="First Name"
            className="w-full h-[45px] px-4 pl-10 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="relative mb-3 w-full">
          <input
            type="text"
            placeholder="Last Name"
            className="w-full h-[45px] px-4 pl-10 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
        </div>

        {/* Email */}
        <div className="relative mb-3 w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[45px] px-4 pl-10 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="relative mb-3 w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[45px] px-4 pl-10 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
        </div>

        {/* WhatsApp */}
        <div className="relative mb-3 w-full">
          <input
            type="text"
            placeholder="WhatsApp"
            className="w-full h-[45px] px-4 pl-10 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
          />
          <FaWhatsapp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {errors.whatsApp && <span className="text-red-500 text-xs">{errors.whatsApp}</span>}
        </div>

        {/* Phone */}
        <div className="relative mb-3 w-full">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full h-[45px] px-4 pl-10 border-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
        </div>

        <button
          className="w-full h-[45px] bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account?</span>
          <a href="/login" className="text-blue-500 ml-2 text-sm">Login here</a>
        </div>
      </div>
    </div>
  );
}
