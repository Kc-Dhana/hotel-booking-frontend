import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [roomsIsLoaded, setRoomsIsLoaded] = useState(false);
    const [searchRoomId, setSearchRoomId] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
            .then(res => {
                setCategories(res.data.categories || []);
            }).catch(() => {
                toast.error("Failed to load categories");
            });
    }, []);

    useEffect(() => {
        if (!roomsIsLoaded) {
            const params = new URLSearchParams();
            if (searchRoomId.trim()) params.append("roomId", searchRoomId.trim());
            if (searchCategory.trim()) params.append("category", searchCategory.trim());

            axios.get(import.meta.env.VITE_BACKEND_URL + `/api/rooms/search?${params.toString()}`)
                .then(res => {
                    setRooms(res.data.result || []);
                    setRoomsIsLoaded(true);
                }).catch(err => {
                    toast.error("Failed to load rooms");
                    console.log(err);
                });
        }
    }, [roomsIsLoaded, searchRoomId, searchCategory]);

    function handleDelete(roomId) {
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(() => {
            toast.success("Room deleted successfully");
            setRoomsIsLoaded(false);
        }).catch(() => {
            toast.error("Failed to delete room");
        });
    }

    function handlePlusClick() {
        navigate("/admin/add-rooms");
    }

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h1 className="text-2xl font-bold">Rooms Table</h1>

                <div className="flex gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by Room ID"
                        className="border px-2 py-1 rounded"
                        value={searchRoomId}
                        onChange={e => {
                            setSearchRoomId(e.target.value);
                            setRoomsIsLoaded(false);
                        }}
                    />
                    <select
                        className="border px-2 py-1 rounded"
                        value={searchCategory}
                        onChange={e => {
                            setSearchCategory(e.target.value);
                            setRoomsIsLoaded(false);
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                className="bg-red-900 w-[60px] h-[60px] rounded-full text-2xl flex justify-center items-center fixed bottom-5 right-5"
                onClick={handlePlusClick}
            >
                <FaPlus color="white" />
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Room ID</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Guests</th>
                            <th className="py-2 px-4 border-b">Price (LKR)</th>
                            <th className="py-2 px-4 border-b">Available</th>
                            <th className="py-2 px-4 border-b">Photos</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length > 0 ? rooms.map((room, index) => (
                            <tr key={room._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{room.roomId}</td>
                                <td className="py-2 px-4 border-b">{room.category}</td>
                                <td className="py-2 px-4 border-b">{room.maxGuests}</td>
                                <td className="py-2 px-4 border-b">{room.price?.toLocaleString() || "N/A"}</td>
                                <td className="py-2 px-4 border-b">{room.available ? "Yes" : "No"}</td>
                                <td className="py-2 px-4 border-b">
                                    {room.photos && room.photos.length > 0 ? (
                                        <img
                                            src={room.photos[0]}
                                            alt="Room"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : "No photo"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex space-x-2">
                                        <Link
                                            to="/admin/update-rooms"
                                            state={room}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(room.roomId)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                                    No rooms found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
