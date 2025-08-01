import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CreateFeedback() {
  const [title, setTitle] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !stars || !description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to submit feedback.");
        return;
      }

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedback",
        { title, stars, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Feedback submitted successfully!");
      navigate("/customer/feedback");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit feedback."
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Create Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Feedback title..."
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Stars</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStars(value)}
                  className={`text-2xl ${
                    value <= stars ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your feedback here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
