import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import LoginSignup from "./components/auth/Loginsignup";
import Customer from "./components/Profile/CustProfile";
import Cart from "./components/Cart/Cart";
import Productform from "./components/Cart/productform";
import Admin from "./components/Admin/Admin";
import CartPage from "./components/Cart/Cart";

import Sidebar from "./components/auth/Sidebar";
import Footer from "./components/auth/footer";
import BottomNavbar from "./components/auth/bottom";
import { useEffect } from "react";
import axios from "axios";  

function Rout() {
  const [login, setlogin] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handlelogin=async()=>{
      const token=localStorage.getItem("token");
      if(!token )setlogin(false);
      const ans= await axios.post("http://localhost:3000/api/auth/verify",{},{
        headers:{
          authorization:`Bearer ${token}`
        }
      }).then(()=>setlogin(true))
      .catch((error)=>{
        setlogin(false);
        console.log(error)
      })
    }
    handlelogin()
  
    
  }, [])
  
  

  return (
    <div className="flex min-h-screen">
      
      
      <Sidebar open={open} setOpen={setOpen} />

      
      <div className="flex-1 flex flex-col">
     
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginSignup" element={<LoginSignup />} />
            <Route path="/profile" element={<Customer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productform" element={<Productform />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Cart" element={<CartPage />} />
          </Routes>
        </div>

        {/* Footer + Bottom Nav */}
        <Footer />
      
      </div>
    </div>
  );
}

export default Rout;