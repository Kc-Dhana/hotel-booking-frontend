import React from 'react';
import Header from "../../components/header/header";
import Slider from "react-slick";

export default function HomePage() {
    const settings = {
        dots: true, // Enable dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
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
                            className="border border-gray-300 p-2 rounded-md w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            className="border border-gray-300 p-2 rounded-md w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            className="border border-gray-300 p-2 rounded-md w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Luxury</option>
                            <option>Normal</option>
                            <option>Low</option>
                        </select>
                        <button
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
            <div className="bg-gray-200 h-[100vh] flex justify-center pt-10">
              <h1 className="text-4xl font-bold text-blue-900">Our Rooms</h1>
              </div>
                
        </>
    );
}
