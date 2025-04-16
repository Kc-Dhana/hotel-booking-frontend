import React, { useEffect, useState } from 'react';
import axios from "axios";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { IoClose } from "react-icons/io5"; // For close icon

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null); // For modal

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
            .then((res) => {
                setGalleryItems(res.data.list);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <Header />

            {/* Hero */}
            <div className="relative h-[60vh]">
                <img
                    src="gallery-hero.jpg"
                    alt="Gallery Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">GALLERY</h1>
                </div>
            </div>

            {/* Subheading */}
            <div className="text-center py-8 px-4 bg-gray-50">
                <h2 className="text-xl md:text-2xl text-gray-700">
                    Capture the Beauty of Every Moment – Explore Leonine Villa's Stunning Spaces
                </h2>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-16 bg-gray-50">
                {isLoading ? (
                    <p className="col-span-full text-center text-gray-500">Loading gallery...</p>
                ) : (
                    galleryItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedItem(item)} // Click to open modal
                            className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Lightbox */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
                    <div className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                            onClick={() => setSelectedItem(null)}
                        >
                            <IoClose size={24} />
                        </button>
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="w-full max-h-[70vh] object-cover"
                        />
                        <div className="p-4 bg-black bg-opacity-80 text-white text-sm md:text-base">
                            {selectedItem.description}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
