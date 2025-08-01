import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaClipboardCheck,
  FaTimesCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    pending: 0,
    accepted: 0,
    completed: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const statuses = ["pending", "accepted", "completed", "rejected"];
        const results = await Promise.all(
          statuses.map((status) =>
            axios.get(
              import.meta.env.VITE_BACKEND_URL + `/api/bookings/customer-bookings?status=${status}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );

        const newCounts = {};
        statuses.forEach((status, index) => {
          newCounts[status] = results[index].data.result.length;
        });

        setCounts(newCounts);
      } catch (error) {
        console.error("Error fetching booking counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    {
      title: "Pending",
      count: counts.pending,
      icon: <FaHourglassHalf className="text-white text-2xl" />,
      bg: "bg-yellow-500",
      hover: "hover:bg-yellow-600",
    },
    {
      title: "Accepted",
      count: counts.accepted,
      icon: <FaCheckCircle className="text-white text-2xl" />,
      bg: "bg-green-500",
      hover: "hover:bg-green-600",
    },
    {
      title: "Completed",
      count: counts.completed,
      icon: <FaClipboardCheck className="text-white text-2xl" />,
      bg: "bg-blue-500",
      hover: "hover:bg-blue-600",
    },
    {
      title: "Rejected",
      count: counts.rejected,
      icon: <FaTimesCircle className="text-white text-2xl" />,
      bg: "bg-red-500",
      hover: "hover:bg-red-600",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Booking Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-5 rounded-2xl shadow-lg transition-colors duration-300 text-white ${card.bg} ${card.hover}`}
          >
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              {card.icon}
            </div>
            <div>
              <h4 className="text-sm">{card.title}</h4>
              <p className="text-2xl font-bold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
