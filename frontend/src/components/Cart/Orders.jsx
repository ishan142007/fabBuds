import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post("http://localhost:3000/api/orders/getOrders ",{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch orders");
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

const clearorders=async()=>{
    try {
        // const res=await axios.delete()
    } catch (error) {
        
    }
}
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Orders</h2>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left min-w-150">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="p-3 font-semibold">Order ID</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Total</th>
                <th className="p-3 font-semibold">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b hover:bg-blue-50 transition">
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="p-3">{order.paymentStatus || "Pending"}</td>
                  <td className="p-3">₹{order.totalAmount || 0}</td>
                  <td className="p-3">
                    {order.items && order.items.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {order.items.map((item, idx) => (
                           
                          <li key={idx}>{item.productId ? item.name || item.ProductId : "Product"} x {item.quantity}</li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* <div onClick={()=>clearorders}>clear orders</div> */}
    </div>
  );
}
