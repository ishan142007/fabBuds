import { useEffect, useState } from "react";
import axios from "axios";

export default function Productform() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fetchProductsByid = async () => {
    try {

      
      // console.log(res.data.user.id);
      const ans =await axios.get(`http://localhost:3000/api/products/user`,{
        headers:{
            authorization:`Bearer ${token}`
        }
      });
      // console.log(ans.data.products)
      setProducts(ans.data.products);
    } catch (err) {
      console.log("Error occured", err);
    }
  };

  useEffect(() => {
    fetchProductsByid();
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ans = await axios.post(
        "http://localhost:3000/api/products/create",
        { ...form },{
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
      });
      // console.log("done")
    } catch (err) {
      console.log("Error", err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${"http://localhost:3000/api/products/delete"}/${id}`,
      );
      fetchProducts();
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 col-span-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 col-span-2"
        />
        <button className="bg-blue-500 text-white p-2 col-span-2">
          Add Product
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {products &&
          products.map((p) => (
            <div key={p._id} className="border  p-3 rounded-2xl m-1.5">
              <img
                src={p.imageUrl}
                alt=""
                className="h-40 w-full object-cover rounded-2xl"
              />
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.description}</p>
              <p>₹ {p.price}</p>
              <p>Stock: {p.stock}</p>
              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white p-1 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
