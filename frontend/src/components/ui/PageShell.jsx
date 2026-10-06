import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiHeart, FiUser, FiMenu, FiChevronRight } from "react-icons/fi";
import { useMemo, useState } from "react";
import { formatCurrency } from "./formatters";

const categories = [
  { name: "Decor", href: "/" },
  { name: "Craft", href: "/" },
  { name: "Jewelry", href: "/" },
  { name: "Fashion", href: "/" },
];

export default function PageShell({ children, title, subtitle, compact }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const navItems = useMemo(() => [
    { label: "Home", to: "/" },
    { label: "Cart", to: "/cart" },
    { label: "Orders", to: "/orders" },
    { label: "Profile", to: "/profile" },
  ], []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6efe8] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-[#eadfd3] bg-[#f6efe8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#d8c6ac] p-2 lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation">
              <FiMenu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">FB</div>
              <div>
                <p className="text-lg font-semibold tracking-[0.2em] text-slate-900">FABBUDS</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">handcrafted essentials</p>
              </div>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden flex-1 items-center justify-center px-6 lg:flex">
            <label className="flex w-full max-w-xl items-center gap-2 rounded-full border border-[#d8c6ac] bg-white px-4 py-2 shadow-sm">
              <FiSearch className="h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search handcrafted finds"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </label>
          </form>

          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink to="/" className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 md:block">Shop</NavLink>
            <NavLink to="/wishlist" className="rounded-full border border-[#d8c6ac] bg-white p-2.5 text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
              <FiHeart className="h-4 w-4" />
            </NavLink>
            <NavLink to="/cart" className="rounded-full border border-[#d8c6ac] bg-white p-2.5 text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
              <FiShoppingBag className="h-4 w-4" />
            </NavLink>
            {token ? (
              <NavLink to="/profile" className="rounded-full border border-[#d8c6ac] bg-white p-2.5 text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
                <FiUser className="h-4 w-4" />
              </NavLink>
            ) : (
              <Link to="/LoginSignup" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Login</Link>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#eadfd3] bg-[#f6efe8] px-4 py-3 lg:hidden">
            <form onSubmit={handleSearch} className="mb-3 flex items-center gap-2 rounded-full border border-[#d8c6ac] bg-white px-3 py-2">
              <FiSearch className="h-4 w-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search handcrafted finds" className="w-full bg-transparent text-sm outline-none" />
            </form>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className="rounded-full border border-[#d8c6ac] bg-white px-3 py-2 text-sm text-slate-700" onClick={() => setMobileMenuOpen(false)}>{item.label}</NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {!compact && (
          <section className="rounded-[32px] border border-[#eadfd3] bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.28)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#eadfd3] bg-[#f9f2e9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                  Curated for modern living
                  <FiChevronRight className="h-3.5 w-3.5" />
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
                <p className="mt-3 text-base leading-7 text-slate-600">{subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link key={category.name} to={category.href} className="rounded-full border border-[#eadfd3] bg-[#fcfaf7] px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900">{category.name}</Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {children}
      </main>

      <footer className="border-t border-[#eadfd3] bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-slate-900">FabBuds</p>
            <p className="mt-1">Thoughtfully sourced products, styled for modern homes.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <span>Fast delivery</span>
            <span>Secure checkout</span>
            <span>Verified artisans</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
