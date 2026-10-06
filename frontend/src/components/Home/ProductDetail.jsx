import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PageShell from "../ui/PageShell";
import { FiArrowLeft, FiShoppingBag, FiStar } from "react-icons/fi";
import { formatCurrency } from "../ui/formatters";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      Swal.fire({ icon: "warning", title: "Sign in required", text: "Please log in to add items to your bag." });
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({ icon: "success", title: "Added to bag", timer: 1200, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Unable to add item", text: "Please try again in a moment." });
    }
  };

  if (loading) {
    return (
      <PageShell title="Loading product" subtitle="Fetching product details" compact>
        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-8 text-center">Loading...</div>
      </PageShell>
    );
  }

  if (!product) {
    return (
      <PageShell title="Product not found" subtitle="The requested item is no longer available." compact>
        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-8 text-center">
          <p className="mb-4 text-slate-600">We couldn’t find that product.</p>
          <Link to="/" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Back to shop</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={product.name} subtitle={product.category || "Handcrafted essentials"} compact>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px] border border-[#eadfd3] bg-white">
          <img src={product.imageUrl || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"} alt={product.name} className="h-[420px] w-full object-cover" />
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FiStar className="text-amber-500" />
            <span>{product.rating || "4.8"}</span>
            <span className="text-xs">• {product.stock ? `${product.stock} left` : "In stock"}</span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">{product.name}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{product.description || "Thoughtfully made for everyday living."}</p>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-500">Price</p>
              <p className="text-3xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
            </div>
            <button type="button" onClick={handleAddToCart} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              <FiShoppingBag className="h-4 w-4" />
              Add to bag
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[#eadfd3] px-4 py-2 text-sm font-semibold text-slate-700">
              <FiArrowLeft className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
