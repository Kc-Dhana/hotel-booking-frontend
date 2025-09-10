import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RoomSearchPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
            .then(res => setCategories(res.data.categories))
            .catch(err => console.error("Error fetching categories", err));
    }, []);

    const handleSearch = async () => {
        if (!startDate || !endDate || !selectedCategory) return;
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/bookings/available`,
                {
                    params: {
                        start: new Date(startDate).toISOString(),
                        end: new Date(endDate).toISOString(),
                        category: selectedCategory,
                    },
                }
            );

            if (Array.isArray(response.data)) {
                setAvailableRooms(response.data);
            } else if (Array.isArray(response.data.availableRooms)) {
                setAvailableRooms(response.data.availableRooms);
            } else {
                setAvailableRooms([]);
                console.warn("Unexpected response shape:", response.data);
            }
        } catch (err) {
            console.error("Error fetching available rooms:", err);
            setAvailableRooms([]);
        }
    };

    const calculateNights = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const isInCart = room => cart.some(r => r._id === room._id);

    // const toggleCart = room => {
    //     if (!token) return;
    //     if (isInCart(room)) {
    //         setCart(prev => prev.filter(r => r._id !== room._id));
    //     } else {
    //         setCart(prev => [...prev, room]);
    //     }
    // };
            const toggleCart = room => {
                if (!token) return;
                if (isInCart(room)) {
                    setCart(prev => prev.filter(r => r._id !== room._id));
                } else {
                    setCart(prev => [...prev, room]); // don't touch or override roomId
                }
            };

    const handleSubmitBooking = async () => {
    if (!token || cart.length === 0) {
        toast.error("You must be signed in and have rooms in the cart.");
        return;
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const roomIds = cart.map(room => room.roomId || room._id || room.roomNumber); // gather all room IDs

        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/bookings/bulk`,  // new bulk booking endpoint
            {
                roomIds,
                start: new Date(startDate).toISOString(),
                end: new Date(endDate).toISOString(),
            },
            headers
        );

        toast.success("All rooms booked successfully!");
        setCart([]);
    } catch (error) {
        console.error("Booking failed:", error);
        toast.error("Booking failed.");
    }
};


    const nights = calculateNights();
    const totalCost = cart.reduce((acc, room) => acc + room.price * nights, 0);

    return (
  <>
    <Header />

    {/* Hero Banner */}
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh]">
      <img src="RoomSearch.jpg" alt="Rooms Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">ROOMS</h1>
      </div>
    </div>

    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Booking Search */}
      <div className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-[30%]"
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Rooms List */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.length > 0 ? (
            availableRooms.map(room => (
              <div key={room._id} className="bg-white p-4 rounded shadow relative flex flex-col">
                <img src={room.photos?.[0] || "/no-image.jpg"} alt={room.name} className="h-40 w-full object-cover rounded mb-2" />
                <h2 className="text-lg font-bold mt-2">{room.name}</h2>
                <p>{room.description}</p>
                <p className="text-sm text-gray-500">Max Guests: {room.maxGuests}</p>
                <p className="text-sm italic">{room.notes}</p>
                <p className="text-sm italic text-gray-600">{room.specialdescription}</p>
                <p className="text-blue-700 font-semibold mt-1">${room.price} per night</p>
                <div className="mt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => toggleCart(room)}
                    className={`flex-1 py-2 rounded text-white ${isInCart(room) ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                    disabled={!token}
                  >
                    {token ? (isInCart(room) ? "Remove from Cart" : "Add to Cart") : "Sign in to Book"}
                  </button>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="flex-1 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-600">
              No available rooms found for the selected dates and category.
            </p>
          )}
        </div>

        {/* Cart */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded shadow h-fit">
          {token ? (
            <>
              <h2 className="text-xl font-bold mb-4">Cart</h2>
              {cart.map((item, i) => (
                <div key={i} className="mb-4 border-b pb-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className="text-sm text-gray-500">Room #: {item.roomId}</p>
                  <p className="text-sm text-gray-500">From: {startDate}</p>
                  <p className="text-sm text-gray-500">To: {endDate}</p>
                  <p className="text-sm text-gray-500">Nights: {nights}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price} x {nights} = ${item.price * nights}</p>
                  <button
                    className="text-red-500 text-sm underline mt-1"
                    onClick={() => toggleCart(item)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <hr className="my-2" />
              <p className="text-right font-bold">Total: ${totalCost}</p>
              <button
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={handleSubmitBooking}
              >
                Submit Booking Request
              </button>
            </>
          ) : (
            <p className="text-center text-red-600 font-semibold">
              Please sign in to add rooms to cart
            </p>
          )}
        </div>
      </div>

      {/* Popup for room detail */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-white max-w-lg w-full p-6 rounded relative">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedRoom.name}</h2>
            <img src={selectedRoom.photos?.[0] || "/no-image.jpg"} alt={selectedRoom.name} className="w-full h-60 object-cover rounded mb-2" />
            <p><strong>Category:</strong> {selectedRoom.category}</p>
            <p><strong>Max Guests:</strong> {selectedRoom.maxGuests}</p>
            <p><strong>Description:</strong> {selectedRoom.description}</p>
            <p><strong>Notes:</strong> {selectedRoom.notes}</p>
            <p><strong>Special Info:</strong> {selectedRoom.specialdescription}</p>
            <p className="mt-2 text-blue-700 font-semibold">
              ${selectedRoom.price} per night
            </p>
          </div>
        </div>
      )}
    </div>

    <Footer />
  </>
);

}
