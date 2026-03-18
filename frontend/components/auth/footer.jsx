import { FaRobot } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      
      {/* Left Side */}
      <div className="text-sm">
        © 2026 YourCompany. All rights reserved.
      </div>

      {/* Right Side (Chatbot Icon) */}
      <div className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
        <FaRobot size={22} />
        <span className="text-sm">Chat with us</span>
      </div>

    </footer>
  );
}