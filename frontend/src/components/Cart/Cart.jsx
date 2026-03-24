import React, { useEffect, useState } from "react";
import axios from "axios";
export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);

  const API = " http://localhost:3000/api/products/";
  const getCart = async () => {
    try {
      const res = await axios.get(API + "/get", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setCart(res.data.cart);
    } catch (err) {
      console.log("error in getCart", err);
    }
  };
  const addItem = async () => {
    if (!productId) return alert("enter product id");

    try {
      await axios.post(API + "/add", {
        productId: productId,
        quantity: Number(qty)
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      setProductId("");
      setQty(1);
      getCart();
    } catch (err) {
      console.log("add error", err);
    }
  };

 
  const deleteItem = async (id) => {
    try {
      await axios.post(API + "/remove", {
        itemId: id
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      getCart();
    } catch (err) {
      console.log("remove error", err);
    }
  };

  
  const clearAll = async () => {
    try {
      await axios.post(API + "/clear", {}, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">My Cart</h1>
      <div className="bg-white p-4 rounded mb-4 shadow">
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="product id"
          className="border p-2 mr-2"
          />

        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="border p-2 w-20 mr-2"
        />

        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-3 py-1"
          >
          add
        </button>
      </div>

      
      <div className="bg-white p-4 rounded shadow">
        {cart?.item?.length === 0 && <p>no item</p>}

        {cart?.item?.map((i) => (
          <div key={i._id} className="border p-2 mb-2 flex justify-between">
            <div>
              <p>id: {i.productId}</p>
              <p>qty: {i.quantity}</p>
              <p>₹ {i.price}</p>
            </div>

            <button
              onClick={() => deleteItem(i._id)}
              className="bg-red-400 text-white px-2"
              >
              Remove
            </button>
          </div>
        ))}


        {cart?.item?.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-black text-white px-3 py-1 mt-3"
          >
            clear cart
          </button>
        )}
      </div>
   </div>
   
   
  );
}