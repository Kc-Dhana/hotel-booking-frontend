import { useState } from "react";
//import uploadMedia from "../../../utill/mediaUpload";
//import { getDownloadURL } from "firebase/storage";
import { upploadMediaToSupabase , supabase } from "../../../utill/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCategoryForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [features, setFeatures] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); //page eka loadwenwada balanana
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if(token == null){
        window.location.href = "/login"
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        setIsLoading(true)  //submit button eka click karama loading true
        e.preventDefault(); //form eka submite button eka click karala submit karaddi page eka defult refresh wenna eka nawattanwa
        

        //split a String by comma
        const featuresArray = features.split(",")  //features text feild eke comma dala dana features tika aray eka gannwa
        console.log(featuresArray)

        console.log("form submitted");
        //uploadMedia(image).then((snapshot) => { //promise eka return wenwa utill eken. .then eka snapshot dala url eka gannwa.utill eke karanne nathuwa methana karawwa. url eka access karanna puluwan nisa
          //  getDownloadURL(snapshot.ref).then((url)=>{    //ulplaod karanna firebase image eke url eka gannwa download karanwa
          upploadMediaToSupabase(image).then((res) => {
            const url = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl;
            
            const categoryInfo = {
                name: name,
                price: price,
                features: featuresArray,
                description: description,
                Image: url,  // Save the Supabase image URL
            };
        
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/category", categoryInfo, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }).then((res) => {
                console.log(res);
                setIsLoading(false);
                navigate("/admin/categories");
            });
        });
        
      
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
                         Add category
                        </span>
                    }
                    
                        
                </button>
            </form>
        </div>
    );
}
