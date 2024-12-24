import { useState } from "react";
import uploadMedia from "../../../utill/mediaUpload";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { use } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateCategoryForm() {
    const location =useLocation(); //useLocation hook eka use karala location eka gannwa
                                    //loaction eke state eka ganna(state eke thama tiyenne details json)
    const navigate = useNavigate();
    
    if(location.state == null){   //state ekak nathuwa thiiboth(data nathuwa meh page ekata awoth aye category page ekata yawanwa)
        window.location.href = "/admin/categories"
    }
    const [name, setName] = useState(location.state.name);  //state eke apu detail aran danwa
    const [price, setPrice] = useState(location.state.price);
    const [features, setFeatures] = useState(location.state.features.join(",")); //array ekak tiyana eka join karala , dala danwa
    const [description, setDescription] = useState(location.state.description);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //page eka loadwenwada balanana

   

    console.log(location.state) //loaction eke state ekak tiywna nam balamwa

    const token = localStorage.getItem("token");
    if(token == null){
        window.location.href = "/login"
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //form eka submite button eka click karala submit karaddi page eka defult refresh wenna eka nawattanwa
        setIsLoading(true)  //submit button eka click karama loading true
        
        //split a String by comma
        const featuresArray = features.split(",")  //features text feild eke comma dala dana features tika aray eka gannwa
        console.log(featuresArray)

        console.log("form submitted");
        if(image == null){
            const categoryInfo = {
                //name: name, para wala pass karanne
                price: price,
                features: featuresArray,
                description: description,
                //image: location.state.image //update eke image null nam ,state eken pass wela apu url eka denwa.
            }; axios.put(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name, categoryInfo, { //data
                headers: {
                    Authorization: "Bearer "+token
                }
            }).then(
                (res)=>{
                    console.log(res)
                    setIsLoading(false)//submit eka success uanama loading false wenwa
                    toast.success("Category updated successfully")
                    navigate("/admin/categories");
                    
                }
            )
            
       }else{
        //uploadMedia(image).then((snapshot) => { //promise eka return wenwa utill eken. .then eka snapshot dala url eka gannwa.utill eke karanne nathuwa methana karawwa. url eka access karanna puluwan nisa
          //  getDownloadURL(snapshot.ref).then((url)=>{    //ulplaod karanna firebase image eke url eka gannwa download karanwa
                const categoryInfo = {
                    //name: name,   para wala pass karanne
                    price: price,
                    features: featuresArray,
                    description: description,
                    //image: url
                }
                axios.put(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name, categoryInfo, { //name eka para wala pass karanne
                    headers: {
                        Authorization: "Bearer "+token
                    }
                }).then(
                    (res)=>{
                        console.log(res)
                        setIsLoading(false)//submit eka success uanama loading false wenwa
                        toast.success("Category updated successfully")
                        navigate("/admin/categories");
                        
                    }
                )
          //  })
      
         // })
        }
      
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <form   //input feilds danwa form tag ekata
                    //submit button ekak type=submit dapu button ekak
                    //eka click karama form eka sublite wela (//deflutpage eka refresh wnewa)

                onSubmit={handleSubmit}// sublit weddi wenna one thika methanata danwa
                className="w-1/2 bg-white p-6 shadow-md rounded"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text" //text only.(validation) have anothe type like email,number,password
                        value={name} //value eke name ekata dagannwa
                        onChange={(e) => setName(e.target.value)} //value eke e eke taget eke athule tiyenne.
                                                                //eka setname eka add wenwa value eka change wena hamaparama
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter category name"
                        required   //input feild eka fill karanna one(front end validation)
                        disabled //name eka change karanna ba 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Features
                    </label>
                    <input
                        type="text"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter features separated by commas"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter category description"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button //submit button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
                  >
                    {
                        isLoading?   //loading nam pahala div eka pennwa
                        <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div> //loading 
                        :     //loadin nattam span eka pennwa
                        <span>
                         Update category
                        </span>
                    }
                    
                        
                </button>
            </form>
        </div>
    );
}
