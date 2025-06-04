import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateRoomForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }

    if (!location.state) {
        window.location.href = "/admin/rooms";
    }

    const [roomId] = useState(location.state.roomId); // keep it disabled
    const [specialDescription, setSpecialDescription] = useState(location.state.specialdescription);
    const [notes, setNotes] = useState(location.state.notes);
    const [category, setCategory] = useState(location.state.category);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(location.state.price || "");
    const [maxGuests, setMaxGuests] = useState(location.state.maxGuests || "");
    const [available, setAvailable] = useState(location.state.available ?? true);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
            .then(res => {
                setCategories(res.data.categories || []);
            }).catch(() => {
                toast.error("Failed to load categories");
            });
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Prepare form data
        const roomData = {
            specialdescription: specialDescription,
            notes,
            category,
            price: Number(price),
            maxGuests: Number(maxGuests),
            available,
            // Handle image upload later, here we just pass the image URL
        };

        // Handle image upload separately
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            try {
                const uploadRes = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/upload`, 
                    formData, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                roomData.photos = [uploadRes.data.imageUrl]; // Assuming the response contains the image URL
            } catch (error) {
                toast.error("Image upload failed");
                setIsLoading(false);
                return;
            }
        }

        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${location.state._id}`,
                roomData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Room updated successfully");
            navigate("/admin/rooms");
        } catch (err) {
            toast.error("Failed to update room");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[60vh] flex items-center justify-center py-10">
            <form onSubmit={handleSubmit} className="w-[90%] max-w-md bg-white p-4 shadow-md rounded">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Room ID</label>
                    <input
                        type="text"
                        value={roomId}
                        className="w-full px-3 py-2 border rounded"
                        disabled
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Max Guests</label>
                    <input
                        type="number"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Available</label>
                <select
                    value={available}
                    onChange={(e) => setAvailable(e.target.value === "true")}
                    className="w-full px-3 py-2 border rounded"
                    required
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Special Description</label>
                    <textarea
                        value={specialDescription}
                        onChange={(e) => setSpecialDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">Image</label>
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
                    {isLoading ? (
                        <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
                    ) : (
                        <span>Update Room</span>
                    )}
                </button>
            </form>
        </div>
    );
}
