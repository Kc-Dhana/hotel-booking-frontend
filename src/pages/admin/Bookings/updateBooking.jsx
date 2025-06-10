import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateBookingForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/bookings";
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);

  const [bookingId, setBookingId] = useState(location.state.bookingId);
  const [roomId, setRoomId] = useState(location.state.booking.roomId);
  const [email, setEmail] = useState(location.state.booking.email);
  const [status, setStatus] = useState(location.state.booking.status);
  const [reason, setReason] = useState(location.state.booking.reason);
  const [start, setStart] = useState(location.state.booking.start?.slice(0, 10));
  const [end, setEnd] = useState(location.state.booking.end?.slice(0, 10));
  const [notes, setNotes] = useState(location.state.booking.notes);
  const [timestamp, setTimestamp] = useState(location.state.booking.timestamp);
  const [_id, setId] = useState(location.state.booking._id);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null;
  }
   console.log(location.state) 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedBooking = {
      bookingId :bookingId,
      roomId :roomId,
      email: email,
      status: status,
      reason: reason,
      start: start,
      end: end,
      notes: notes,
    };
//axios.put(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name, categoryInfo,
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/update/${_id}`,updatedBooking,{
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Booking updated successfully");
      navigate("/admin/bookings");
    } catch (err) {
      toast.error("Failed to update booking");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 bg-white p-6 shadow-md rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Room ID</label>
          <input
            type="number"
            value={roomId}
            onChange={(e) => setRoomId(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Start Date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">End Date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Booking</span>
          )}
        </button>
      </form>
    </div>
  );
}
