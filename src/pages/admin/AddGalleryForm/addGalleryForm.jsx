import { useState } from "react";
import uploadMedia from "../../../utill/mediaUpload";
import { getDownloadURL } from "firebase/storage";
import { upploadMediaToSupabase , supabase } from "../../../utill/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddGalleryItemForm() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   

    const token = localStorage.getItem("token");
    if (token == null) {
        window.location.href = "/login";
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();

        console.log("Form submitted");
        //uploadMedia(image).then((snapshot) => {
           // getDownloadURL(snapshot.ref).then((url) => {
        upploadMediaToSupabase(image).then((res) => {
        const url = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl;
                const galleryItemInfo = {
                    name: name,
                    description: description,
                    image: url,  // Save the Supabase image URL
                };
                axios
                    .post(
                        import.meta.env.VITE_BACKEND_URL + "/api/gallery", galleryItemInfo,
                        {
                            headers: {
                                Authorization: "Bearer "+token,
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                        setIsLoading(false);
                        navigate("/admin/gallery-items");
                    
                    })
                    
            });
        //});
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-1/2 bg-white p-6 shadow-md rounded"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter gallery item name"
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
                       // required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
                >
                    {isLoading ? (
                        <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
                    ) : (
                        <span>Add Gallery Item</span>
                    )}
                </button>
            </form>
        </div>
    );
}
