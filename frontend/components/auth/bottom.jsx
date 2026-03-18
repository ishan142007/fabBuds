import { FaHome, FaShoppingCart, FaUser, FaRobot } from "react-icons/fa";

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center py-3 shadow-lg">
      
      {/* Home */}
      <div className="flex flex-col items-center cursor-pointer hover:text-blue-400">
        <FaHome size={20} />
        <span className="text-xs">Home</span>
      </div>

      {/* Cart */}
      <div className="flex flex-col items-center cursor-pointer hover:text-blue-400">
        <FaShoppingCart size={20} />
        <span className="text-xs">Cart</span>
      </div>

      {/* Chatbot */}
      <div className="flex flex-col items-center cursor-pointer hover:text-blue-400">
        <FaRobot size={20} />
        <span className="text-xs">Chat</span>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center cursor-pointer hover:text-blue-400">
        <FaUser size={20} />
        <span className="text-xs">Profile</span>
      </div>

    </div>
  );
}