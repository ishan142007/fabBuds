import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFirstOrder } from "react-icons/fa";
export default function CartPage() {
  const [cart, setCart] = useState({
    name:"",
    productId:"",
    quantity:0,
    price:0,
    _id:""
  });
  const [Name, setName] = useState("")
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);
  const[totalprice,settotalprice]=useState(0);
const token=localStorage.getItem("token")
  const API = " http://localhost:3000/api/cart";
    const navigate = useNavigate();
  
    const handleOrder = () => {
      navigate("/address", { state: { cartItems: cart.item } });
    };
  
  const handleprice = async () =>{
    try {
      const res=await axios.post(API + "/totalprice",{
        
      },{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
      // console.log(res.data.totalprice)
      settotalprice(res.data.totalprice)
    } catch (error) {
      console.log("error")
      
    }

  }
  const getCart = async () => {
    try {
      const res = await axios.get(API , {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      
      // console.log(res.data.cart);
      setCart(res.data.cart);
      
    } catch (err) {
      console.log("error in getCart", err);
    }
  };
  
  // const addItem = async () => {
  //   if (!productId) return alert("enter product id");

  //   try {
  //     await axios.post(API + "/add", {
  //       productId: productId,
  //       quantity: Number(qty)
  //     }, {
  //       headers: {
  //         Authorization:`Bearer ${token}`
  //       }
  //     });

  //     setProductId("");
  //     setQty(1);
  //     getCart();
  //   } catch (err) {
  //     console.log("add error", err);
  //   }
  // };

 
  const deleteItem = async (id) => {
    try {
      // console.log(id)
      const itemId=id;
      const res=await axios.delete(API+"/remove",
        {
          data:{itemId},
          headers:{
            Authorization:`Bearer ${token}`
          }
        },)
        window.alert("item removed successfully");

      getCart();
    } catch (err) {
      window.alert("item not removed");
      console.log("remove error", err);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(API + "/clear", {
        headers:{
          Authorization:`Bearer ${token}`
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
  useEffect(()=>{
    handleprice();
  },[cart])
  
  return (
    <div className="p-5 bg-gray-100 min-h-screen rounded-2xl">
      <h1 className="text-xl font-bold mb-4">My Cart</h1>
    
      {/* <div className="bg-white p-4 rounded mb-4 shadow">
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
      </div> */}

      
      <div className="bg-white p-4 rounded-2xl shadow">
        {cart?.item?.length === 0 && <p>No Item in Cart</p>}

        {cart?.item?.map((i) => (
          
          <div key={i._id} className="border p-2 mb-2 flex justify-between rounded-2xl">
            {/* {()=>{handleproduct()}} */}
            <div>
              <p> {i.name}</p>
              <p>qty: {i.quantity}</p>
              <p>₹ {i.price}</p>
            </div>

            <button
              onClick={() => deleteItem(i._id)}
              className="bg-red-400 text-white px-2 rounded-2xl"
              >
              Remove
            </button>
          </div>
        ))}
          


        {cart?.item?.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-black text-white px-3 py-1 mt-3 rounded-2xl"
          >
            Clear Cart
          </button>
          
        )}
        <div>
          <div>Total Amount: {totalprice}</div>

        {cart?.item?.length > 0 && (
          <button
          onClick={handleOrder}
          className="bg-red-500 text-white px-3  py-1 mt-3 rounded-2xl"
          >
            Order
          </button>
          
          )}
          </div>
      </div>
      
   </div>
   
   
  );
}