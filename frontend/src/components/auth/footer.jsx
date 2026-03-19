import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaLinkedinIn, 
  FaGithub 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-black">FabBuds</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Your one-stop shop for quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">Shop</a></li>
            <li><a href="#" className="hover:text-black">Categories</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">FAQs</a></li>
            <li><a href="#" className="hover:text-black">Shipping</a></li>
            <li><a href="#" className="hover:text-black">Returns</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
          <p className="text-sm text-gray-600 mb-3">
            Stay connected with us
          </p>

          <div className="flex flex-wrap gap-4 text-lg">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a  href = "https://instagram.com/tarun_dakshwanshi" className="text-gray-600 hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-600 hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500">
              <FaYoutube />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/kavy00787" className="text-gray-600 hover:text-black">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center border-t border-gray-100 py-4 text-sm text-gray-500">
        © 2026 FabBuds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;