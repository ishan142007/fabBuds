import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PageShell from "../ui/PageShell";

function LoginSignup({ setlogin }) {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, password, photo } = user;
    setLoading(true);
    setError("");

    try {
      if (activeTab === "signup") {
        const res = await axios.post("http://localhost:3000/api/auth/signup", { fullname, email, password, photo, role });
        if (res.data.user.token) {
          localStorage.setItem("token", res.data.user.token);
          setlogin(true);
          navigate("/");
        }
      } else {
        const res = await axios.post("http://localhost:3000/api/auth/login", { email, password, role });
        if (res.data.user.token) {
          localStorage.setItem("token", res.data.user.token);
          setlogin(true);
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Welcome back to FabBuds" subtitle="Sign in to continue your curated shopping journey or create a fresh account in under a minute." compact>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[32px] border border-[#eadfd3] bg-[#111827] text-white">
          <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80" alt="Warm interior lifestyle" className="h-48 w-full object-cover lg:h-full" />
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8c6ac]">Private access</p>
            <h2 className="mt-3 text-2xl font-semibold">Your account, your rituals.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Track orders, save favorites, and move seamlessly between browsing and checkout.</p>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)] sm:p-8">
          <div className="mb-6 flex rounded-full bg-[#f7efe3] p-1">
            <button type="button" onClick={() => setActiveTab("login")} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "login" ? "bg-slate-900 text-white" : "text-slate-600"}`}>Sign in</button>
            <button type="button" onClick={() => setActiveTab("signup")} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === "signup" ? "bg-slate-900 text-white" : "text-slate-600"}`}>Create account</button>
          </div>

          {error ? <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div> : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" ? (
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Full name</span>
                <input type="text" value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} className="w-full rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-4 py-3 outline-none ring-0" required />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Email</span>
              <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-4 py-3 outline-none" required />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Password</span>
              <div className="flex items-center rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-4 py-3">
                <input type={showPassword ? "text" : "password"} value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="w-full bg-transparent outline-none" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-slate-600" aria-label="Toggle password visibility">
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">Role</span>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-4 py-3 outline-none">
                <option value="user">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {activeTab === "signup" ? (
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-slate-700">Photo URL</span>
                <input type="text" value={user.photo} onChange={(e) => setUser({ ...user, photo: e.target.value })} className="w-full rounded-2xl border border-[#d8c6ac] bg-[#fcfaf7] px-4 py-3 outline-none" placeholder="Optional" />
              </label>
            ) : null}

            <button type="submit" disabled={loading} className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Please wait..." : activeTab === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

export default LoginSignup;