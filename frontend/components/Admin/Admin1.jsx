import React, { useState } from "react";

export default function Admin1() {
    const [page, setPage] = useState("dashboard");

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white p-5 hidden md:block">
                <h2 className="text-2xl font-bold mb-6">Admin</h2>
                <nav className="space-y-3">
                    <button onClick={() => setPage("dashboard")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">Dashboard</button>
                    <button onClick={() => setPage("products")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">Products</button>
                                        <button onClick={() => setPage("Vendors")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">Vendors</button>

                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between">
                    <h1 className="text-xl font-semibold capitalize">{page}</h1>
                </header>

                <main className="p-6 overflow-y-auto">
                    {page === "dashboard" ? <Dashboard /> :page ==="products"? <Products />: page==="Vendors"?<Vendors/>:<></>}
                    
                    
                    
                </main>
            </div>
        </div>
    );


function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Revenue" value="$12,500" />
            <Card title="Orders" value="320" />
            <Card title="Products" value="85" />
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

function Products() {
    const [products, setProducts] = useState([
        { id: 1, name: "Shoes", price: 100 },
        { id: 2, name: "T-Shirt", price: 50 }
    ]);

        // const prod=[
        //     { id: 1, name: "Shoes", price: 100 },
        //     { id: 2, name: "T-Shirt", price: 50 }
        // ]

    

    const [form, setForm] = useState({ name: "", price: "" });
    const [editId, setEditId] = useState(null);

    const handleSubmit = () => {
        if (!form.name || !form.price) return;

        if (editId) {
            setProducts(products.map(p =>
                p.id === editId ? { ...p, name: form.name, price: form.price } : p
            ));
            setEditId(null);
        } else {
            setProducts([...products, { id: Date.now(), ...form }]);
        }

        setForm({ name: "", price: "" });
    };

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleEdit = (product) => {
        setForm({ name: product.name, price: product.price });
        setEditId(product.id);
    };
    return (
        <div>
            <div className="bg-white p-5 rounded shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    {editId ? "Update Product" : "Add Product"}
                </h2>

                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 rounded"
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </div>
            </div>

            <div className="bg-white p-5 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Product List</h2>

                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-b">
                                <td className="p-3">{p.name}</td>
                                <td className="p-3">${p.price}</td>
                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="bg-yellow-400 px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

  }

 function Vendors() {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Rahul", email: "rahul@gmail.com", phone: "9876543210", profession: "Seller" }
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profession: ""
  });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.profession) {
      setError("All fields are required");
      return;
    }

    setError("");

    if (editId) {
      setVendors(vendors.map(v =>
        v.id === editId ? { ...v, ...form } : v
      ));
      setEditId(null);
    } else {
      setVendors([...vendors, { id: Date.now(), ...form }]);
    }

    setForm({ name: "", email: "", phone: "", profession: "" });
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  const handleEdit = (vendor) => {
    setForm(vendor);
    setEditId(vendor.id);
  };

  return (
    <div>
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Update Vendor" : "Add Vendor"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Profession"
            value={form.profession}
            onChange={(e) => setForm({ ...form, profession: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Vendor List</h2>

        {vendors.length === 0 ? (
          <p className="text-gray-500">No vendors found</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Profession</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{v.name}</td>
                  <td className="p-3">{v.email}</td>
                  <td className="p-3">{v.phone}</td>
                  <td className="p-3">{v.profession}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(v)}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
    
  }