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
        console.log(res.data)
        localStorage.setItem("token", res.data.token) //local storage eke respones eke token save kara gannwa

        const token = localStorage.getItem("token") //local storage eke token eka ganna vidya
        console.log(token)

        if(res.data.user.type == "admin"){
            window.location.href = "/admin"  
        }
        else{
            window.location.href = "/"  
        }
    })
    .catch((error) => {     //waradunothe error print wenna
        console.log(error);
    })
}

    return (
        <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
            <div className="w-[400px] h-[400px] backdrop-blur-md
            rounded-lg flex flex-col items-center relative justify-center">

                <h1 className="text-3xl p-[15px] text-white text-center absolute top-[40px]">
                    Login
                </h1>

                <input type="text" placeholder="Enter your email" className="w-[80%] h-[40px]
                bg-[#00000000] border-[2px] text-white placeholder:text-white
                px-[5px] mb-[20px]" defaultValue={email}
                onChange={
                    (e) => {
                        setEmail(e.target.value); //value eke e eke taget eke athule tiyenne.
                                                //eka setemail eka add wenwa value eka change wena hamaparama
                    }
                }/>

                <input type="password" placeholder="Enter your password" className="w-[80%] h-[40px]
                bg-[#00000000] border-[2px] text-white placeholder:text-white
                px-[5px] mb-[10px]" defaultValue={password}
                onChange={
                    (e) => {
                        setPassword(e.target.value); 
                    }
                }/>

                <button className="w-[80%] h-[40px] bg-red-500  text-white
                hover:bg-white hover:text-black absolute bottom-[40px]"
                onClick={handleLogin}>Login</button>

            </div>
            
        </div>
    )
}