import "./login.css";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

function handleLogin() {        //api call karanwa
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", { //req dana link
        email: email,                   //req eke body eka
        password: password,
    })
    .then((res) => {       //req hari nam response eka enwa,print wenwa (token,user details)
        
        localStorage.setItem("token", res.data.token) //local storage eke respones eke token save kara gannwa
        localStorage.setItem("userDetails", JSON.stringify(res.data.user)); //userwa details save kara gannwa

        const token = localStorage.getItem("token") //local storage eke token eka ganna vidya
        

        if(res.data.user.type == "customer"){
            window.location.href = "/"  
        }
        else if(res.data.user.type == "admin"){
            window.location.href = "/admin"  
        }
    })
    .catch((error) => {     //waradunothe error print wenna
        console.log(error);
    })
}

    return (
  <div className="w-full h-screen pic-bg flex justify-center items-center">
    <div className="bg-white/90 rounded-xl shadow-xl flex w-[90%] max-w-4xl overflow-hidden">

      {/* Left - illustration */}
      <div className="w-1/2 bg-white flex justify-center items-center p-6">
        <img src="/login2.png" alt="Login illustration" className="w-full h-full object-contain" />
      </div>

      {/* Right - login form */}
      <div className="w-1/2 flex flex-col justify-center px-6 py-8 relative text-gray-800">

        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        <p className="text-sm text-center mb-6 text-gray-600">
          To keep connected with us please login with your personal information
        </p>

        <input
          type="text"
          placeholder="yourmail@example.com"
          className="w-full h-[40px] border border-gray-300 rounded px-3 mb-4 text-gray-700"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}//value eke e eke taget eke athule tiyenne.
                                                //eka setemail eka add wenwa value eka change wena hamaparama
        />

        <input
          type="password"
          placeholder="**********"
          className="w-full h-[40px] border border-gray-300 rounded px-3 mb-6 text-gray-700"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <button
            className="w-full sm:w-[48%] h-[40px] bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
            onClick={handleLogin}
          >
            Login Now
          </button>
          <button
            className="w-full sm:w-[48%] h-[40px] bg-gray-200 text-black rounded hover:bg-gray-300 transition-all"
            onClick={() => window.location.href = "/register"} // optional
          >
            Create Account
          </button>
        </div>

        {/* Demo logins */}
        <div className="bg-white border border-gray-300 rounded p-4 text-sm">
          <p className="font-semibold mb-2">Demo Logins</p>
          <div className="flex justify-between items-center mb-2">
            <span>Email: admin1@gmail.com<br />Password: 123</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
              onClick={() => {
                setEmail("admin1@gmail.com");
                setPassword("123");
              }}>Load</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Email: yashodaperera99@gmail.com<br />Password: 123</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
              onClick={() => {
                setEmail("yashodaperera99@gmail.com");
                setPassword("123456");
              }}>Load</button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => window.location.href = "/"}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
);


}