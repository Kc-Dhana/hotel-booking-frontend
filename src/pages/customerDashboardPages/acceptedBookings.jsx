import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

export default function AcceptedBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/bookings/customer-bookings?status=accepted", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accepted Booking Requests</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Booking ID</th>
              <th className="py-3 px-6 text-left">Room ID</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-left">End Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {bookings.map((booking, index) => (
              <tr
                key={booking.bookingId}
                className={`hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-6">{booking.bookingId}</td>
                <td className="py-3 px-6">{booking.roomId}</td>
                <td className="py-3 px-6 capitalize">{booking.status}</td>
                <td className="py-3 px-6">{new Date(booking.start).toLocaleDateString()}</td>
                <td className="py-3 px-6">{new Date(booking.end).toLocaleDateString()}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => openModal(booking)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Booking Details
                  </Dialog.Title>
                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <p><strong>Booking ID:</strong> {selectedBooking?.bookingId}</p>
                    <p><strong>Room ID:</strong> {selectedBooking?.roomId}</p>
                    <p><strong>Status:</strong> {selectedBooking?.status}</p>
                    <p><strong>Start Date:</strong> {new Date(selectedBooking?.start).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(selectedBooking?.end).toLocaleDateString()}</p>
                    {selectedBooking?.reason && (
                      <p><strong>Reason:</strong> {selectedBooking.reason}</p>
                    )}
                    {selectedBooking?.notes && (
                      <p><strong>Notes:</strong> {selectedBooking.notes}</p>
                    )}
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-800"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
