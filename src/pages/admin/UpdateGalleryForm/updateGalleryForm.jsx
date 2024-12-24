import { useState } from "react";
import uploadMedia from "../../../utill/mediaUpload";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateGalleryItemForm() {
    const location = useLocation(); //useLocation hook eka use karala location eka gannwa
                                    //loaction eke state eka ganna(state eke thama tiyenne details json)
    const navigate = useNavigate();
    
    if (location.state == null) {   //state ekak nathuwa thiiboth(data nathuwa meh page ekata awoth aye gallery page ekata yawanwa)
        window.location.href = "/admin/gallery-items";
    }
    const [name, setName] = useState(location.state.name);  //state eke apu detail aran danwa
    const [description, setDescription] = useState(location.state.description);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //page eka loadwenwada balanana

    console.log(location.state); //loaction eke state ekak tiywna nam balamwa

    const token = localStorage.getItem("token");
    if (token == null) {
        window.location.href = "/login";
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //form eka submite button eka click karala submit karaddi page eka defult refresh wenna eka nawattanwa
        setIsLoading(true);  //submit button eka click karama loading true
        
        console.log("form submitted");
        if (image == null) {
            const galleryItemInfo = {
                name: name,
                description: description,
                //image: location.state.image //update eke image null nam ,state eken pass wela apu url eka denwa.
            };
            axios.put( `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${location.state._id}`,galleryItemInfo,{ //id eka pass karanne
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(
                (res) => {
                    console.log(res);
                    setIsLoading(false); //submit eka success uanama loading false wenwa
                    toast.success("Gallery item updated successfully");
                    navigate("/admin/gallery-items");
                }
            );
        } else {
            //uploadMedia(image).then((snapshot) => { //promise eka return wenwa utill eken. .then eka snapshot dala url eka gannwa.utill eke karanne nathuwa methana karawwa. url eka access karanna puluwan nisa
            //getDownloadURL(snapshot.ref).then((url) => {    //ulplaod karanna firebase image eke url eka gannwa download karanwa
            const galleryItemInfo = {
                name: name,
                description: description,
                //image: url
            };
            axios .put(
                `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${location.state._id}`,galleryItemInfo,{
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(
                (res) => {
                    console.log(res);
                    setIsLoading(false); //submit eka success uanama loading false wenwa
                    toast.success("Gallery item updated successfully");
                    navigate("/admin/gallery-items");
                }
            );
            //})
        }
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <form
                onSubmit={handleSubmit} //submit wenna one thika methanata danwa
                className="w-1/2 bg-white p-6 shadow-md rounded"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text" //text only.(validation) have another type like email,number,password
                        value={name} //value eke name ekata dagannwa
                        onChange={(e) => setName(e.target.value)} //value eke e eke taget eke athule tiyenne.
                                                                //eka setName eka add wenwa value eka change wena hamaparama
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter gallery item name"
                        required   //input feild eka fill karanna one(front end validation)
                        
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
                        placeholder="Enter gallery item description"
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
                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
                >
                    {
                        isLoading ?   //loading nam pahala div eka pennwa
                        <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div> //loading 
                        :     //loading nattam span eka pennwa
                        <span>
                         Update Gallery Item
                        </span>
                    }
                </button>
            </form>
        </div>
    );
}
