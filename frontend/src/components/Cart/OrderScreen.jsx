import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Order() {
  const token=localStorage.getItem("token")
  const location = useLocation();
  const navigate=useNavigate();

  const cartItems = location.state?.cartItems || [];
  const address = location.state?.address || {};

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleOrder=async()=>{
    try {
      await axios.post("http://localhost:3000/api/orders/create",{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      alert("Order placed successfully!")
      navigate('/');
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    }
  }
  

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-xl shadow">

        <h1 className="text-xl font-bold mb-4">Order Summary</h1>

        
        <div className="border p-3 mb-4 rounded">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <p>{address.name}</p>
          <p>{address.mobile}</p>
          <p>{address.address1}</p>
          <p>{address.address2}</p>
          <p>{address.pincode}, {address.state}</p>
          <p>{address.country}</p>
        </div>

       
        {cartItems.map((item, i) => (
          <div key={i} className="border p-2 mb-2 rounded flex justify-between">
            <div>
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
            </div>
            <p>₹ {item.price * item.quantity}</p>
          </div>
        ))}

       
        <div className="mt-4 font-bold text-lg flex justify-between">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

     
        <button className="w-full mt-5 bg-blue-300 text-white py-2 rounded-lg hover:bg-blue-500"
          onClick={()=>{handleOrder()}}
        >
          Place Order

        </button>

      </div>
    </div>
  );
}