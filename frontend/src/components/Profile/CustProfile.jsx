import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiLogOut, FiMapPin, FiMail, FiShield, FiClock } from "react-icons/fi";
import PageShell from "../ui/PageShell";

function profile() {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({ fullname: "", _id: "", email: "", role: "", address: "", createdAt: "" });

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const user = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const identity = user.data.ans;
        setProfile({ ...identity, createdAt: identity.createdAt || "" });
      } catch (error) {
        console.log(error);
      }
    };
    handleProfile();
  }, [token]);

  return (
    <PageShell title="Your account" subtitle="A calm place to review your details, access your orders, and keep your information up to date." compact>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-[#eadfd3] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Member since</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{profile.fullname || "Welcome"}</h2>
              <p className="mt-2 text-sm text-slate-600">{profile.email}</p>
            </div>
            <button onClick={() => { localStorage.removeItem("token"); window.location.reload(); }} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
              <FiLogOut className="h-4 w-4" /> Logout
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] bg-[#fcfaf7] p-4">
              <div className="mb-3 inline-flex rounded-full bg-white p-2 text-slate-700"><FiMail className="h-4 w-4" /></div>
              <p className="text-sm font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-600">{profile.email}</p>
            </div>
            <div className="rounded-[20px] bg-[#fcfaf7] p-4">
              <div className="mb-3 inline-flex rounded-full bg-white p-2 text-slate-700"><FiShield className="h-4 w-4" /></div>
              <p className="text-sm font-semibold text-slate-900">Role</p>
              <p className="mt-1 text-sm text-slate-600">{profile.role || "Customer"}</p>
            </div>
            <div className="rounded-[20px] bg-[#fcfaf7] p-4 sm:col-span-2">
              <div className="mb-3 inline-flex rounded-full bg-white p-2 text-slate-700"><FiMapPin className="h-4 w-4" /></div>
              <p className="text-sm font-semibold text-slate-900">Primary address</p>
              <p className="mt-1 text-sm text-slate-600">{profile.address || "Add your shipping address from checkout to speed up future orders."}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#eadfd3] bg-[#111827] p-6 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)] sm:p-8">
          <div className="inline-flex rounded-full bg-white/10 p-2"><FiClock className="h-4 w-4" /></div>
          <h3 className="mt-4 text-2xl font-semibold">Your next best step</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Keep your account ready for faster checkout, saved favorites, and delivery updates whenever an order moves ahead.</p>
          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-4">
            <p className="text-sm font-semibold text-white">Account ID</p>
            <p className="mt-1 text-sm text-slate-300">{profile._id || "Available after sign in"}</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default profile;