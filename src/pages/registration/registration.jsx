import { useState } from "react";
import axios from "axios";
import { upploadMediaToSupabase, supabase } from "../../utill/mediaUpload";
import { FaUser, FaEnvelope, FaLock, FaWhatsapp, FaPhone, FaCamera } from "react-icons/fa";
import './regisration.css';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For showing image preview

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  };

  // Handle submit
  // function handleRegister() {
  //   if (validate()) {
  //     let imageUrl = "";
  //     if (image) {
  //       upploadMediaToSupabase(image).then(() => {
  //         imageUrl = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl;

  //         axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
  //           email,
  //           password,
  //           firstName,
  //           lastName,
  //           whatsApp,
  //           phone,
  //           image: imageUrl, // Send image URL
  //         }).then((res) => {
  //           console.log(res.data);
  //           localStorage.setItem("userEmail", email);
  //           window.location.href = "/verify-email";
  //         }).catch((error) => {
  //           console.log(error);
  //         });
  //       });
  //     }
  //   }
  // }
        function handleRegister() {
        if (!validate()) return;

        // If image is provided, upload and then submit
        if (image) {
          upploadMediaToSupabase(image).then(() => {
            const imageUrl = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl;

            submitForm(imageUrl);
          }).catch((error) => {
            console.error("Image upload failed:", error);
            // Optionally still proceed without image
            submitForm(""); 
          });
        } else {
          // If no image, just submit the form with empty image string
          submitForm("");
        }
      }
      // Extracted form submission for reusability
      function submitForm(imageUrl) {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          email,
          password,
          firstName,
          lastName,
          whatsApp,
          phone,
          image: imageUrl, // Can be "" if image not uploaded
        }).then((res) => {
          console.log(res.data);
          localStorage.setItem("userEmail", email);
          window.location.href = "/verify-email";
        }).catch((error) => {
          console.log("Registration error:", error);
        });
      }

  return (
      
     <div className="w-full h-screen login-background flex justify-center items-center">
      <div className="w-[400px] h-auto backdrop-blur-md rounded-lg p-6 shadow-lg flex flex-col items-center bg-white bg-opacity-80">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h1>

        {/* Image Upload */}
        <div className="relative mb-3 w-full flex flex-col items-center">
          {preview ? (
            <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover mb-2 shadow-md" />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full mb-2 shadow-md">
              <FaCamera className="text-gray-500 text-2xl" />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileUpload" />
          <label htmlFor="fileUpload" className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Choose Image</label>
        </div>

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

        {/* Register Button */}
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
