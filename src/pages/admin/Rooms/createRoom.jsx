import { useEffect, useState } from "react"
import { upploadMediaToSupabase, supabase } from "../../../utill/mediaUpload"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddRoomForm() {
    const [roomId, setRoomId] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [maxGuests, setMaxGuests] = useState(3)
    const [available, setAvailable] = useState(true)
    const [photos, setPhotos] = useState([])
    const [specialdescription, setSpecialDescription] = useState("")
    const [notes, setNotes] = useState("")
    const [price, setPrice] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            window.location.href = "/login"
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
            .then(res => {
                setCategories(res.data.categories || [])
            }).catch(err => {
                console.error("Failed to fetch categories:", err)
            })
    }, [])

    const handleImageChange = (e) => {
        setPhotos([...e.target.files])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const uploadedUrls = []
        for (const photo of photos) {
            await upploadMediaToSupabase(photo)
            const url = supabase.storage.from("images").getPublicUrl(photo.name).data.publicUrl
            uploadedUrls.push(url)
        }

        const roomInfo = {
            roomId: parseInt(roomId),
            category,
            maxGuests: parseInt(maxGuests),
            available,
            photos: uploadedUrls,
            specialdescription,
            notes,
            price: parseFloat(price)
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/rooms", roomInfo, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            setIsLoading(false)
            navigate("/admin/rooms")
        }).catch((err) => {
            setIsLoading(false)
            console.error(err)
        })
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="w-[400px] bg-white p-5 shadow-md rounded-md">
                <h2 className="text-lg font-semibold mb-4 text-center">Add New Room</h2>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Room ID</label>
                    <input
                        type="number"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Max Guests</label>
                    <input
                        type="number"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Available</label>
                    <select
                        value={available}
                        onChange={(e) => setAvailable(e.target.value === "true")}
                        className="w-full px-2 py-1 border rounded text-sm"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Special Description</label>
                    <textarea
                        value={specialdescription}
                        onChange={(e) => setSpecialDescription(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        rows="2"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                        rows="2"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm mb-1">Room Photos</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-2 py-1 border rounded text-sm"
                        multiple
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-3 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
                >
                    {
                        isLoading ?
                            <div className="border-t-2 border-t-white w-5 h-5 rounded-full animate-spin"></div>
                            :
                            <span>Add Room</span>
                    }
                </button>
            </form>
        </div>
    )
}
