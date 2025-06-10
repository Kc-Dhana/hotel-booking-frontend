import React from 'react';
import Header from "../../components/header/header";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from '../../components/footer/footer';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast'; // if you use toast
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate(); // Add this inside component

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [categories, setCategories] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);


    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category") // Adjust API URL as needed
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => console.error("Error fetching categories:", error));
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/feedback/")
            .then(response => {
                setFeedbacks(response.data.feedbacks);
            })
            .catch(error => console.error("Error fetching feedbacks:", error));
    }, []);

    function handleBookingClick() {
    const token = localStorage.getItem('token'); // assuming token is stored

    if (!startDate || !endDate || !selectedCategory) {
        return toast.error("Please select dates and category");
    }

    if (!token) {
        return toast.error("You need to log in to book a room");
    }

    const confirmed = window.confirm("Do you want to place this booking?");
    if (!confirmed) return;

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/bookings/create-by-category", {
        start: startDate,
        end: endDate,
        category: selectedCategory,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if (res.data.message === "No rooms available") {
            toast.error("No rooms available for selected dates");
        } else {
            toast.success("Booking placed successfully");
        }
    }).catch(err => {
        console.error(err);
        toast.error("Something went wrong");
    });
}





    // Image Carousel Settings
    const settings = {
        dots: true, // Enable dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    // Feedback Carousel Settings
    const feedbackSliderSettings = {
        dots: false, // Enable dots
        infinite: true,
        speed: 1000,
        slidesToShow: 4, // Show 4 feedback cards at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 3 seconds interval for auto-swipe
        cssEase: "ease-in-out", // Adding a smooth ease-in-out transition
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <>
            <Header />
            <div className="relative w-full">
                {/* Carousel (Swipeable Image Slider) */}
                <Slider {...settings} className="w-full h-[450px]">
                    <div>
                        <img src="/hotel_pic1.jpg" alt="Hotel 1" className="w-full h-[450px] object-cover" />
                    </div>
                    <div>
                        <img src="/hotel_pic2.jpg" alt="Hotel 2" className="w-full h-[450px] object-cover" />
                    </div>
                    <div>
                        <img src="/hotel_pic3.jpg" alt="Hotel 3" className="w-full h-[450px] object-cover" />
                    </div>
                </Slider>

                {/* Booking Form - Overlaid at the bottom of the image */}
                <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-6 rounded-t-3xl">
                    <div className="flex justify-between items-center">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleBookingClick}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Book Now
                        </button>

                    </div>
                </div>
            </div>

            {/* Welcome Text - Positioned below the carousel*/}
            <div className="text-center mt-8 mb-8">
                <h1 className="text-4xl font-bold text-blue-900">Welcome to Leonine Villa</h1>
                <p className="mt-2 text-lg text-gray-500 w-[45%]  mx-auto">
                Welcome to Leonine Villa, where luxury and comfort meet. Enjoy a relaxing escape in our beautiful villa, offering world-class amenities and personalized service. Whether you're here for a peaceful getaway or a family vacation, we’re here to make your stay unforgettable.
                </p>
            </div>
           {/* Rooms Section */}
           <div className="bg-gray-200 py-10">
                <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">Our Rooms</h1>
                <div className="flex justify-center gap-6 flex-wrap">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-5 w-80">
                            <img src={category.Image} alt={category.name} className="w-full h-40 object-cover rounded-lg" />
                            <h2 className="text-xl font-bold text-gray-800 mt-4 ">{category.name}</h2>
                            <p className="text-gray-600 mt-2">{category.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3 justify-center">
                                {category.features.map((feature, idx) => (
                                    <span key={idx} className="bg-gray-300 px-2 py-1 rounded-full text-sm">{feature}</span>
                                ))}
                            </div>
                            {/* <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">View more</button> */}
                        </div>
                    ))}
                </div>
            </div>
            {/* User Feedback Section */}
            <div className="py-10">
                <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">What Our Guests Say</h1>
                <Slider {...feedbackSliderSettings}>
                    {feedbacks.length > 0 ? feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-5 w-80 text-center">
                            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden">
                                {feedback.user?.image ? (
                                    <img src={feedback.user?.image} alt={`${feedback.user?.firstName} ${feedback.user?.lastName}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
                                        {feedback.user?.firstName?.charAt(0)}{feedback.user?.lastName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 mt-4">{feedback.user?.firstName} {feedback.user?.lastName}</h2>
                            <p className="text-gray-600 text-sm">{feedback.user?.email}</p>
                            <div className="flex justify-center gap-1 mt-2">
                                {[...Array(feedback.stars)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 mt-3">{feedback.description}</p>
                        </div>
                    )) : <p className="text-center text-gray-500">No feedback available yet.</p>}
                </Slider>
            </div>

            <Footer/>
                
        </>
    );
}
