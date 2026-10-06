import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FiArrowRight, FiClock, FiShield, FiTruck } from "react-icons/fi";
import PageShell from "../ui/PageShell";
import ProductCard from "../ui/ProductCard";
import { useLocation } from "react-router-dom";

const heroImage = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80";

const EcommerceHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedWishlist = localStorage.getItem("fabbuds-wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.log("Unable to restore wishlist", error);
      return [];
    }
  });
  const location = useLocation();
  const token = localStorage.getItem("token");

  const popup = () => {
    Swal.fire({
      icon: "success",
      title: "Added to bag",
      text: "Your item is ready for checkout.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.log("Error occerd", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("fabbuds-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = searchTerm.toLowerCase();
      return (
        product.name?.toLowerCase().includes(searchValue) ||
        product.category?.toLowerCase().includes(searchValue) ||
        product.description?.toLowerCase().includes(searchValue)
      );
    });
  }, [products, searchTerm]);

  const handleCart = async (product) => {
    const id = product._id;
    if (!token) {
      Swal.fire({ icon: "warning", title: "Sign in required", text: "Please log in to add items to your bag." });
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      popup();
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", title: "Unable to add item", text: "Please try again in a moment." });
    }
  };

  const handleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item._id === product._id);
      if (exists) {
        return current.filter((item) => item._id !== product._id);
      }
      return [...current, product];
    });
  };

  const featured = filteredProducts.slice(0, 3);
  const moreProducts = filteredProducts.slice(3, 8);

  return (
    <PageShell title="Modern essentials for thoughtful living" subtitle="Discover artisan-made products, elevated essentials, and timeless pieces designed to move with your lifestyle.">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px] border border-[#eadfd3] bg-[#111827] text-white shadow-[0_25px_70px_-30px_rgba(15,23,42,0.75)]">
          <img src={heroImage} alt="Curated lifestyle products" className="h-72 w-full object-cover sm:h-80 lg:h-[430px]" />
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8c6ac]">New season edit</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Designed to feel as good as they look.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">Explore a curated mix of contemporary decor, tactile home pieces, and handcrafted accents made for modern living.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#featured" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#f5eee2]">Shop the collection <FiArrowRight className="h-4 w-4" /></a>
              <a href="#values" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Why FabBuds</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[32px] border border-[#eadfd3] bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.15)]">
          <div className="rounded-[24px] bg-[#f7efe3] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Carefully chosen</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Elevated essentials from trusted makers.</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { title: "Fast dispatch", text: "Same-day packing", icon: <FiClock className="h-5 w-5" /> },
              { title: "Secure checkout", text: "Protected payments", icon: <FiShield className="h-5 w-5" /> },
              { title: "Easy delivery", text: "Tracked shipments", icon: <FiTruck className="h-5 w-5" /> },
            ].map((item) => (
              <div key={item.title} className="rounded-[20px] border border-[#eadfd3] bg-[#fcfaf7] p-4">
                <div className="mb-3 inline-flex rounded-full bg-white p-2 text-slate-700">{item.icon}</div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="values" className="grid gap-4 rounded-[32px] border border-[#eadfd3] bg-white/80 p-6 shadow-sm sm:grid-cols-3 sm:p-8">
        {[
          ["Verified artisans", "Every product is sourced with quality and care in mind."],
          ["Flexible returns", "Try it at home with a simple returns window."],
          ["Human support", "Need help? Our team is available within hours."],
        ].map(([title, description]) => (
          <div key={title} className="rounded-[20px] bg-[#fcfaf7] p-5">
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
          </div>
        ))}
      </section>

      <section id="featured" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Featured picks</p>
            <h3 className="text-2xl font-semibold text-slate-900">Trending right now</h3>
          </div>
          <a href="/" className="text-sm font-semibold text-slate-700">View all</a>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-[24px] border border-[#eadfd3] bg-white" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product._id || product.id} product={product} onAddToCart={handleCart} onToggleWishlist={handleWishlist} isWishlisted={wishlist.some((item) => item._id === product._id)} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">More to discover</p>
            <h3 className="text-2xl font-semibold text-slate-900">Fresh arrivals</h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {moreProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} onAddToCart={handleCart} onToggleWishlist={handleWishlist} isWishlisted={wishlist.some((item) => item._id === product._id)} isCompact />
          ))}
        </div>
      </section>
    </PageShell>
  );
};

export default EcommerceHome;