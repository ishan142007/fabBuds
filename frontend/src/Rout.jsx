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
import { useEffect } from "react";
import axios from "axios";  

function Rout() {
  const [login, setlogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token");
  useEffect(() => {
    const handlelogin = async () => {
      if (!token) {
        setlogin(false);
        setRole("");
        setLoading(false)
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // localStorage.setItem("token",res.data.ans.token)
        setlogin(true);
        setRole(res.data.ans.role);
      } catch (error) {
        setlogin(false);
        setRole("");
        // localStorage.removeItem("token")
        setLoading(false)
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    };
    handlelogin();
  }, []);

  if(loading) return <div>loading....</div>
  // console.log(login)
  // Helper for product-related route protection
  const isSellerOrAdmin = role === "seller" || role === "admin";

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen} role={role} login={login} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={login ? <Home role={role} /> : <Navigate to="/LoginSignup" />} />
            <Route path="/LoginSignup" element={<LoginSignup setlogin={setlogin} />} />
            <Route path="/profile" element={login ? <Customer /> : <Navigate to="/LoginSignup" />} />
            <Route path="/cart" element={login ? <Cart /> : <Navigate to="/LoginSignup" />} />
            <Route path="/productform" element={login && isSellerOrAdmin ? <Productform /> : <Navigate to="/" />} />
            <Route path="/admin" element={login && role === "admin" ? <Admin /> : <Navigate to="/" />} />
            <Route path="/Cart" element={login ? <CartPage /> : <Navigate to="/LoginSignup" />} />
          </Routes>
        </div>
        {/* Footer + Bottom Nav */}
        <Footer />
      </div>
    </div>
  );
}

export default Rout;