import { useState } from "react";
import { FaUser } from "react-icons/fa";
import LoginSignup from "./Loginsignup";

export default function TopNavbar() {
  const [Nav1, setNav1] = useState("");

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 text-white flex justify-end items-center px-4 py-3 shadow-lg z-50">
        
        <button 
          onClick={() => setNav1("Login")}
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FaUser size={18} />
          <span>Login</span>
        </button>

      </div>

      {/* Main Content */}
      <div className="pt-16 p-6">
        {Nav1 === "Login" && <LoginSignup />}
      </div>
    </>
  );
}