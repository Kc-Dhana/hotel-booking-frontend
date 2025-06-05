import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RoomSearchPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
            .then(res => setCategories(res.data.categories))
            .catch(err => console.error("Error fetching categories", err));
    }, []);

    const handleSearch = async () => {
        if (!startDate || !endDate || !selectedCategory) return;

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/available`, {
                params: {
                    start: new Date(startDate).toISOString(),
                    end: new Date(endDate).toISOString(),
                    category: selectedCategory
                }
            });
            setAvailableRooms(response.data.availableRooms);
        } catch (err) {
            console.error("Error fetching available rooms:", err);
        }
    };

    const handleAddToCart = (room) => {
        if (!token) return;
        setCart(prev => [...prev, room]);
    };

    const totalCost = cart.reduce((acc, room) => acc + room.price, 0);

    return (
        <>
            <Header />
             {/* Hero */}
            <div className="relative h-[60vh]">
                <img
                    src="RoomSearch.jpg"
                    alt="Rooms Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">ROOMS</h1>
                </div>
            </div>
            <div className="p-6 max-w-7xl mx-auto">
                {/* Booking Search */}
                <div className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        className="border p-2 rounded w-[30%]" />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                        className="border p-2 rounded w-[30%]" />
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                        className="border p-2 rounded w-[30%]">
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                    </select>
                    <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
                </div>

                <div className="flex gap-6">
                    {/* Rooms List */}
                    <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableRooms.map(room => (
                            <div key={room._id} className="bg-white p-4 rounded shadow">
                                <img src={room.image} alt="room" className="h-40 w-full object-cover rounded" />
                                <h2 className="text-lg font-bold mt-2">{room.name}</h2>
                                <p>{room.description}</p>
                                <p className="text-blue-700 font-semibold mt-1">${room.price} per night</p>
                                <button
                                    onClick={() => handleAddToCart(room)}
                                    className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                    disabled={!token}
                                >
                                    {token ? "Add to Cart" : "Sign in to Book"}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Cart */}
                    <div className="w-1/4 bg-gray-100 p-4 rounded shadow h-fit">
                        {token ? (
                            <>
                                <h2 className="text-xl font-bold mb-4">Cart</h2>
                                {cart.map((item, i) => (
                                    <div key={i} className="mb-2">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">${item.price}</p>
                                    </div>
                                ))}
                                <hr className="my-2" />
                                <p className="text-right font-bold">Total: ${totalCost}</p>
                            </>
                        ) : (
                            <p className="text-center text-red-600 font-semibold">Please sign in to add rooms to cart</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
