import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Section */}
                    <div>
                        <h2 className="text-white text-xl font-semibold mb-4">Get In Touch</h2>
                        <p className="flex items-center gap-2">
                            📍 123 Street, Hanguranketha, Kandy
                        </p>
                        <p className="flex items-center gap-2">
                            📞 +012 345 67890
                        </p>
                        <p className="flex items-center gap-2">
                            📧 info@example.com
                        </p>
                        <div className="flex gap-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaXTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Rooms</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* About Section */}
                    <div>
                        <h2 className="text-white text-xl font-semibold mb-4">About Us</h2>
                        <p className="text-gray-400 text-sm">
                            At Hotel Name, we provide world-class comfort and luxury with exceptional hospitality. Enjoy breathtaking views, modern amenities, and a memorable stay.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-6 pt-4 flex justify-between text-sm">
                    <p>© {new Date().getFullYear()} Hotel Name. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Home</a>
                        <a href="#" className="hover:text-white">Cookies</a>
                        <a href="#" className="hover:text-white">Help</a>
                        <a href="#" className="hover:text-white">FAQs</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
