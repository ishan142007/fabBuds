import { use, useState } from "react";
import { FaHome, FaUser, FaComments } from "react-icons/fa";

import EcommerceHome from "../Home/Home";

import Customer from "../Profile/CustProfile";
import LoginSignup from "./Loginsignup";
import { Navigate, useNavigate } from "react-router-dom";
import Chatbox from "../../Ai/aii";

export default function BottomNavbar({setlogin}) {
  const [Nav, setNav] = useState("");
  const navigate=useNavigate();
  return (
    <>
      
      <div className="p-6 pb-16 overflow-y-auto">
        {Nav === "Home" && navigate("/")}
        {Nav === "Chatbot" && <Chatbox/>}
        {Nav === "Profile" && navigate("profile")}
        {Nav==="Login" && navigate("/LoginSignup")}
      </div>

     
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center shadow-lg py-2 z-50">
        
        <button 
          onClick={() => setNav("Home")}
          className="flex flex-col items-center hover:text-blue-400"
        >
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </button>

       
        <button 
          onClick={() => setNav("Chatbot")}
          className="flex flex-col items-center hover:text-blue-400"
        >
          <FaComments size={20} />
          <span className="text-xs">Chat</span>
        </button>

       
        <button 
          onClick={() => setNav("Profile")}
          className="flex flex-col items-center hover:text-blue-400"
        >
          <FaUser size={20} />
          <span className="text-xs">Profile</span>
        </button>
        <button 
          onClick={() => setNav("Login")}
          className="flex flex-col items-center hover:text-blue-400"
        >
          <FaUser size={20} />
          <span className="text-xs">Login</span>
        </button>

      

      </div>
    </>
  );
}