import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../ui/PageShell";
import ProductCard from "../ui/ProductCard";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("fabbuds-wishlist");
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
    } catch (error) {
      console.log("Unable to load wishlist", error);
    }
  }, []);

  const handleToggleWishlist = (product) => {
    const nextWishlist = wishlist.filter((item) => item._id !== product._id);
    setWishlist(nextWishlist);
    localStorage.setItem("fabbuds-wishlist", JSON.stringify(nextWishlist));
  };

  return (
    <PageShell title="Your saved favorites" subtitle="Keep track of the pieces you want to revisit later." compact>
      {wishlist.length === 0 ? (
        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">You haven’t saved anything yet.</p>
          <Link to="/" className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Browse products</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((product) => (
            <ProductCard key={product._id || product.id} product={product} onToggleWishlist={handleToggleWishlist} isWishlisted={true} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
