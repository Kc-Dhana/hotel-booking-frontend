import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Section */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">Get In Touch</h2>
            <p className="flex items-center gap-2">📍 436 Galle Road, Unawatuna, Galle 80600, Sri Lanka</p>
            <p className="flex items-center gap-2">📞 +011 222 67890</p>
            <p className="flex items-center gap-2">📧 info@example.com</p>
            <div className="flex gap-5 mt-5">
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FaFacebookF size={20} />
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FaInstagram size={20} />
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FaXTwitter size={20} />
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                <FaYoutube size={20} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">About Us</span></li>
              <li><span className="hover:text-white cursor-pointer">Contact Us</span></li>
              <li><span className="hover:text-white cursor-pointer">Rooms</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Terms & Conditions</span></li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              At Leonine Villa, we provide world-class comfort and luxury with exceptional hospitality. 
              Enjoy breathtaking views, modern amenities, and a memorable stay.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between text-sm gap-4">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Leonine Villa. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center md:justify-end">
            <span className="hover:text-white cursor-pointer">Home</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
            <span className="hover:text-white cursor-pointer">Help</span>
            <span className="hover:text-white cursor-pointer">FAQs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
