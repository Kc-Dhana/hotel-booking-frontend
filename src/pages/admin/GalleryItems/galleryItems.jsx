import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGalleryItems() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        window.location.href = "/login";
    }

    useEffect(() => {
        if (!isLoaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
                .then((res) => {
                    setGalleryItems(res.data.list);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isLoaded]);

    function handleDelete(id) {
        axios
            .delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then(() => {
                toast.success("Gallery item deleted successfully");
                setIsLoaded(false);
            })
            .catch((err) => {
                toast.error("Error deleting gallery item");
                console.log(err);
            });
    }

    function handlePlusClick() {
        navigate("/admin/add-gallery-item");
    }

    return (
        <div className="w-full p-4">
            <button
                className="bg-red-900 w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-5"
                onClick={handlePlusClick}
            >
                <FaPlus color="white" />
            </button>
            <h1 className="text-2xl font-bold mb-4">Gallery Items</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleryItems.length > 0 ? (
                            galleryItems.map((item, index) => (
                                <tr key={item._id || index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{item.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">{item.description}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex space-x-2">
                                            <Link
                                                className="text-blue-500 hover:text-blue-700 transition"
                                                to={"/admin/update-gallery-item"}
                                                state={item}
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="py-4 px-4 text-center text-gray-500"
                                >
                                    Loading gallery items...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
