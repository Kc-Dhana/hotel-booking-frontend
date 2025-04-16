import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default function AboutPage() {
    return (
        <>
            <Header />

            {/* Hero Banner */}
            <div className="relative h-[60vh]">
                <img
                    src="about-hero.jpeg" // replace with your image
                    alt="About Us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">ABOUT US</h1>
                </div>
            </div>

            {/* About Section */}
            <div className="max-w-5xl mx-auto px-4 py-16 text-gray-700">
                <h2 className="text-3xl font-bold text-center mb-8">Welcome to Leonine Villa</h2>
                <p className="text-lg leading-relaxed mb-6">
                    At Leonine Villa, we believe in creating unforgettable experiences for our guests. Nestled in the heart of a serene location, our villa offers the perfect blend of luxury, comfort, and natural beauty.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Whether you're here for a romantic getaway, a family vacation, or a peaceful solo retreat, Leonine Villa is your home away from home. Our team is dedicated to ensuring that your stay is not only comfortable but also filled with warmth and joy.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Every detail, from our beautifully designed rooms to the tranquil garden spaces, is crafted with care to offer you the ultimate relaxation. Join us and experience hospitality that feels like family.
                </p>

                {/* Optional: Add an image or two-column layout */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <img
                        src="about-interior.jpg" // replace with actual path
                        alt="Interior"
                        className="w-full h-64 object-cover rounded-lg shadow"
                    />
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold mb-4">Our Philosophy</h3>
                        <p className="text-base leading-relaxed">
                            We’re more than a destination – we’re a lifestyle. Leonine Villa stands for peace, quality, and heartfelt service. Our philosophy revolves around you – your comfort, your memories, your joy.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
