import { useState } from "react";
import { FaUser } from "react-icons/fa";
import LoginSignup from "./Loginsignup";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const [Nav1, setNav1] = useState("");
  const navigate=useNavigate();

  return (
    <>
    <div className="p-6 pb-16 overflow-y-auto">
      
     
        {Nav1==="Login" && navigate("/LoginSignup")}
      </div>
            <div className="fixed top-0 left-0 w-full bg-gray-900 text-white flex justify-end items-center px-4 py-3 shadow-lg z-50">
        
        
      <button 
          onClick={() => setNav1("Login")}
          className="flex flex-col items-center hover:text-blue-400"
        >
          <FaUser size={20} />
          <span className="text-xs">Login</span>
        </button>
      </div>

      
    </>
  );
}