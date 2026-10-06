import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Home/ProductDetail";
import WishlistPage from "./components/Home/WishlistPage";
import LoginSignup from "./components/auth/Loginsignup";
import Customer from "./components/Profile/CustProfile";
import Cart from "./components/Cart/Cart";
import Productform from "./components/Cart/productform";
import Admin from "./components/Admin/Admin";
import axios from "axios";
import OrderScreen from "./components/Cart/OrderScreen";
import Orders from "./components/Cart/Orders";
import Address from "./components/Cart/Addressform";

function Rout() {
  const [login, setlogin] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const handlelogin = async () => {
      if (!token) {
        setlogin(false);
        setRole("");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setlogin(true);
        setRole(res.data.ans.role);
      } catch (error) {
        setlogin(false);
        setRole("");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handlelogin();
  }, [token]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#f6efe8] text-slate-700">Loading your experience…</div>;

  const isSellerOrAdmin = role === "seller" || role === "admin";

  return (
    <div className="min-h-screen bg-[#f6efe8]">
      <Routes>
        <Route path="/" element={login ? <Home role={role} /> : <Home role={role} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/LoginSignup" element={<LoginSignup setlogin={setlogin} />} />
        <Route path="/profile" element={login ? <Customer /> : <Navigate to="/LoginSignup" />} />
        <Route path="/cart" element={login ? <Cart /> : <Navigate to="/LoginSignup" />} />
        <Route path="/productform" element={login && isSellerOrAdmin ? <Productform /> : <Navigate to="/" />} />
        <Route path="/admin" element={login && role === "admin" ? <Admin /> : <Navigate to="/" />} />
        <Route path="/order" element={<OrderScreen />} />
        <Route path="/orders" element={login ? <Orders /> : <Navigate to="/LoginSignup" />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </div>
  );
}

export default Rout;