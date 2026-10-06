import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatCurrency } from "./formatters";

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, isCompact }) {
  const imageUrl = product.imageUrl || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80";
  const discountedPrice = typeof product.price === "number" ? product.price * 0.9 : product.price;

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#eadfd3] bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-25px_rgba(15,23,42,0.3)]">
      <div className="relative">
        <Link to={`/product/${product._id || product.id}`} className="block">
          <img src={imageUrl} alt={product.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </Link>
        <button
          type="button"
          onClick={() => onToggleWishlist?.(product)}
          className={`absolute right-3 top-3 rounded-full p-2.5 transition ${isWishlisted ? "bg-slate-900 text-white" : "bg-white/90 text-slate-700 hover:bg-white"}`}
          aria-label="Toggle wishlist"
        >
          <FiHeart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{product.category || "Crafted selection"}</p>
          <span className="rounded-full bg-[#f7efe3] px-2.5 py-1 text-xs font-semibold text-slate-700">New</span>
        </div>

        <Link to={`/product/${product._id || product.id}`} className="text-lg font-semibold text-slate-900 transition hover:text-slate-700">
          {product.name}
        </Link>

        <p className="line-clamp-2 text-sm leading-6 text-slate-600">{product.description || "Thoughtfully made for everyday rituals."}</p>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FiStar className="text-amber-500" />
          <span>{product.rating || "4.8"}</span>
          <span className="text-xs">• {product.stock ? `${product.stock} left` : "In stock"}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">{formatCurrency(product.price)}</p>
            {product.price && (
              <p className="text-sm text-slate-400 line-through">{formatCurrency(discountedPrice)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiShoppingBag className="h-4 w-4" />
            {isCompact ? "Add" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
