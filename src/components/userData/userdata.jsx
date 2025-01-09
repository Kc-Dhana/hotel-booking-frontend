import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props){ //propertys use karanwa attribte custome karanna one nisa

     const [name, setName] = useState("");
     const [userFound , setUserFound] = useState(false);  //load weddi false  useEfect tiyena function run nam ture(userfound)

      

   //useEffect(function ,[])

     useEffect(
        ()=>{       //funtion eke one time run wenna one code danwa
        const token = localStorage.getItem("token") //login ekedi local storage sace karapu toekn eka gannwa

        if(token!=null){ 
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/", //req kara dn inna userwa ganna (get funtion eke req eka yanne backend eke)
            {                                                     //token eken userdeail ganna vidiya //postman eke karapu de backend karanwa
                headers: {
                    Authorization: "Bearer " + token,       //token eke headr eke dala yawana backend ekata dn log wela inne user details ganna liyala
                    "Content-Type": "application/json"
                },
            })
            .then((res) => {                                 //userwa hambunata passe
                console.log(res);
                setName(res.data.user.firstName + " " + res.data.user.lastName);
                setUserFound(true);          
            });
     }else{
        setName("") //token eka hambune nattam name eka empty wenwa .
     }
     },[userFound]               //sensetive variable danne  methaba (variable eka wenask unoth useEffect run wenwa) //empty array(useEffect hook eke dependenci array)
                                //meka natuwa auto compent eka refresh wenna na
                                //json variable sensitive na
    );
     

    return (
        <div className="absolute right-0 flex items-center cursor-pointer mr-2">
            <img
            className="rounded-full w-[40px] h-[40px] lg:w-[75px] lg:h-[75px]" 
            src={props.imageLink}/>
            <span className="text-white ml-[5px] text-xl">{name}</span>
            <button onClick={()=>{
                localStorage.removeItem("token")
                setUserFound(false)   //logot click karama userfound false wenna
               
                //window.location.href = "/login"
                
            }}>
                logout
            </button>
        </div>
    )
}
export default UserTag;