import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function AdminFeedbacks() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login";
    }

    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbacksLoaded, setFeedbacksLoaded] = useState(false);

    useEffect(() => {
        if (!feedbacksLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/feedback/admin", {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                setFeedbacks(res.data.feedbacks);
                setFeedbacksLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [feedbacksLoaded]);

    function toggleApproval(feedbackId, currentStatus) {
        const endpoint = currentStatus 
            ? `/api/feedback/unapprove/${feedbackId}`  // Call unapprove endpoint if approved  //If currentStatus is true (meaning the feedback is currently approved),
            : `/api/feedback/approve/${feedbackId}`;  // Call approve endpoint if not approved //If currentStatus is false (meaning the feedback is pending), 
    
        axios.put(
            import.meta.env.VITE_BACKEND_URL + endpoint, 
            {},
            { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
            toast.success(currentStatus ? "Feedback unapproved" : "Feedback approved");
            setFeedbacksLoaded(false); // Reload feedbacks
        })
        .catch(() => {
            toast.error("Error updating feedback approval status");
        });
    }
    

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Feedback Table</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">User Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Stars</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Approval Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <tr key={feedback._id || index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{feedback.user?.firstName} {feedback.user?.lastName}</td>
                                    <td className="py-2 px-4 border-b">{feedback.user?.email}</td>
                                    <td className="py-2 px-4 border-b">{feedback.title}</td>
                                    <td className="py-2 px-4 border-b">{feedback.stars}</td>
                                    <td className="py-2 px-4 border-b">{feedback.description}</td>
                                    <td className="py-2 px-4 border-b">{feedback.approved ? "Approved" : "Pending"}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => toggleApproval(feedback._id, feedback.approved)}
                                            className={`px-3 py-1 text-white rounded ${feedback.approved ? "bg-red-500" : "bg-green-500"}`}
                                        >
                                            {feedback.approved ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                                    Loading feedbacks...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
