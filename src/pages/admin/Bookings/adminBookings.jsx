import axios from "axios"
import { useEffect, useState } from "react"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function AdminBooking() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  if (!token) {
    window.location.href = "/login"
  }

  const [bookings, setBookings] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`)
        .then((res) => {
          setBookings(res.data.result)
          setIsLoaded(true)
        })
        .catch((err) => {
          toast.error("Failed to load bookings")
          console.log(err)
        })
    }
  }, [isLoaded])

  // Delete handler
  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this booking?")) {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/delete/${id}`)
      .then(() => {
        toast.success("Booking deleted")
        setIsLoaded(false) // trigger re-fetch
      })
      .catch((err) => {
        toast.error("Delete failed")
        console.error(err)
      })
  }
}

  // Update handler (navigate with state)
  const handleUpdate = (booking) => {
    navigate(`/admin/update-booking`, { state: { booking } })
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Room ID</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Start</th>
              <th className="py-2 px-4 border-b">End</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id || index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{booking.bookingId}</td>
                  <td className="py-2 px-4 border-b">{booking.roomId}</td>
                  <td className="py-2 px-4 border-b">{booking.email}</td>
                  <td className="py-2 px-4 border-b">{new Date(booking.start).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{new Date(booking.end).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                  <td className="py-2 px-4 border-b flex gap-3 justify-center">
                    <button onClick={() => setSelectedBooking(booking)} className="text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </button>
                    <button onClick={() => handleUpdate(booking)} className="text-green-500 hover:text-green-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(booking._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  Loading bookings...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl relative">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              X
            </button>
            <ul className="space-y-2">
              <li><strong>Booking ID:</strong> {selectedBooking.bookingId}</li>
              <li><strong>Room ID:</strong> {selectedBooking.roomId}</li>
              <li><strong>Email:</strong> {selectedBooking.email}</li>
              <li><strong>Status:</strong> {selectedBooking.status}</li>
              <li><strong>Reason:</strong> {selectedBooking.reason || "N/A"}</li>
              <li><strong>Start:</strong> {new Date(selectedBooking.start).toLocaleString()}</li>
              <li><strong>End:</strong> {new Date(selectedBooking.end).toLocaleString()}</li>
              <li><strong>Notes:</strong> {selectedBooking.notes || "N/A"}</li>
              <li><strong>Timestamp:</strong> {new Date(selectedBooking.timestamp).toLocaleString()}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
