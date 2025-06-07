import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/feedback/my-feedbacks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const renderStars = (count) => (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) =>
        i < count ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">My Feedbacks</h2>
        <Link
          to="/customer/feedback/create-feedback"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Create Feedback
        </Link>
      </div>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600">No feedbacks found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-600">
                <th className="p-4">Title</th>
                <th className="p-4">Stars</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{feedback.title}</td>
                  <td className="p-4">{renderStars(feedback.stars)}</td>
                  <td className="p-4">{feedback.description}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        feedback.approved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {feedback.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
