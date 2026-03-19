import { useState } from "react";
import { FaHome, FaUser, FaComments } from "react-icons/fa";

import EcommerceHome from "../Home/Home";
import Chatbox from "../../../extra/aii";
import Customer from "../../../extra/CustProfile";
import LoginSignup from "./Loginsignup";

export default function BottomNavbar({setlogin}) {
  const [Nav, setNav] = useState("");

  return (
    <>
      
      <div className="p-6 pb-16 overflow-y-auto">
        {Nav === "Home" && <EcommerceHome />}
        {Nav === "Chatbot" && <Chatbox />}
        {Nav === "Profile" && <Customer />}
        {Nav==="Login" && <LoginSignup setlogin={setlogin}/>}
      </div>

     
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center shadow-lg z-50">
        
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
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FaUser size={18} />
          <span>Login</span>
        </button>

      

      </div>
    </>
  );
}