import React, { useState, useEffect } from "react";
import axios from "axios";
import PageShell from "../ui/PageShell";

export default function Admin1() {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newUser, setNewUser] = useState({ fullname: '', email: '', password: '', role: 'user' });
  const [newSeller, setNewSeller] = useState({ fullname: '', email: '', password: '', role: 'seller' });
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', stock: '', imageUrl: '' });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/admin/fetch", {}, { headers: { Authorization: `Bearer ${token}` } });
        const all = res.data.data || [];
        setUsers(all.filter((u) => u.role === "user"));
        setSellers(all.filter((u) => u.role === "seller"));
      } catch (err) {
        setUsers([]);
        setSellers([]);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data.products || []);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchUsers();
    fetchProducts();
  }, [token]);

  const handleDeleteUser = async (email) => {
    try {
      await axios.post("http://localhost:3000/api/auth/admin/delete", { email }, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(users.filter((u) => u.email !== email));
      setSellers(sellers.filter((s) => s.email !== email));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = async (e, isSeller = false) => {
    e.preventDefault();
    const data = isSeller ? newSeller : newUser;
    try {
      await axios.post("http://localhost:3000/api/auth/signup", data);
      const res = await axios.post("http://localhost:3000/api/auth/admin/fetch", {}, { headers: { Authorization: `Bearer ${token}` } });
      const all = res.data.data || [];
      setUsers(all.filter((u) => u.role === "user"));
      setSellers(all.filter((u) => u.role === "seller"));
      if (isSeller) setNewSeller({ fullname: '', email: '', password: '', role: 'seller' });
      else setNewUser({ fullname: '', email: '', password: '', role: 'user' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: '' });
  };

  return (
    <PageShell title="Operations dashboard" subtitle="A calmer control surface for managing accounts, inventory, and storefront activity." compact>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-[#eadfd3] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Customers</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{users.length}</p>
          </div>
          <div className="rounded-[24px] border border-[#eadfd3] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Sellers</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{sellers.length}</p>
          </div>
          <div className="rounded-[24px] border border-[#eadfd3] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Products</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{products.length}</p>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Customers</h2>
          <form className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={(e) => handleAddUser(e, false)}>
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Name" value={newUser.fullname} onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })} required />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="submit">Add user</button>
          </form>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b border-[#eadfd3] text-sm text-slate-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Joined</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? <tr><td colSpan={4} className="py-4 text-center text-slate-500">No users found</td></tr> : users.map((u) => (
                  <tr key={u._id} className="border-b border-[#f4eadf] text-sm text-slate-700">
                    <td className="py-3">{u.fullname}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="py-3"><button className="rounded-full bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white" onClick={() => handleDeleteUser(u.email)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Sellers</h2>
          <form className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={(e) => handleAddUser(e, true)}>
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Name" value={newSeller.fullname} onChange={(e) => setNewSeller({ ...newSeller, fullname: e.target.value })} required />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Email" value={newSeller.email} onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })} required />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Password" type="password" value={newSeller.password} onChange={(e) => setNewSeller({ ...newSeller, password: e.target.value })} required />
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="submit">Add seller</button>
          </form>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b border-[#eadfd3] text-sm text-slate-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Joined</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.length === 0 ? <tr><td colSpan={4} className="py-4 text-center text-slate-500">No sellers found</td></tr> : sellers.map((s) => (
                  <tr key={s._id} className="border-b border-[#f4eadf] text-sm text-slate-700">
                    <td className="py-3">{s.fullname}</td>
                    <td className="py-3">{s.email}</td>
                    <td className="py-3">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="py-3"><button className="rounded-full bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white" onClick={() => handleDeleteUser(s.email)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Inventory</h2>
          <form className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]" onSubmit={handleAddProduct}>
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Product name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Stock" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
            <input className="rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-3 py-2" placeholder="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white" type="submit">Add</button>
          </form>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-[#eadfd3] text-sm text-slate-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Stock</th>
                  <th className="pb-3 font-semibold">Seller</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? <tr><td colSpan={5} className="py-4 text-center text-slate-500">No products found</td></tr> : products.map((p) => (
                  <tr key={p._id} className="border-b border-[#f4eadf] text-sm text-slate-700">
                    <td className="py-3">{p.name}</td>
                    <td className="py-3">{p.category}</td>
                    <td className="py-3">₹ {p.price}</td>
                    <td className="py-3">{p.stock}</td>
                    <td className="py-3">{p.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
  