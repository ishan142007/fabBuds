import React, { useState, useEffect } from "react";
import axios from "axios";

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
        const res = await axios.post(
          "http://localhost:3000/api/auth/admin/fetch",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const all = res.data.data || [];
        setUsers(all.filter(u => u.role === "user"));
        setSellers(all.filter(u => u.role === "seller"));
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
      await axios.post(
        "http://localhost:3000/api/auth/admin/delete",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.filter(u => u.email !== email));
      setSellers(sellers.filter(s => s.email !== email));
    } catch (err) {
      // handle error
    }
  };

  const handleAddUser = async (e, isSeller = false) => {
    e.preventDefault();
    const data = isSeller ? newSeller : newUser;
    try {
      await axios.post("http://localhost:3000/api/auth/signup", data);
      // refetch users
      const res = await axios.post(
        "http://localhost:3000/api/auth/admin/fetch",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const all = res.data.data || [];
      setUsers(all.filter(u => u.role === "user"));
      setSellers(all.filter(u => u.role === "seller"));
      if (isSeller) setNewSeller({ fullname: '', email: '', password: '', role: 'seller' });
      else setNewUser({ fullname: '', email: '', password: '', role: 'user' });
    } catch (err) {
      // handle error
    }
  };

  // Placeholder for product add/delete logic
  const handleAddProduct = (e) => {
    e.preventDefault();
    // Implement API logic for product creation here
    setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: '' });
  };

  return (
    <div className="space-y-10 p-6">
      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2"><span className="inline-block w-2 h-6 bg-blue-500 rounded mr-2"></span>Users</h2>
        <form className="flex gap-2 mb-4" onSubmit={e => handleAddUser(e, false)}>
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Name" value={newUser.fullname} onChange={e => setNewUser({ ...newUser, fullname: e.target.value })} required />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} required />
          <button className="bg-linear-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded shadow hover:from-blue-600 hover:to-blue-800 transition" type="submit">Add User</button>
        </form>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left min-w-150">
            <thead>
              <tr className="bg-linear-to-r from-blue-100 to-blue-200 text-blue-900">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Joined</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={4} className="p-3 text-gray-500 text-center">No users found</td></tr>
              ) : (
                users.map(u => (
                  <tr key={u._id} className="border-b hover:bg-blue-50 transition">
                    <td className="p-3">{u.fullname}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="p-3"><button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition" onClick={() => handleDeleteUser(u.email)}>Delete</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Sellers Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2"><span className="inline-block w-2 h-6 bg-green-500 rounded mr-2"></span>Sellers</h2>
        <form className="flex gap-2 mb-4" onSubmit={e => handleAddUser(e, true)}>
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Name" value={newSeller.fullname} onChange={e => setNewSeller({ ...newSeller, fullname: e.target.value })} required />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Email" value={newSeller.email} onChange={e => setNewSeller({ ...newSeller, email: e.target.value })} required />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Password" type="password" value={newSeller.password} onChange={e => setNewSeller({ ...newSeller, password: e.target.value })} required />
          <button className="bg-linear-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded shadow hover:from-green-600 hover:to-green-800 transition" type="submit">Add Seller</button>
        </form>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left min-w-150">
            <thead>
              <tr className="bg-linear-to-r from-green-100 to-green-200 text-green-900">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Joined</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length === 0 ? (
                <tr><td colSpan={4} className="p-3 text-gray-500 text-center">No sellers found</td></tr>
              ) : (
                sellers.map(s => (
                  <tr key={s._id} className="border-b hover:bg-green-50 transition">
                    <td className="p-3">{s.fullname}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="p-3"><button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition" onClick={() => handleDeleteUser(s.email)}>Delete</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 flex items-center gap-2"><span className="inline-block w-2 h-6 bg-purple-500 rounded mr-2"></span>Products</h2>
        <form className="flex flex-wrap gap-2 mb-4" onSubmit={handleAddProduct}>
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Product Name" name="name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Description" name="description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Price" name="price" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Category" name="category" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Stock" name="stock" type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
          <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Image URL" name="imageUrl" value={newProduct.imageUrl} onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
          <button className="bg-linear-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded shadow hover:from-purple-600 hover:to-purple-800 transition" type="submit">Add Product</button>
        </form>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left min-w-200">
            <thead>
              <tr className="bg-linear-to-r from-purple-100 to-purple-200 text-purple-900">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Stock</th>
                <th className="p-3 font-semibold">Seller</th>
                <th className="p-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={7} className="p-3 text-gray-500 text-center">No products found</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p._id} className="border-b hover:bg-purple-50 transition">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.description}</td>
                    <td className="p-3">{p.price}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3">{p.userId}</td>
                    <td className="p-3">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
    
  