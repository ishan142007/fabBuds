import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import PageShell from "../ui/PageShell";
import EmptyState from "../ui/EmptyState";

export default function CartPage() {
  const [cart, setCart] = useState({ item: [] });
  const [totalprice, settotalprice] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API = "http://localhost:3000/api/cart";
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/address", { state: { cartItems: cart.item } });
  };

  const handleprice = async () => {
    try {
      const res = await axios.post(
        API + "/totalprice",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      settotalprice(res.data.totalprice || 0);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCart = async () => {
    try {
      const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
      setCart(res.data.cart || { item: [] });
    } catch (err) {
      console.log("error in getCart", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(API + "/remove", { data: { itemId: id }, headers: { Authorization: `Bearer ${token}` } });
      getCart();
    } catch (err) {
      console.log("remove error", err);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(API + "/clear", { headers: { Authorization: `Bearer ${token}` } });
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    handleprice();
  }, [cart]);

  return (
    <PageShell title="Your bag" subtitle="Review your selected pieces and continue to checkout with confidence." compact>
      {loading ? (
        <div className="rounded-[24px] border border-[#eadfd3] bg-white p-8 text-sm text-slate-500">Loading your bag…</div>
      ) : cart?.item?.length === 0 ? (
        <EmptyState title="Your bag is empty" description="Start exploring the collection and add a few favorites to prepare your next order." actionLabel="Shop now" actionTo="/" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {cart.item.map((item) => (
              <div key={item._id} className="flex flex-col gap-4 rounded-[24px] border border-[#eadfd3] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7efe3] text-slate-700">
                    <FiShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                    <p className="text-sm font-semibold text-slate-700">₹ {item.price}</p>
                  </div>
                </div>
                <button onClick={() => deleteItem(item._id)} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                  <FiTrash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            ))}
            <button onClick={clearAll} className="rounded-full border border-[#d8c6ac] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#fcfaf7]">Clear bag</button>
          </div>

          <aside className="rounded-[28px] border border-[#eadfd3] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Order summary</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>₹ {totalprice}</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span>Free</span></div>
              <div className="flex items-center justify-between border-t border-[#eadfd3] pt-3 text-base font-semibold text-slate-900"><span>Total</span><span>₹ {totalprice}</span></div>
            </div>
            <button onClick={handleOrder} className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Continue to checkout</button>
          </aside>
        </div>
      )}
    </PageShell>
  );
}